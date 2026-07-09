import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.js";

export const create_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("this is request id: ", req.user?.id);
        console.log("req body: ", req.body);

        const new_session = await prisma.session.create({
            data: {
                name: req.body.name,
                user: {
                    connect: {
                        id: req.user?.id!
                    }
                }
            },
        });

        if (!new_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        };

        res.status(201).json({
            message: "Session created successfully",
            ok: true,
            data: new_session,
        });
    } catch (error) {
        next(error);
    };
};

export const add_model_to_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model_id } = req.body;
        console.log("model_id:", model_id);

        const modelToAdd = await prisma.model.findUnique({
            where: { id: model_id },
        });

        if (!modelToAdd) {
            return res.status(404).json({ message: "Model not found", ok: false });
        }

        const session = await prisma.session.findUnique({
            where: { id: req.params.id as string },
            include: { models: true },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found", ok: false });
        }

        const existingModelOfSameType = session.models.find(
            (m) => m.type === modelToAdd.type
        );

        const modelsUpdatePayload: any = {
            connect: {
                id: model_id,
            },
        };

        if (existingModelOfSameType) {
            modelsUpdatePayload.disconnect = {
                id: existingModelOfSameType.id,
            };
        }

        const updated_session = await prisma.session.update({
            where: {
                id: req.params.id as string,
            },
            data: {
                models: modelsUpdatePayload,
            },
            include: {
                models: true,
            },
        });

        if (!updated_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(200).json({
            message: "Model added to session successfully",
            ok: true,
            data: updated_session,
        });
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

        if (!updated_session) {
            return res.status(406).json({ message: "Not Acceptable" });
        }

        res.status(200).json({
            message: "Session updated successfully",
            ok: true,
            data: updated_session,
        });
    } catch (error) {
        next(error);
    }
};

export const delete_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.session.delete({
            where: {
                id: req.params.id as string,
            },
        });

        res.status(200).json({ message: "Session deleted successfully", ok: true, data: null });
    } catch (error) {
        next(error);
    }
};

export const get_one_session = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await prisma.session.findUnique({
            where: {
                id: req.params.id as string,
            },
            include: {
                models: true,
            },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json({
            message: "Session retrieved successfully",
            ok: true,
            data: session,
        });
    } catch (error) {
        next(error);
    }
};

export const get_all_sessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessions = await prisma.session.findMany({
            where: {
                user_id: req.user?.id || "",
            },
            include: {
                models: true,
            },
        });

        res.status(200).json({
            message: "Sessions retrieved successfully",
            ok: true,
            data: sessions,
        });
    } catch (error) {
        next(error);
    }
};
