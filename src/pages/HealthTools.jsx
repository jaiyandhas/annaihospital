import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthTools = () => {
  const navigate = useNavigate();
  
  // BMI State
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Diabetes State
  const [diaAge, setDiaAge] = useState('');
  const [diaWeight, setDiaWeight] = useState('1');
  const [diaFamily, setDiaFamily] = useState('0');
  const [diaResult, setDiaResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    const bmi = (w / (h * h)).toFixed(1);

    let category = ''; let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = 'var(--warning-color)'; }
    else if (bmi >= 18.5 && bmi <= 24.9) { category = 'Normal Weight'; color = 'var(--success-color)'; }
    else if (bmi >= 25 && bmi <= 29.9) { category = 'Overweight'; color = 'var(--warning-color)'; }
    else { category = 'Obese'; color = 'var(--danger-color)'; }

    setBmiResult({ bmi, category, color });
  };

  const calculateDiabetes = (e) => {
    e.preventDefault();
    const age = parseInt(diaAge);
    const weightScore = parseInt(diaWeight);
    const famScore = parseInt(diaFamily);

    let riskPoints = 0;
    if (age > 45) riskPoints += 2;
    else if (age > 35) riskPoints += 1;
    if (weightScore === 3) riskPoints += 3;
    else if (weightScore === 2) riskPoints += 1;
    if (famScore === 1) riskPoints += 3;

    let riskLabel = ''; let color = ''; let percent = 0;
    if (riskPoints <= 2) { riskLabel = 'Low Risk'; color = 'var(--success-color)'; percent = 15; }
    else if (riskPoints <= 4) { riskLabel = 'Moderate Risk'; color = 'var(--warning-color)'; percent = 50; }
    else { riskLabel = 'High Risk'; color = 'var(--danger-color)'; percent = 85; }

    setDiaResult({ riskLabel, color, percent });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Health Calculators</h1>
          <p style={{ color: '#cbd5e1' }}>Evaluate your health metrics instantly with our clinical-grade tools.</p>
        </div>
      </div>
      
      <section className="section bg-light">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="grid-2" style={{ gap: '2rem' }}>
            
            {/* BMI Calculator */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <i className='bx bx-body' style={{ fontSize: '2.5rem', color: 'var(--primary)' }}></i>
                <h3 style={{ color: 'var(--primary-dark)', margin: 0 }}>BMI Calculator</h3>
              </div>
              
              <form onSubmit={calculateBMI} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                 <div className="form-group">
                   <label className="form-label">Height (cm)</label>
                   <input type="number" className="form-control" placeholder="175" value={bmiHeight} onChange={e=>setBmiHeight(e.target.value)} required min="50" max="300" />
                 </div>
                 <div className="form-group">
                   <label className="form-label">Weight (kg)</label>
                   <input type="number" className="form-control" placeholder="70" value={bmiWeight} onChange={e=>setBmiWeight(e.target.value)} required min="10" max="400" />
                 </div>
                 <div style={{ marginTop: 'auto' }}>
                   <button type="submit" className="btn btn-primary w-100"><i className='bx bx-calculator'></i> Calculate BMI</button>
                 </div>
              </form>

              {bmiResult && (
                <div className="animate-fade-in" style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'white', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Clinical Assessment</span>
                  <div style={{ margin: '1.5rem 0' }}>
                    <h2 style={{ fontSize: '4rem', color: bmiResult.color, lineHeight: 1, margin: 0, fontWeight: 800 }}>{bmiResult.bmi}</h2>
                    <p style={{ marginTop: '0.5rem', fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Body Mass Index (kg/m²)</p>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '30px', background: `${bmiResult.color}15`, color: bmiResult.color, fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                    <i className='bx bxs-circle' style={{ fontSize: '0.6rem' }}></i> Status: {bmiResult.category}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                    {bmiResult.category === 'Normal Weight' ? 'Excellent! You are within the healthy weight range.' : 'Your BMI falls outside the standard healthy range. We recommend consulting with our specialists.'}
                  </p>
                  <button className="btn btn-primary w-100" onClick={() => navigate('/appointment')}><i className='bx bx-calendar-event'></i> Book Consultation</button>
                </div>
              )}
            </div>

            {/* Diabetes Risk Checker */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <i className='bx bx-reflect-horizontal' style={{ fontSize: '2.5rem', color: 'var(--danger-color)' }}></i>
                <h3 style={{ color: 'var(--primary-dark)', margin: 0 }}>Diabetes Risk Checker</h3>
              </div>
              
              <form onSubmit={calculateDiabetes} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                 <div className="form-group">
                   <label className="form-label">Age</label>
                   <input type="number" className="form-control" placeholder="45" value={diaAge} onChange={e=>setDiaAge(e.target.value)} required min="1" max="120" />
                 </div>
                 <div className="form-group">
                   <label className="form-label">Weight Status</label>
                   <select className="form-control" value={diaWeight} onChange={e=>setDiaWeight(e.target.value)} required>
                      <option value="1">Normal Weight</option>
                      <option value="2">Overweight</option>
                      <option value="3">Obese</option>
                   </select>
                 </div>
                 <div className="form-group" style={{ marginBottom: '2rem' }}>
                   <label className="form-label">Family History of Diabetes?</label>
                   <select className="form-control" value={diaFamily} onChange={e=>setDiaFamily(e.target.value)} required>
                      <option value="0">No</option>
                      <option value="1">Yes (Parent or Sibling)</option>
                   </select>
                 </div>
                 <div style={{ marginTop: 'auto' }}>
                   <button type="submit" className="btn w-100" style={{ background: 'var(--danger-color)', color: 'white' }}><i className='bx bx-line-chart'></i> Evaluate Risk</button>
                 </div>
              </form>

              {diaResult && (
                <div className="animate-fade-in" style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'white', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Risk Evaluation</span>
                  <div style={{ margin: '1.5rem 0' }}>
                    <h2 style={{ fontSize: '2.2rem', color: diaResult.color, margin: 0, fontWeight: 800 }}>{diaResult.riskLabel}</h2>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', margin: '1.5rem 0' }}>
                    <div style={{ width: `${diaResult.percent}%`, height: '100%', background: diaResult.color, borderRadius: '5px', transition: 'width 1s ease' }}></div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                    {diaResult.riskLabel === 'Low Risk' ? 'Great news! Your current profile indicates a low risk.' : 'Based on your inputs, you have an elevated risk profile. Early detection is key.'}
                  </p>
                  <button className="btn btn-outline w-100" onClick={() => navigate('/appointment')} style={{ borderColor: diaResult.color, color: diaResult.color }}>Book Health Checkup</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthTools;
