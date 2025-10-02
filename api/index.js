const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');

// Routes imports
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'TechGen API is running!' });
});

// Export the Express API
module.exports = app;