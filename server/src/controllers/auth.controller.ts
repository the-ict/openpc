import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials", ok: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials", ok: false });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });

        return res.status(200).json({
            message: "Login successful", ok: true, data: {
                user, token, refresh_token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("registerreed");
        const body = req.body;

        const { password, ...user_data } = body;
        const hash_password = await bcrypt.hash(password, 10);

        const new_user = await prisma.user.create({ data: { ...user_data, password: hash_password } });
        if (!new_user.id) {
            return res.status(406).json({ message: "Not Acceptable", ok: false });
        };

        const token = jwt.sign({ id: new_user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        const refresh_token = jwt.sign({ id: new_user.id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });

        return res.status(201).json({ message: "User created successfully", ok: true, data: { user: new_user, token, refresh_token } });
    } catch (error) {
        next(error);
    }
};