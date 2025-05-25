import { Request, Response } from "express";
import { searchEbayProduct } from "../utils/searchEbay";

export async function searchProductHandler(req: Request, res: Response): Promise<void> {
  const { productName } = req.body;

  if (!productName) {
    res.status(400).json({ error: "productName is required" });
    return;
  }

  const product = await searchEbayProduct(productName);

  if (!product) {
    res.status(404).json({ error: "No product found" });
    return;
  }

  res.json(product);
}
