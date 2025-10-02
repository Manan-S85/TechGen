const { fetchNewsAPI } = require("./newsapi");
const { fetchWorldNews } = require("./worldnews");
const { fetchGNews } = require("./gnews");
const { fetchReddit } = require("./reddit");

async function aggregateNews() {
  const [newsApi, worldNews, gnews, reddit] = await Promise.all([
    fetchNewsAPI(),
    fetchWorldNews(),
    fetchGNews(),
    fetchReddit()
  ]);

  // Merge + sort by date
  const all = [...newsApi, ...worldNews, ...gnews, ...reddit];
  all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return all;
}

module.exports = { aggregateNews };
