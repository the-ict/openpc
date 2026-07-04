import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { create_model_schema, update_model_schema } from "../validators/model.validator.js";
import { create_model, update_model } from "../controllers/model.controller.js";

const router = Router();

router.post("/", validate(create_model_schema), create_model);
router.put("/:id", validate(update_model_schema), update_model);

export default router;