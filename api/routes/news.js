const express = require('express');
const { aggregateNews } = require('../services/aggregator');
const { protect } = require('../middleware/authmiddle');

const router = express.Router();

// @desc    Get all news (aggregated from multiple sources)
// @route   GET /api/news
// @access  Public (limited) / Protected (full access)
router.get('/', async (req, res) => {
  try {
    const news = await aggregateNews();
    
    // Check if user is authenticated via token in headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const isAuthenticated = !!token; // Simple check - you can make this more robust
    
    // If user is not authenticated, show only first 3 news items
    if (!isAuthenticated) {
      const limitedNews = news.slice(0, 3).map(item => ({
        ...item,
        isLocked: false
      }));
      
      // Add locked placeholders to show what they're missing
      const lockedPlaceholders = Array(5).fill(null).map((_, index) => ({
        id: `locked-${index}`,
        title: "Exclusive Tech News",
        description: "Sign up to access premium technology news, in-depth analysis, and breaking updates",
        isLocked: true,
        source: "TechGen Premium",
        publishedAt: new Date().toISOString(),
        category: "Technology",
        url: "#"
      }));
      
      return res.json([...limitedNews, ...lockedPlaceholders]);
    }
    
    // For authenticated users, return all news
    const fullNews = news.map(item => ({
      ...item,
      isLocked: false
    }));
    
    res.json(fullNews);
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

// @desc    Get student-specific news
// @route   GET /api/news/students
// @access  Protected
router.get('/students', protect, async (req, res) => {
  try {
    const allNews = await aggregateNews();
    const { isRelevantToStudents } = require('../services/categorizer');
    
    // Filter news that is relevant to students
    const studentNews = allNews.filter(item => {
      return item.category === 'Student' || isRelevantToStudents(item.title, item.description);
    });
    
    // Sort by publishedAt
    studentNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    res.json(studentNews);
  } catch (error) {
    console.error('Error fetching student news:', error);
    res.status(500).json({ 
      message: 'Failed to fetch student news', 
      error: error.message 
    });
  }
});

module.exports = router;
