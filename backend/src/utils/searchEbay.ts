import axios from "axios";

export async function searchEbayProduct(query: string) {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "ebay",
        _nkw: query,
        api_key: process.env.SERPAPI_KEY
      },
      headers: {
        "User-Agent": "ScanAndSaveBot/1.0"
      }
    });

    // 🔍 Nuevo path: usamos 'organic_results'
    const results = response.data.organic_results;

    if (!results || results.length === 0) {
      console.warn("⚠️ No se encontraron productos para:", query);
      return null;
    }

    const product = results[0]; // primer resultado orgánico

    return {
      title: product.title,
      price: product.price?.extracted ?? product.price?.raw ?? "No price",
      image: product.thumbnail,
      link: product.link
    };
  } catch (error: any) {
    console.error("❌ Error en eBay SerpApi:", error?.response?.data || error.message);
    return null;
  }
}