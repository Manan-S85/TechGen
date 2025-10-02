const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNewsAPI() {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${NEWS_API_KEY}`;
    const res = await axios.get(url);
    return res.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      description: article.description || '',
      category: 'Technology'
    }));
  } catch (err) {
    console.error("NewsAPI Error:", err.message);
    return [];
  }
}

module.exports = { fetchNewsAPI };
