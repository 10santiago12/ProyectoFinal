import { Request, Response } from "express";
import { identifyProductFromImage, evaluatePriceSuggestion } from "../utils/gemini";

export async function analyzeImageHandler(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: "No image provided" });
    return;
  }

  console.log("📸 Imagen recibida:", req.file.originalname, req.file.size);

  try {
    const productName = await identifyProductFromImage(req.file.buffer);
    console.log("🔍 Producto identificado:", productName);
    res.json({ productName }); // no hay que retornar esto
  } catch (error) {
    console.error("❌ Error al analizar la imagen:", error);
    res.status(500).json({ error: "Error processing image" });
  }
}

export async function evaluateOfferHandler(req: Request, res: Response): Promise<void> {
  const { productName, price } = req.body;

  if (!productName || typeof price !== "number") {
    res.status(400).json({ error: "Missing or invalid productName or price" });
    return;
  }

  try {
    const recommendation = await evaluatePriceSuggestion(productName, price);
    res.json({ recommendation });
  } catch (error) {
    console.error("❌ Error al evaluar el precio:", error);
    res.status(500).json({ error: "Error evaluating price" });
  }
}