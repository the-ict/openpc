import { Router } from "express";
import { create_session, add_model_to_session } from "../controllers/session.controller.js";
import { validate } from "../middleware/validate.js";
import { add_model_to_session_schema, create_session_schema } from "../validators/session.validator.js";

const router = Router();

router.post("/", validate(create_session_schema), create_session);
router.post("/:id/models", validate(add_model_to_session_schema), add_model_to_session);

export default router;