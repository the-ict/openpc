import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { create_model_schema } from "../validators/model.validator.js";
import { create_model, update_model } from "../controllers/model.routes.js";

const router = Router();

router.post("/", validate(create_model_schema), create_model);
router.put("/:id", validate(create_model_schema), update_model);

export default router;