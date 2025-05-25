import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();
console.log("🔑 Clave de Gemini cargada:", process.env.GEMINI_API_KEY?.slice(0, 10));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("📥 Petición recibida:", req.method, req.url);
  next();
});

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});