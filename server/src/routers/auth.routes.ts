import { Strategy as GoogleStrategy, type StrategyOptions, type VerifyCallback } from "passport-google-oauth20";
import { Router, type NextFunction, type Request, type Response } from "express";
import { login_schema, register_schema } from "../validators/auth.validator.js";
import { login, register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import passport, { type Profile } from "passport";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", validate(login_schema), login);

router.post("/register", validate(register_schema), register);

router.post("/refresh", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({
                message: "Refresh token is required",
                ok: false,
            });
        }

        const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET || "") as { id: string };
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                ok: false,
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
        const new_refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });

        return res.status(200).json({
            message: "Token refreshed successfully",
            data: { token, refresh_token: new_refresh_token },
            ok: true,
        });
    } catch (error: any) {
        if (error.message.includes("jwt")) {
            return res.status(401).json({
                message: "Invalid or expired refresh token",
                ok: false,
            });
        };
        next(error);
    }
});

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as any;

        if (!user) {
            return res.status(403).json({
                message: "User not found",
                ok: false,
            });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });

        return res.status(200).json({
            message: "Here's your google account",
            data: { user, token, refresh_token },
            ok: true,
        });
    } catch (error) {
        next(error);
    }
})

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const googleOptions: StrategyOptions = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:
        "https://api.coreform.uz/api/auth/google/callback"
};

passport.use(new GoogleStrategy(googleOptions,
    async function (access_token: string, refresh_token: string, profile: Profile, cb: VerifyCallback) {
        const user = await prisma.user.findUnique({
            where: {
                google_id: profile.id,
            }
        });

        if (user) {
            return cb(null, user);
        };

        const new_user = await prisma.user.create({
            data: {
                name: profile.name?.givenName || profile.displayName || 'Unknown',
                email: profile.emails?.[0]?.value || '',
                password: "",
                google_id: profile.id,
                picture: profile.photos?.[0]?.value || null,
            }
        });

        if (!new_user) {
            return cb(new Error("User not created"));
        }

        cb(null, new_user);

        console.log({ access_token, refresh_token, profile, cb });
    }
));



router.get('/google',
    passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        const user = req.user as any;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });

        const frontendUrl = "https://coreform.uz";
        
        res.redirect(`${frontendUrl}/auth/google/callback?token=${token}&refresh_token=${refresh_token}`);
    });


passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export { passport };

export default router;