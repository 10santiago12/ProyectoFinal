import { Request, Response } from "express";
import { searchEbayProduct } from "../utils/searchEbay";

export async function searchOffersHandler(req: Request, res: Response): Promise<void> {
  const { productName } = req.body;

  if (!productName) {
    res.status(400).json({ error: "productName is required" });
    return;
  }

  try {
    const offers = await searchEbayProduct(productName);
    if (!offers) {
      res.status(404).json({ error: "No offers found" });
    } else {
      res.json({ offers });
    }
  } catch (error) {
    console.error("❌ Error buscando en eBay:", error);
    res.status(500).json({ error: "Search failed" });
  }
}
