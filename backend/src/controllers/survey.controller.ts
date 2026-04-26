import type { Request, Response } from "express";
import { Survey } from "../models/index.js";

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json({ success: true, data: survey });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getSurveys = async (req: Request, res: Response) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json({ success: true, data: surveys });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};