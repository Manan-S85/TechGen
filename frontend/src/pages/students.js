import React, { useState, useEffect } from 'react';
import StudentSection from '../components/studentsection';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock students data - replace with API call later
    const mockStudents = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        course: 'Computer Science',
        year: '3rd Year'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        course: 'Information Technology',
        year: '2nd Year'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        course: 'Software Engineering',
        year: '4th Year'
      }
    ];

    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <div className="container">
        <h2>Please login to view students</h2>
        <a href="/login" className="btn">Login</a>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="container">
      <h2>Students Management</h2>
      <StudentSection students={students} userRole={user.role} />
    </div>
  );
};

export default Students;
