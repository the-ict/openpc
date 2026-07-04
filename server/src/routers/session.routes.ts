import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { create_session, add_model_to_session, update_session, delete_session, get_all_sessions, get_one_session } from "../controllers/session.controller.js";
import { add_model_to_session_schema, create_session_schema, update_session_schema } from "../validators/session.validator.js";

const router = Router();

router.post("/", validate(create_session_schema), create_session);
router.put("/:id", validate(update_session_schema), update_session);
router.post("/:id/models", validate(add_model_to_session_schema), add_model_to_session);
router.delete("/:id", delete_session);
router.get("/", get_all_sessions);
router.get("/:id", get_one_session);

export default router;