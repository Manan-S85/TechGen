const { fetchNewsAPI } = require("./newsapi");
const { fetchWorldNews } = require("./worldnews");
const { fetchGNews } = require("./gnews");
const { fetchReddit } = require("./reddit");
const { fetchGeneralNews } = require("./generalNews");

async function aggregateNews() {
  const [newsApi, worldNews, gnews, reddit, generalNews] = await Promise.all([
    fetchNewsAPI(),
    fetchWorldNews(),
    fetchGNews(),
    fetchReddit(),
    fetchGeneralNews()
  ]);

  // Merge + sort by date
  const all = [...newsApi, ...worldNews, ...gnews, ...reddit, ...generalNews];
  all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return all;
}

module.exports = { aggregateNews };
