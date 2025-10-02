const axios = require("axios");

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

async function fetchGNews() {
  try {
    if (!GNEWS_API_KEY) {
      console.warn("GNews API key not provided, skipping GNews");
      return [];
    }

    const url = `https://gnews.io/api/v4/search?q=technology&token=${GNEWS_API_KEY}&lang=en&max=10`;
    const res = await axios.get(url);
    
    return res.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      description: article.description,
      category: 'Technology'
    }));
  } catch (err) {
    console.error("GNews Error:", err.message);
    return [];
  }
}

module.exports = { fetchGNews };
