import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.js";

export const create_model = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const model = await prisma.model.create({
            data: req.body
        });

        if (!model) {
            return res.status(406).json({ message: "Not Acceptable", ok: false });
        }

        return res.status(201).json({ message: "Model created successfully", ok: true, data: model });
    } catch (error) {
        next(error);
    }
};

export const update_model = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const model = await prisma.model.update({
            where: {
                id: req.params.id as string,
            },
            data: req.body
        });

        if (!model) {
            return res.status(404).json({ message: "Model not found", ok: false });
        }

        return res.status(200).json({ message: "Model updated successfully", ok: true, data: model });
    } catch (error) {
        next(error);
    }
};