import React, { useEffect, useState, useContext } from 'react';
import NewsList from '../components/newslist';
import { NewsContext } from '../App';
import Icon from '../components/Icon';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNewsData } = useContext(NewsContext);

  useEffect(() => {
    // Fetch real news data from backend
    const fetchNews = async () => {
      try {
        // Check if user is authenticated
        const userData = localStorage.getItem('user');
        const headers = {};
        if (userData) {
          try {
            const userObj = JSON.parse(userData);
            if (userObj.token) {
              headers['Authorization'] = `Bearer ${userObj.token}`;
            }
          } catch (e) {
            console.warn('Error parsing user data');
          }
        }

        const response = await fetch('/api/news', { headers });
        const data = await response.json();
        
        // Filter to show only general and technology news on home page
        const homeRelevantNews = data.filter(item => 
          item.category === 'General' || item.category === 'Technology'
        );
        
        // Transform backend data to match frontend format
        const transformedNews = homeRelevantNews.map(item => ({
          title: item.title,
          date: new Date(item.publishedAt).toLocaleDateString(),
          category: item.category || 'General',
          description: item.description || 'Click to read more...',
          link: item.url,
          isLocked: item.isLocked || false
        }));
        
        // Debug: Log to see if we have locked items
        console.log('Transformed news:', transformedNews);
        console.log('Locked items:', transformedNews.filter(item => item.isLocked));
        
        setNews(transformedNews);
        setNewsData(transformedNews); // Share with context
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to mock data if API fails
        const mockNews = [
          {
            title: 'AI Revolution in Education: Transforming Learning Experiences',
            date: '2025-10-01',
            category: 'AI',
            description: 'Artificial Intelligence is transforming how students learn and interact with educational content, creating personalized learning paths.',
            link: '#'
          },
          {
            title: 'New React Features Released: Enhanced Performance',
            date: '2025-09-28',  
            category: 'Web Development',
            description: 'React team announces new features that will improve developer experience and performance with better optimization.',
            link: '#'
          },
          {
            title: 'Cybersecurity Trends 2025: Advanced Threat Protection',
            date: '2025-09-25',
            category: 'Security',
            description: 'Latest cybersecurity trends and best practices for protecting digital assets in an evolving threat landscape.',
            link: '#'
          },
          {
            title: 'Cloud Computing Evolution: Multi-Cloud Strategies',
            date: '2025-09-22',
            category: 'Cloud',
            description: 'Organizations are adopting multi-cloud strategies to enhance flexibility and reduce vendor lock-in.',
            link: '#'
          },
          {
            title: 'Machine Learning Breakthrough: Natural Language Processing',
            date: '2025-09-20',
            category: 'AI',
            description: 'Recent advances in NLP are enabling more sophisticated human-computer interactions.',
            link: '#'
          },
          {
            title: 'Blockchain Technology: Beyond Cryptocurrency',
            date: '2025-09-18',
            category: 'Blockchain',
            description: 'Exploring blockchain applications in supply chain, healthcare, and digital identity management.',
            link: '#'
          },
          {
            title: 'Quantum Computing Progress: Commercial Applications',
            date: '2025-09-15',
            category: 'Quantum',
            description: 'Quantum computing is moving closer to practical applications in optimization and cryptography.',
            link: '#'
          },
          {
            title: 'Internet of Things: Smart City Initiatives',
            date: '2025-09-12',
            category: 'IoT',
            description: 'IoT technology is driving smart city development with connected infrastructure and services.',
            link: '#'
          },
          {
            title: '5G Network Expansion: Global Connectivity',
            date: '2025-09-10',
            category: 'Networking',
            description: '5G networks are expanding globally, enabling new applications in autonomous vehicles and AR/VR.',
            link: '#'
          },
          {
            title: 'Sustainable Technology: Green Computing Solutions',
            date: '2025-09-08',
            category: 'Sustainability',
            description: 'Technology companies are focusing on sustainable computing solutions to reduce environmental impact.',
            link: '#'
          }
        ];
        setNews(mockNews);
        setNewsData(mockNews); // Share with context
        setLoading(false);
      }
    };

    fetchNews();
  }, [setNewsData]);

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">MEET TECHGEN</span>
          <h1>Experience the Future of Technology News</h1>
          <p>TechGen - revolutionizing news aggregation. Supports various sources for global reach and engagement.</p>
          <button 
            className="cta-button"
            onClick={() => window.open('https://manan-portfolio-alpha.vercel.app/', '_blank')}
          >
            About the Dev →
          </button>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="refresh" size={32} />
              </div>
              <h3>Real-time Updates</h3>
              <p>Evolves with trends, offering increasingly relevant content.</p>
              <button className="feature-link">+ Learn more</button>
            </div>
            <div className="feature-card">
              <h3>Multi-source Aggregation</h3>
              <p>Supports various news sources for comprehensive coverage and engagement.</p>
              <button className="feature-link">+ Learn more</button>
            </div>
            <div className="feature-card">
              <h3>Customizable Feeds</h3>
              <p>Mimics different categories to suit your interests and needs.</p>
              <button className="feature-link">+ Learn more</button>
            </div>
          </div>
        </div>
      </div>

      <div className="news-section">
        <div className="container">
          <div className="section-header">
            <h2>Latest Technology Updates</h2>
            <p>Empowering users with comprehensive tech news coverage</p>
          </div>
          <NewsList news={news} />
        </div>
      </div>


    </div>
  );
};

export default Home;
