import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-url.com/api' 
    : 'http://localhost:5000/api'
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/me');

// News API endpoints
export const getAllNews = () => API.get('/news');
export const getLatestNews = (limit = 10) => API.get(`/news/latest?limit=${limit}`);
export const getNewsByCategory = (category) => API.get(`/news/category/${category}`);
