import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.js";

export const create_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const new_session = await prisma.session.create({
            data: req.body,
        });

        if(!new_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(201).json(new_session);
    } catch (error) {
        next(error);
    }
};

export const add_model_to_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {model_id} = req.body;

        const updated_session = await prisma.session.update({
            where: {
                id: req.params.id as string,
            },
            data: {
                models: {
                    connect: {
                        id: model_id,
                    },
                },
            },
        });
        
        if(!updated_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(200).json(updated_session);
    } catch (error) {
        next(error);
    }
};

export const update_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated_session = await prisma.session.update({
            where: {
                id: req.params.id as string,
            },
            data: req.body,
        });

        if(!updated_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(200).json(updated_session);
    } catch (error) {
        next(error);
    }
};

export const delete_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted_session = await prisma.session.delete({
            where: {
                id: req.params.id as string,
            },
        });

        if(!deleted_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(200).json(deleted_session);
    } catch (error) {
        next(error);
    }
};