import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set.");
const genAI = new GoogleGenerativeAI(apiKey);

export async function identifyProductFromImage(imageBuffer: Buffer): Promise<string> {
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

  return result.response.text().trim();
}

export async function evaluatePriceSuggestion(productName: string, price: number): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Estoy evaluando si un producto es una buena compra. El producto es "${productName}" y cuesta $${price}.
¿Es una buena oferta? Respóndeme con una de estas palabras: "Buena oferta", "Precio promedio" o "Muy caro".
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function chooseBestOffer(productName: string, offers: any[]): Promise<{ bestOffer: any; aiComment: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const formatted = offers.map((o, i) => `Opción ${i + 1}: ${o.title} por ${o.price} USD`).join("\n");

  const prompt = `
Tengo estas ofertas de productos para "${productName}":
${formatted}

Indica cuál es la mejor opción solo con el número (ej: "Opción 2") y por qué en una frase breve.
`;

  const result = await model.generateContent(prompt);
  const output = result.response.text().trim();
  const match = output.match(/Opción (\d+)/i);
  const index = match ? parseInt(match[1]) - 1 : 0;

  return {
    bestOffer: offers[index],
    aiComment: output
  };
}