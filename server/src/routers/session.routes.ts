import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { create_session, add_model_to_session, remove_session_model, update_session, delete_session, get_all_sessions, get_one_session } from "../controllers/session.controller.js";
import { add_model_to_session_schema, create_session_schema, update_session_schema } from "../validators/session.validator.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", isAuthenticated, validate(create_session_schema), create_session);
router.put("/:id", isAuthenticated, validate(update_session_schema), update_session);
router.post("/:id/models", isAuthenticated, validate(add_model_to_session_schema), add_model_to_session);
router.delete("/:id/models/:sessionModelId", isAuthenticated, remove_session_model);
router.delete("/:id", isAuthenticated, delete_session);
router.get("/", isAuthenticated, get_all_sessions);
router.get("/:id", isAuthenticated, get_one_session);

export default router;