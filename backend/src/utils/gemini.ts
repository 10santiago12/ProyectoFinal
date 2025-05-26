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
    "¿Qué producto se muestra en esta imagen? Devuelve solo el nombre del producto, no digas nada más sino el nombre.",
  ]);

  const text = result.response.text().trim();
  return text;
}
