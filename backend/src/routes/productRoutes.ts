import express from "express";
import { analyzeImageHandler, evaluateOfferHandler } from "../controllers/geminiController";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // ✅ memoria

router.post("/analyze-image", upload.single("image"), analyzeImageHandler);
router.post("/evaluate-price", evaluateOfferHandler);

export default router;