import { Router } from "express";
import { createSurvey, getSurveys } from "../controllers/survey.controller.js";
const router = Router();
router.post("/", createSurvey);
router.get("/", getSurveys);
export default router;
//# sourceMappingURL=survey.routes.js.map