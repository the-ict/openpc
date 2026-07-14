import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const get_hero_components = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const [cpu_model, gpu_model,ram_model,storage_model, case_model] = await Promise.all([
            await prisma.model.findFirst({
                where: {
                    type: "CPU",
                }
            }),
            await prisma.model.findFirst({
                where: {
                    type: "GPU",
                }
            }),
            await prisma.model.findFirst({
                where: {
                    type: "RAM",
                }
            }),
            await prisma.model.findFirst({
                where: {
                    type: "MOTHER_BOARD",
                }
            }),
            await prisma.model.findFirst({
                where: {
                    type: "CASE"
                }
            })
        ]);

        res.status(200).json({
            cpu_model,
            gpu_model,  
            ram_model,
            storage_model,
            case_model,
        });
    } catch (error) {
        next(error);
    }
}