import express from "express";
import type { NextFunction, Request, Response } from "express";
import logger from "./utils/loggers.js";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routers/auth.routes.js";
import modelRoutes from "./routers/model.routes.js";

// configure dotenv
dotenv.config();

// initialize express
const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: "http://localhost:5000",
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/models", modelRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("bad error: ", err);

    return res.status(500).json({
        message: err.message || "Internal server error",
        ok: false,
        cause: err.cause || "No data"
    });
});

// start server
app.listen(3001, async () => {
    logger.info("Server is running on port 3001");
});