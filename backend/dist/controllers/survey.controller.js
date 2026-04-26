import { Survey } from "../models/index.js";
export const createSurvey = async (req, res) => {
    try {
        const survey = new Survey(req.body);
        await survey.save();
        res.status(201).json({ success: true, data: survey });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
export const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find().sort({ createdAt: -1 });
        res.json({ success: true, data: surveys });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=survey.controller.js.map