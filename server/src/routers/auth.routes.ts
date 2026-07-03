import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { login, register } from "../controllers/auth.controller.js";
import { login_schema, register_schema } from "../validators/auth.validator.js";
import passport, { type Profile, type DoneCallback } from "passport";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/login", validate(login_schema), login);

router.post("/register", validate(register_schema), register);

let GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (access_token: string, refresh_token: string, profile: Profile, cb: DoneCallback) {
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
            }
        });

        if (!new_user) {
            return cb(new Error("User not created"));
        }

        cb(null, new_user);

        console.log({ access_token, refresh_token, profile, cb });
    }
));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

export default router;