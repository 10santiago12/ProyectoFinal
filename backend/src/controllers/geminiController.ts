import { Request, Response } from "express";
import { identifyProductFromImage } from "../utils/gemini";
import { searchEbayProduct } from "../utils/searchEbay";

// POST /api/analyze-image
export async function analyzeImageHandler(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: "No image provided" });
    return;
  }

  try {
    const productName = await identifyProductFromImage(req.file.buffer);
    console.log("🔍 Producto identificado:", productName);
    res.json({ productName });
  } catch (error) {
    console.error("❌ Error al analizar la imagen:", error);
    res.status(500).json({ error: "Error processing image" });
  }
}

export async function searchOffersHandler(req: Request, res: Response): Promise<void> {
  const { productName } = req.body;

  if (!productName) {
    res.status(400).json({ error: "Product name is required" });
    return;
  }

  try {
    const offers = await searchEbayProduct(productName);

    if (!offers || offers.length === 0) {
      res.status(404).json({ error: "No offers found" });
      return;
    }

    res.json({ offers });
  } catch (error) {
    console.error("❌ Error fetching offers:", error);
    res.status(500).json({ error: "Error fetching offers" });
  }
}