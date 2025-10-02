const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const { aggregateNews } = require("./services/aggregator");

// Routes imports
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
