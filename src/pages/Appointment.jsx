import React from 'react';
import { Link } from 'react-router-dom';

const Appointment = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>

        {/* Icon */}
        <div style={{ width: '90px', height: '90px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <i className='bx bx-calendar-x' style={{ fontSize: '3.5rem', color: 'var(--accent)' }}></i>
        </div>

        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' }}>
          Online Booking Unavailable
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '550px', margin: '0 auto 2.5rem' }}>
          We're currently not accepting online appointment bookings. Please <strong>call us</strong> or <strong>visit the hospital directly</strong> to schedule a consultation with our specialists.
        </p>

        {/* Contact Options */}
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>

          {/* Phone */}
          <a href="tel:+919944057549" style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', borderLeft: '4px solid #10b981' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <i className='bx bxs-phone-call' style={{ fontSize: '1.8rem', color: '#10b981' }}></i>
              </div>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Call Us</h3>
              <p style={{ color: '#10b981', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>+91 99440 57549</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem' }}>Available 24/7 for emergencies</p>
            </div>
          </a>

          {/* Visit */}
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <i className='bx bxs-map' style={{ fontSize: '1.8rem', color: '#8b5cf6' }}></i>
            </div>
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Visit Us</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>Near Valaraigate,</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Tiruchengode, Tamil Nadu</p>
          </div>

        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px' }}>
            <i className='bx bx-envelope' style={{ marginRight: '0.5rem' }}></i> Send Us a Message
          </Link>
          <Link to="/" className="btn btn-outline" style={{ padding: '0.8rem 2rem', borderRadius: '30px' }}>
            <i className='bx bx-home-alt' style={{ marginRight: '0.5rem' }}></i> Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Appointment;
