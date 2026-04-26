import type { NextFunction, Request, Response } from "express";
import logger from "./utils/loggers.js";
import mongoose from "mongoose";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

import surveyRouter from "./routers/survey.routes.js";

app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://openpc-research.vercel.app/"],
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

app.use("/api/survey", surveyRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, "error middleware");
    res.status(500).json({ success: false, error: "Something broke!" });
});

const startServer = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            logger.info("Connected to MongoDB");
        } else {
            logger.warn("MONGO_URI not found, skipping database connection");
        }

        app.listen(7777, () => {
            logger.info("Server is running on port 3000");
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
