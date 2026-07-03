import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { login, register } from "../controllers/auth.controller.js";
import { login_schema, register_schema } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", validate(login_schema), login);

router.post("/register", validate(register_schema), register);

export default router;