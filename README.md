# TechGen - Technology News Aggregator

A full-stack web application that aggregates technology news from multiple sources including NewsAPI, Reddit, BBC Technology, and GNews.

## Features

- **News Aggregation**: Fetches news from multiple sources
- **User Authentication**: Login/Signup functionality with JWT
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time News**: Latest technology news updates
- **User Roles**: Student and Admin user types

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- News APIs integration (NewsAPI, GNews, Reddit, BBC)
- CORS enabled

### Frontend
- React.js with React Router
- Axios for API calls
- Responsive CSS styling
- Modern component architecture

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- API Keys for news services (optional but recommended)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/techgen
   JWT_SECRET=your_jwt_secret_key_here
   NEWS_API_KEY=your_newsapi_key_here
   GNEWS_API_KEY=your_gnews_api_key_here
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000` and will proxy API requests to the backend running on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile (protected)

### News
- `GET /api/news` - Get all aggregated news
- `GET /api/news/latest?limit=10` - Get latest news with limit
- `GET /api/news/category/:category` - Get news by category

## News Sources

The application aggregates news from:

1. **NewsAPI** - Requires API key
2. **Reddit Technology** - Public API (no key required)
3. **BBC Technology RSS** - Public feed (no key required)
4. **GNews** - Requires API key

If API keys are not provided, the application will skip those sources and continue with available ones.

## Environment Variables

### Required
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

### Optional (for news sources)
- `NEWS_API_KEY` - NewsAPI.org API key
- `GNEWS_API_KEY` - GNews.io API key
- `PORT` - Server port (defaults to 5000)

## Project Structure

```
techgen/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── middleware/
│   │   └── authmiddle.js      # Authentication middleware
│   ├── models/
│   │   └── User.js            # User model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── news.js            # News routes
│   ├── services/
│   │   ├── aggregator.js      # News aggregation service
│   │   ├── newsapi.js         # NewsAPI integration
│   │   ├── gnews.js           # GNews integration
│   │   ├── reddit.js          # Reddit integration
│   │   └── worldnews.js       # BBC News integration
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── server.js              # Main server file
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js          # API service functions
│   │   ├── components/
│   │   │   ├── navbar.js       # Navigation component
│   │   │   └── NewList.js      # News list component
│   │   ├── pages/
│   │   │   ├── home.js         # Home page
│   │   │   ├── NewFeed.jsx     # News feed page
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Signup.js       # Signup page
│   │   │   └── students.js     # Students page
│   │   ├── styles/
│   │   │   └── App.css         # Main stylesheet
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   └── package.json
└── README.md
```

## Development

### Running Both Servers Simultaneously

You can use a tool like `concurrently` to run both servers at once:

```bash
# Install concurrently globally
npm install -g concurrently

# From the root directory
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

### API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all news
curl http://localhost:5000/api/news

# Get latest 5 news items
curl http://localhost:5000/api/news/latest?limit=5

# Register a new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **API Key Issues**: News sources without API keys will be skipped, check console for warnings
3. **CORS Issues**: Make sure the backend CORS configuration allows requests from the frontend
4. **Port Conflicts**: Ensure ports 3000 and 5000 are available

### Logs

Check the server console for detailed error messages and API responses.

## Contributing

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.