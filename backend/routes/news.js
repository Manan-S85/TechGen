const express = require('express');
const { aggregateNews } = require('../services/aggregator');
const { protect } = require('../middleware/authmiddle');

const router = express.Router();

// @desc    Get all news (aggregated from multiple sources)
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await aggregateNews();
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ 
      message: 'Failed to fetch news', 
      error: error.message 
    });
  }
});

// @desc    Get news by category
// @route   GET /api/news/category/:category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const allNews = await aggregateNews();
    
    // Filter news by category if the news item has a category field
    const filteredNews = allNews.filter(item => 
      item.category && item.category.toLowerCase().includes(category.toLowerCase())
    );
    
    res.json(filteredNews);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ 
      message: 'Failed to fetch news by category', 
      error: error.message 
    });
  }
});

// @desc    Get latest news (limit results)
// @route   GET /api/news/latest?limit=10
// @access  Public
router.get('/latest', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const allNews = await aggregateNews();
    
    // Sort by publishedAt and limit results
    const latestNews = allNews
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
    
    res.json(latestNews);
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).json({ 
      message: 'Failed to fetch latest news', 
      error: error.message 
    });
  }
});

module.exports = router;
