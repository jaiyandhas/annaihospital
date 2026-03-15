import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);

    // Mock AI Analysis
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let condition = 'Mild Illness / Needs Review';
      let dept = 'General Medicine';
      let doc = 'Dr. Emily Brown';

      if (lowerInput.includes('chest') || lowerInput.includes('heart') || lowerInput.includes('breath')) {
          condition = 'Possible Cardiovascular Issue';
          dept = 'Cardiology';
          doc = 'Dr. G. Jamuna Saravana Raja';
      } else if (lowerInput.includes('headache') || lowerInput.includes('dizzy') || lowerInput.includes('numb')) {
          condition = 'Neurological Symptoms';
          dept = 'Neurology';
          doc = 'Dr. Michael Chen';
      } else if (lowerInput.includes('bone') || lowerInput.includes('joint') || lowerInput.includes('pain') || lowerInput.includes('fracture')) {
          condition = 'Orthopedic Injury / Arthritis';
          dept = 'Orthopedics';
          doc = 'Dr. James Wilson';
      } else if (lowerInput.includes('child') || lowerInput.includes('baby') || (lowerInput.includes('fever') && lowerInput.includes('kid'))) {
          condition = 'Pediatric Infection';
          dept = 'Pediatrics';
          doc = 'Dr. P. Saravana Raja';
      }

      setResult({ condition, dept, doc });
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Symptom Checker</h1>
          <p style={{ color: '#cbd5e1' }}>Analyze your symptoms and find out which department to visit.</p>
        </div>
      </div>
      
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            
            {!loading && !result && (
              <div className="text-center animate-fade-in" style={{ marginBottom: '2rem' }}>
                <i className='bx bx-brain' style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
                <h3>Describe your symptoms</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Enter your symptoms separated by spaces or commas (e.g., "fever cough headache").</p>
                
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '1.2rem', padding: '1rem' }} 
                      placeholder="E.g., chest pain, shortness of breath..." 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100"><i className='bx bx-analyse'></i> Analyze Symptoms</button>
                </form>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', color: 'var(--primary)' }} className="animate-spin">
                  <i className='bx bx-loader-alt'></i>
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }} className="animate-pulse">AI Engine is analyzing...</p>
              </div>
            )}

            {/* Result Card */}
            {result && (
              <div className="animate-slide-up" style={{ marginTop: '1rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <i className='bx bx-check-shield' style={{ color: 'var(--success-color)' }}></i> Analysis Complete
                </h3>
                
                <div className="grid-2">
                  <div style={{ background: 'var(--bg-color-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--warning-color)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Possible Condition</span>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginTop: '0.25rem' }}>{result.condition}</h4>
                  </div>
                  <div style={{ background: 'var(--bg-color-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-light)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Recommended Action</span>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.25rem' }}>Consult a Specialist</p>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Suggested Department & Doctor</h4>
                   <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                     <i className='bx bx-building-house' style={{ color: 'var(--primary)' }}></i>
                     <strong>Department:</strong> <span>{result.dept}</span>
                   </p>
                   <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                     <i className='bx bx-user-pin' style={{ color: 'var(--accent-dark)' }}></i>
                     <strong>Suggested Doctor:</strong> <span>{result.doc}</span>
                   </p>
                   <button className="btn btn-primary w-100" onClick={() => navigate('/appointment')}>Book Appointment Now</button>
                   <button className="btn btn-outline w-100 mt-2" onClick={() => { setResult(null); setInput(''); }}>Check Other Symptoms</button>
                </div>
                
                <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '1.5rem', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '4px', color: 'var(--danger-color)' }}>
                  *Disclaimer: This is an AI-generated assessment, NOT professional medical advice. If you are experiencing serious problems, you MUST get to a doctor immediately for an accurate diagnosis and treatment.
                </p>
              </div>
            )}
            
          </div>
        </div>
      </section>
      
      <style>{`
        .animate-spin i { animation: bx-spin 2s linear infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
};

export default SymptomChecker;
