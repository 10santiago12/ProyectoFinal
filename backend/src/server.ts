import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchProductHandler } from "./controllers/productController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/search", searchProductHandler);

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});