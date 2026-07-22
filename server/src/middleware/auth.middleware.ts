import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized", ok: false });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        if (!decoded) {
            throw new Error("Invalid token");
        };

        (req as any).user = decoded;
        next();
    } catch (error: any) {
        console.log("error message: ", error);
        if (error.message.includes("jwt")) {
            return res.status(401).json({ message: "Invalid or expired token", ok: false });
        };
        next(error);
    }
}
