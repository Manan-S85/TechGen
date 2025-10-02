import React from 'react';

const StudentSection = ({ students, userRole }) => {
  const handleEdit = (studentId) => {
    console.log('Edit student:', studentId);
    // Implement edit functionality
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      console.log('Delete student:', studentId);
      // Implement delete functionality
    }
  };

  return (
    <div className="students-section">
      <div className="students-header">
        <h3>Student List</h3>
        {userRole === 'admin' && (
          <button className="btn btn-primary">Add New Student</button>
        )}
      </div>
      
      <div className="students-grid">
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <h4>{student.name}</h4>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Year:</strong> {student.year}</p>
              
              {userRole === 'admin' && (
                <div className="student-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentSection;
