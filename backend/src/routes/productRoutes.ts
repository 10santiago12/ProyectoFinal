import express from "express";
import multer from "multer";
import { analyzeImageHandler } from "../controllers/geminiController";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze-image", upload.single("image"), analyzeImageHandler);
//router.post("/search-offers", searchOffersHandler);

export default router;