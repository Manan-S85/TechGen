const axios = require("axios");

async function fetchWorldNews() {
  try {
    // Using free RSS-JSON API service to get world news technology articles
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/technology/rss.xml";
    const res = await axios.get(url);

    if (res.data.status !== 'ok') {
      throw new Error('Failed to fetch BBC Tech RSS');
    }

    return res.data.items.slice(0, 10).map(item => ({
      title: item.title,
      url: item.link,
      source: "BBC Technology",
      publishedAt: item.pubDate,
      description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '',
      category: 'Technology'
    }));
  } catch (err) {
    console.error("World News (BBC) Error:", err.message);
    return [];
  }
}

module.exports = { fetchWorldNews };
