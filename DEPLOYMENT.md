# TechGen Vercel Deployment Guide

## Overview
This configuration deploys both your React frontend and Node.js backend together on Vercel as a serverless application.

## Files Created
- `vercel.json` - Main Vercel configuration
- `api/` directory - Serverless functions for your backend
- `package.json` - Root package.json for the project

## Project Structure After Setup
```
TechGen/
├── vercel.json          # Vercel deployment configuration
├── package.json         # Root package configuration
├── api/                 # Serverless API functions
│   ├── index.js         # Main API handler
│   ├── package.json     # API dependencies
│   ├── config/          # Database configuration
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── services/        # Business logic services
├── frontend/            # React application
└── backend/             # Original backend (kept for development)
```

## Environment Variables Required
Set these in your Vercel dashboard:

1. `MONGODB_URI` - Your MongoDB connection string
2. `JWT_SECRET` - Your JWT secret key
3. `NODE_ENV` - Set to "production"
4. Any other environment variables your app uses

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect the configuration
4. Add your environment variables in the Vercel dashboard
5. Deploy!

### 3. Alternative: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

## How It Works

### Frontend
- Built from the `frontend/` directory
- Served as static files
- Routes to `/` serve the React app

### Backend/API  
- Backend code is in the `api/` directory
- Express app is converted to serverless functions
- API routes accessible at `/api/*`
- Database connections are handled per request (serverless-friendly)

### Routing
- `/api/*` → Serverless functions (your backend)
- `/*` → React frontend (static files)

## Development vs Production

### Development (Local)
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Frontend proxies API calls to backend

### Production (Vercel)
- Everything served from same domain
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/*`

## Important Notes

1. **Database Connection**: Make sure your MongoDB allows connections from Vercel's IP ranges
2. **Environment Variables**: Set all required env vars in Vercel dashboard
3. **API Limits**: Vercel has function timeout limits (30 seconds max)
4. **Cold Starts**: First API call might be slower due to serverless cold starts

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in respective package.json files
- Verify environment variables are set correctly

### API Errors
- Check Vercel function logs in the dashboard
- Ensure database connection string is correct
- Verify all required dependencies are installed

### Frontend Issues
- Check that the build process completes successfully
- Verify API calls are using relative paths (`/api/...`)

## Testing the Deployment

Once deployed, test these endpoints:
- `https://your-app.vercel.app` - Frontend
- `https://your-app.vercel.app/api` - API health check
- `https://your-app.vercel.app/api/auth` - Auth endpoints
- `https://your-app.vercel.app/api/news` - News endpoints