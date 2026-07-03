import multer from "multer";
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "public/uploads");
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
    console.log("req_file: ", req.files);
    console.log("req_file:", req.file);

    return res.status(201).json({
        file: req.file,
        message: "File uploaded successfully",
        ok: false,
        files: req.files,
    })
});

export default router;