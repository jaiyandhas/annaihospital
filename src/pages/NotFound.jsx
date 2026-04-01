import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '150px 1rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '8rem', fontWeight: 800, color: 'var(--primary)', margin: 0, lineHeight: 1, opacity: 0.2 }}>404</h1>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginTop: '-2rem', marginBottom: '1.5rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px' }}>
            <i className='bx bx-home-alt' style={{ marginRight: '0.5rem' }}></i> Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline" style={{ padding: '0.8rem 2rem', borderRadius: '30px' }}>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
