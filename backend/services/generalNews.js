const axios = require("axios");
const { categorizeNews } = require("./categorizer");

// Fetch general news from NewsAPI using different categories
async function fetchGeneralNews() {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  
  if (!NEWS_API_KEY) {
    console.warn("NewsAPI key not provided, skipping general news");
    return [];
  }

  try {
    // Fetch from multiple categories to get diverse content
    const categories = ['general', 'business', 'health', 'science'];
    const promises = categories.map(async (category) => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${NEWS_API_KEY}&pageSize=5`;
        const res = await axios.get(url);
        return res.data.articles || [];
      } catch (err) {
        console.error(`Error fetching ${category} news:`, err.message);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const allArticles = results.flat();
    
    return allArticles.map(article => {
      const title = article.title || '';
      const description = article.description || '';
      return {
        title: title,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        description: description,
        category: categorizeNews(title, description)
      };
    });
  } catch (err) {
    console.error("General News Error:", err.message);
    return [];
  }
}

module.exports = { fetchGeneralNews };