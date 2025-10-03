import React, { useState, useEffect } from 'react';
import StudentSection from '../components/studentsection';

const Students = () => {
  const [studentNews, setStudentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchStudentNews = async () => {
      if (!userData) {
        setLoading(false);
        return;
      }

      try {
        const userObj = JSON.parse(userData);
        const headers = {};
        if (userObj.token) {
          headers['Authorization'] = `Bearer ${userObj.token}`;
        }

        const response = await fetch('/api/news/students', { headers });
        if (!response.ok) {
          throw new Error('Failed to fetch student news');
        }
        const data = await response.json();
        setStudentNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentNews();
  }, []);

  if (!user) {
    return (
      <div className="container">
        <h2>Please login to view the Student Section</h2>
        <p>Access student-specific news, resources, and information by signing up or logging in.</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
          <a href="/login" className="btn btn-secondary">Login</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading student news...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Student News & Resources</h2>
      <p>Stay updated with news relevant to students, education, and career development.</p>
      <StudentSection studentNews={studentNews} userRole={user.role} />
    </div>
  );
};

export default Students;
