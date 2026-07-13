import { Router } from "express";
import { get_hero_components } from "../controllers/except.controllers.js";

const router = Router();

router.get("/hero-components", get_hero_components);

export default router;