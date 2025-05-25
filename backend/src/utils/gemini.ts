import { GoogleGenerativeAI } from "@google/generative-ai";

export async function identifyProductFromImage(imageBuffer: Buffer): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const base64Image = imageBuffer.toString("base64");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    },
    "¿Qué producto se muestra en esta imagen? Devuelve solo el nombre del producto.",
  ]);

  const text = result.response.text().trim();
  return text;
}

// 💡 2. Función para evaluar si el precio es bueno
export async function evaluatePriceSuggestion(productName: string, price: number): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Estoy evaluando si un producto es una buena compra. El producto es "${productName}" y cuesta $${price}. 
  ¿Es una buena oferta? Respóndeme con una de estas palabras: "Buena oferta", "Precio promedio" o "Muy caro".`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}