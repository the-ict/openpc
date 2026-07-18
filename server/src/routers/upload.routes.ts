import multer from "multer";
import { Router } from "express";

const router = Router();

const ALLOWED_EXT = [".glb", ".gltf", ".png", ".jpg", ".jpeg", ".webp"];
const MAX_SIZE = 50 * 1024 * 1024;

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "public/uploads");
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter(req, file, callback) {
        const ext = "." + (file.originalname.split(".").pop() ?? "").toLowerCase();
        if (!ALLOWED_EXT.includes(ext)) {
            return callback(new Error("Unsupported file type: " + ext));
        }
        callback(null, true);
    },
});

router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file provided",
            ok: false,
        });
    }

    return res.status(201).json({
        file: req.file,
        message: "File uploaded successfully",
        ok: true,
    });
});

export default router;