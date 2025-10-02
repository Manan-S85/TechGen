import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Students from './pages/students';
import Login from './pages/login';
import Signup from './pages/signup';
import NewsFeed from './pages/NewFeed';
import NewsDetail from './components/NewsDetail';
import Navbar from './components/navbar';
import Footer from './components/Footer';

export const NewsContext = createContext();

function App() {
  const [newsData, setNewsData] = useState([]);

  return (
    <NewsContext.Provider value={{ newsData, setNewsData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/news/:id" element={<NewsDetail news={newsData} />} />
          <Route path="/students" element={<Students />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </NewsContext.Provider>
  );
}

export default App;
