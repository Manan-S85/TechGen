const axios = require("axios");
const { categorizeNews } = require("./categorizer");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNewsAPI() {
  try {
    const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${NEWS_API_KEY}`;
    const res = await axios.get(url);
    return res.data.articles.map(article => {
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
    console.error("NewsAPI Error:", err.message);
    return [];
  }
}

module.exports = { fetchNewsAPI };
