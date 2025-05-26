import axios from "axios";

export async function searchEbayProduct(query: string) {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "ebay",
        _nkw: query,
        api_key: process.env.SERPAPI_KEY
      }
    });

    const results = response.data.organic_results;

    if (!results || results.length === 0) {
      return null;
    }

    return results.slice(0, 5).map((item: any) => ({
      title: item.title,
      price: item.price?.extracted ?? item.price?.raw ?? "N/A",
      link: item.link,
      image: item.thumbnail,
    }));
  } catch (error: any) {
    console.error("❌ Error en eBay SerpApi:", error?.response?.data || error.message);
    return null;
  }
}