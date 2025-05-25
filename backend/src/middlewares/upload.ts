// src/middlewares/upload.ts
import multer from "multer";

const storage = multer.memoryStorage(); // guarda en memoria
export const upload = multer({ storage });