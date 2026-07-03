import Joi from "joi";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0]?.message || "Validation error", ok: false });
        }
        next();
    };
};