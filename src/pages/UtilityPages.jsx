import React from 'react';
import { useNavigate } from 'react-router-dom';



export const LabReportsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center', background: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="glass-card" style={{ padding: '3rem' }}>
          <i className='bx bx-test-tube' style={{ fontSize: '5rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
          <h1 style={{ color: 'var(--primary-dark)' }}>Lab Reports</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>To ensure your privacy and security, all laboratory reports require authentication. Please log in to your Patient Portal to view and download your reports securely.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth')}>Access Patient Dashboard</button>
        </div>
      </div>
    </div>
  );
};
