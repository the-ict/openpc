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
        const { model_id, slot } = req.body;
        console.log("model_id:", model_id, "slot:", slot);

        const modelToAdd = await prisma.model.findUnique({
            where: { id: model_id },
        });

        if (!modelToAdd) {
            return res.status(404).json({ message: "Model not found", ok: false });
        }

        const session = await prisma.session.findUnique({
            where: { id: req.params.id as string },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found", ok: false });
        }

        const requestedSlot = typeof slot === "number" && slot >= 0 ? slot : 0;

        const existingSlot = await prisma.sessionModel.findUnique({
            where: {
                sessionId_modelId_slot: {
                    sessionId: session.id,
                    modelId: model_id,
                    slot: requestedSlot,
                },
            },
        });

        if (existingSlot) {
            return res.status(200).json({
                message: "Model already in this slot",
                ok: true,
                data: session,
            });
        }

        const slotCount = await prisma.sessionModel.count({
            where: { sessionId: session.id, type: modelToAdd.type },
        });

        await prisma.sessionModel.create({
            data: {
                sessionId: session.id,
                modelId: model_id,
                type: modelToAdd.type,
                slot: requestedSlot,
                order: slotCount,
            },
        });

        const updated_session = await prisma.session.findUnique({
            where: { id: session.id },
            include: { sessionModels: { include: { model: true } } },
        });

        if (!updated_session) {
            return res.status(406).json({ message: "Not Acceptable", ok: false });
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

export const remove_session_model = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionModelId = req.params.sessionModelId as string;

        const existing = await prisma.sessionModel.findUnique({
            where: { id: sessionModelId },
        });

        if (!existing) {
            return res.status(404).json({ message: "Session model not found", ok: false });
        }

        await prisma.sessionModel.delete({
            where: { id: sessionModelId },
        });

        const updated_session = await prisma.session.findUnique({
            where: { id: existing.sessionId },
            include: { sessionModels: { include: { model: true } } },
        });

        res.status(200).json({
            message: "Model removed from session successfully",
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
                sessionModels: { include: { model: true } },
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
                sessionModels: { include: { model: true } },
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
