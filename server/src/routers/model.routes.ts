import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/upload.js";
import { update_model_schema } from "../validators/model.validator.js";
import { create_model, update_model } from "../controllers/model.routes.js";

const router = Router();

router.post("/", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "model_file", maxCount: 1 },
  { name: "model_code_file", maxCount: 1 }
]), create_model);
router.put("/:id", validate(update_model_schema), update_model);

export default router;