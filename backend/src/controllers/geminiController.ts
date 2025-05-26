import { Request, Response } from "express";
import { identifyProductFromImage } from "../utils/gemini";

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