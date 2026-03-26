import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [patientId, setPatientId] = useState(null);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    department: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    patientName: '',
    phone: '',
    email: '',
    reason: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [dbDoctors, setDbDoctors] = useState([]);

  useEffect(() => {
    checkUser();
    fetchDoctors();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setFormData(prev => ({ ...prev, email: user.email }));
      
      const { data } = await supabase.from('patients').select('id, full_name').eq('auth_user_id', user.id).single();
      if (data) {
        setPatientId(data.id);
        setFormData(prev => ({ ...prev, patientName: data.full_name }));
      }
    }
  };

  const fetchDoctors = async () => {
    const { data } = await supabase.from('doctors').select('*');
    if (data) setDbDoctors(data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct assignment since formData.doctorId comes directly from dbDoctors now
      const doctorDbId = formData.doctorId ? parseInt(formData.doctorId) : null;

      // ── Duplicate booking guard ──────────────────────────────────────────
      if (doctorDbId && formData.date && formData.timeSlot) {
        const { data: existing, error: dupErr } = await supabase
          .from('appointments')
          .select('id')
          .eq('doctor_id', doctorDbId)
          .eq('appointment_date', formData.date)
          .eq('time_slot', formData.timeSlot)
          .in('status', ['Upcoming', 'Confirmed', 'pending'])
          .maybeSingle();

        if (dupErr) throw dupErr;

        if (existing) {
          const docName = dbDoctors.find(d => d.id === doctorDbId)?.name || 'this doctor';
          throw new Error(`The ${formData.timeSlot} slot on ${formData.date} is already booked for ${docName}. Please choose a different time.`);
        }
      }
      // ────────────────────────────────────────────────────────────────────

      const { data, error } = await supabase.from('appointments').insert([{
        patient_id: patientId, // Can be null for guests
        doctor_id: doctorDbId,
        department: formData.department,
        appointment_date: formData.date,
        time_slot: formData.timeSlot,
        status: 'Upcoming'
      }]);
      
      if (error) throw error;
      
      alert('Appointment booked successfully!');
      
      if (user) {
        navigate('/patient-portal');
      } else {
        navigate('/auth'); // Encourage guests to sign up
      }
    } catch (err) {
      alert('Error booking appointment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="hero-bg" style={{ height: '30vh', opacity: 0.5 }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="section-title">Book an Appointment</h1>
        <p className="section-subtitle">Secure your consultation with our specialists in a few easy steps.</p>

        <div className="glass-card mt-3 animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Progress Steps */}
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div style={{ color: step >= 1 ? 'var(--primary)' : 'var(--text-light)', fontWeight: step >= 1 ? 600 : 400 }}>1. Specialty</div>
            <div style={{ color: step >= 2 ? 'var(--primary)' : 'var(--text-light)', fontWeight: step >= 2 ? 600 : 400 }}>2. Date & Time</div>
            <div style={{ color: step >= 3 ? 'var(--primary)' : 'var(--text-light)', fontWeight: step >= 3 ? 600 : 400 }}>3. Details</div>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Specialty & Doctor */}
            {step === 1 && (
              <div className="animate-slide-up">
                <div className="form-group">
                  <label className="form-label">Select Department *</label>
                  <select className="form-control" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">-- Choose Department --</option>
                    {[...new Set(dbDoctors.map(doc => doc.department))].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                {formData.department && (
                  <div className="form-group fade-in mt-2">
                    <label className="form-label">Select Doctor (Optional)</label>
                    <div className="grid-2">
                      {dbDoctors.filter(doc => doc.department === formData.department).map(doc => (
                        <div 
                          key={doc.id}
                          className={`doctor-card glass-card ${parseInt(formData.doctorId) === doc.id ? 'selected' : ''}`}
                          style={{ cursor: 'pointer', border: parseInt(formData.doctorId) === doc.id ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}
                          onClick={() => handleChange({ target: { name: 'doctorId', value: doc.id.toString() } })}
                        >
                          <h4 style={{ margin: 0, color: 'var(--primary-dark)' }}>Dr. {doc.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{doc.specialty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.department}>Continue</button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="animate-slide-up">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Select Date *</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      min={new Date().toISOString().split('T')[0]} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Available Time Slots *</label>
                    <select className="form-control" name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                      <option value="">-- Choose Time --</option>
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.date || !formData.timeSlot}>Continue</button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Details */}
            {step === 3 && (
              <div className="animate-slide-up">
                {!user && (
                  <div style={{ background: 'var(--primary-light)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Want to manage your appointments easily?</span>
                    <button type="button" className="btn bg-white" style={{ color: 'var(--primary)' }} onClick={() => navigate('/auth')}>Login / Register</button>
                  </div>
                )}
                
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Patient Name *</label>
                    <input type="text" className="form-control" name="patientName" value={formData.patientName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Visit (Optional)</label>
                  <textarea className="form-control" name="reason" value={formData.reason} onChange={handleChange} rows="3" placeholder="Briefly describe your symptoms or reason..."></textarea>
                </div>
                
                <div style={{ background: 'var(--bg-color-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                   <strong>Summary:</strong> {formData.department} Appointment {formData.doctorId && `with Dr. ${dbDoctors.find(d=>d.id === parseInt(formData.doctorId))?.name}`} on {formData.date} at {formData.timeSlot}.
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Confirming...' : 'Confirm Appointment'}</button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
