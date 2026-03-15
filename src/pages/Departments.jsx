import React from 'react';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Centers of Excellence</h1>
          <p style={{ color: '#cbd5e1' }}>World-class specialists and state-of-the-art facilities dedicated to your health.</p>
        </div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '3rem' }}>
             
             {/* Pediatrics */}
             <div className="glass-card dept-detail-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)' }}>
                <div style={{ height: '200px', background: 'linear-gradient(135deg, rgba(15, 76, 129, 0.9), rgba(34, 197, 94, 0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <i className='bx bx-child' style={{ fontSize: '5rem', color: 'white' }}></i>
                </div>
                <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                   <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Pediatrics & Child Care</h2>
                   <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>Compassionate and specialized healthcare for infants, children, and adolescents. Our child-friendly environment ensures reduced anxiety during treatments and checkups.</p>
                   <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Vaccinations</span>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Neonatal Care</span>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>General Checkups</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                         <i className='bx bx-user-circle' style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> Dr. P. Saravana Raja
                      </div>
                      <button className="btn btn-primary" onClick={() => navigate('/appointment')}>Book Now</button>
                   </div>
                </div>
             </div>

             {/* Maternity */}
             <div className="glass-card dept-detail-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)' }}>
                <div style={{ height: '200px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(15, 76, 129, 0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <i className='bx bx-female' style={{ fontSize: '5rem', color: 'white' }}></i>
                </div>
                <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                   <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Obstetrics & Gynecology</h2>
                   <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>Comprehensive women's health services from adolescence through menopause, including expert maternity care, reproductive health, and surgical interventions.</p>
                   <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Maternity Care</span>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Women's Wellness</span>
                      <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Surgical Obstetrics</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                         <i className='bx bx-user-circle' style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> Dr. G. Jamuna Raja
                      </div>
                      <button className="btn btn-primary" onClick={() => navigate('/appointment')}>Book Now</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
