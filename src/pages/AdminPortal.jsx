import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const ALLOWED_ADMINS = ['jaiyandhas@gmail.com', 'admin@annaihospital.com'];

const Toast = ({ message, type, onClose }) => (
  <div style={{
    position: 'fixed', top: '100px', right: '2rem', zIndex: 9999,
    padding: '1rem 1.5rem', borderRadius: '12px', minWidth: '280px',
    background: type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    animation: 'slideIn 0.3s ease'
  }}>
    <i className={`bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}`} style={{ fontSize: '1.5rem' }}></i>
    <span style={{ fontWeight: 500 }}>{message}</span>
    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 'auto', fontSize: '1.2rem', opacity: 0.8 }}>×</button>
  </div>
);

const StatCard = ({ icon, value, label, color }) => (
  <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <i className={`bx ${icon}`} style={{ fontSize: '1.75rem', color: 'white' }}></i>
    </div>
    <div>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>{value}</h3>
      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{label}</p>
    </div>
  </div>
);

const AdminPortal = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  // Data states
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');

  // Upload form states
  const [selectedPatient, setSelectedPatient] = useState('');
  const [reportName, setReportName] = useState('');
  const [orderedBy, setOrderedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      // DB-level check: look for patient row with admin role OR check hardcoded admins
      const { data: patientData } = await supabase
        .from('patients')
        .select('role')
        .eq('email', user.email)
        .single();

      const isDbAdmin = patientData?.role === 'admin';
      const isHardcodedAdmin = ALLOWED_ADMINS.includes(user.email.toLowerCase());

      if (!isDbAdmin && !isHardcodedAdmin) {
        showToast('Unauthorized. Admin access only.', 'error');
        setTimeout(() => navigate('/'), 1500);
        return;
      }

      setIsAdmin(true);
      // Fetch all data after confirmed admin
      await Promise.all([fetchPatients(), fetchDoctors(), fetchAppointments(), fetchLabReports()]);
    } catch (err) {
      console.error(err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    const { data } = await supabase.from('patients').select('*').order('full_name');
    if (data) setPatients(data);
  };

  const fetchDoctors = async () => {
    const { data } = await supabase.from('doctors').select('id, name, department').order('name');
    if (data) setDoctors(data);
  };

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*, patients(full_name, email)')
      .order('appointment_date', { ascending: false })
      .limit(50);
    if (data) setAppointments(data);
  };

  const fetchLabReports = async () => {
    const { data } = await supabase
      .from('lab_reports')
      .select('*, patients(full_name)')
      .order('date_uploaded', { ascending: false })
      .limit(50);
    if (data) setLabReports(data);
  };

  const handleUploadReport = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !reportName || !fileUrl) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    setUploading(true);
    try {
      const { error } = await supabase.from('lab_reports').insert([{
        patient_id: selectedPatient,
        report_name: reportName,
        file_url: fileUrl,
        ordered_by: orderedBy,
        notes: notes
      }]);

      if (error) throw error;
      showToast('Lab report published to patient portal!');
      setSelectedPatient(''); setReportName(''); setOrderedBy(''); setNotes(''); setFileUrl('');
      fetchLabReports();
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const filteredPatients = patients.filter(p =>
    p.full_name?.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.email?.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bx-grid-alt' },
    { id: 'patients', label: 'Patients', icon: 'bx-group' },
    { id: 'upload', label: 'Upload Report', icon: 'bx-upload' },
    { id: 'appointments', label: 'Appointments', icon: 'bx-calendar' },
  ];

  if (loading) return (
    <div style={{ paddingTop: '150px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      <div style={{ width: '60px', height: '60px', border: '4px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }}></div>
      <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Verifying Admin credentials...</p>
    </div>
  );

  if (!isAdmin) return null;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', flexDirection: 'column' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Admin Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
          <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className='bx bx-shield-quarter' style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Annai Hospital — Admin Portal</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Staff Dashboard &amp; Management</p>
          </div>
        </div>
        <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, backdropFilter: 'blur(5px)' }}>
          <i className='bx bx-log-out'></i> Logout
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, maxWidth: '1200px', margin: '2rem auto', width: '100%', padding: '0 1.5rem', gap: '1.5rem' }}>
        {/* Sidebar */}
        <aside style={{ width: '220px', flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: '0.5rem', position: 'sticky', top: '100px' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                width: '100%', padding: '0.85rem 1rem', border: 'none', borderRadius: '10px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', fontWeight: 500, fontSize: '0.95rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                marginBottom: '0.25rem', transition: 'all 0.2s'
              }}>
                <i className={`bx ${tab.icon}`} style={{ fontSize: '1.2rem' }}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* ── DASHBOARD TAB ─────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className='bx bx-grid-alt'></i> Overview
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon="bx-group" value={patients.length} label="Registered Patients" color="linear-gradient(135deg, #0ea5e9, #0284c7)" />
                <StatCard icon="bx-file-blank" value={labReports.length} label="Lab Reports Uploaded" color="linear-gradient(135deg, #10b981, #059669)" />
                <StatCard icon="bx-calendar-check" value={appointments.length} label="Total Appointments" color="linear-gradient(135deg, #f97316, #ea580c)" />
                <StatCard icon="bx-user-pin" value={doctors.length} label="Doctors on Record" color="linear-gradient(135deg, #8b5cf6, #7c3aed)" />
              </div>

              {/* Recent Reports */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className='bx bx-history'></i> Recent Lab Report Uploads
                </h3>
                {labReports.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No reports uploaded yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Patient</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Report</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Ordered By</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labReports.slice(0, 8).map(r => (
                          <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.75rem', fontWeight: 500 }}>{r.patients?.full_name || '—'}</td>
                            <td style={{ padding: '0.75rem' }}>{r.report_name}</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{r.ordered_by || '—'}</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(r.date_uploaded).toLocaleDateString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PATIENTS TAB ─────────────────────────────── */}
          {activeTab === 'patients' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className='bx bx-group'></i> All Patients ({filteredPatients.length})
                </h2>
                <div style={{ position: 'relative' }}>
                  <i className='bx bx-search' style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}></i>
                  <input
                    type="text" placeholder="Search by name or email..."
                    value={patientSearch} onChange={e => setPatientSearch(e.target.value)}
                    style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', minWidth: '250px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                {filteredPatients.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No patients found.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
                        {['Name', 'Email', 'Phone', 'Age', 'Gender', 'Role'].map(h => (
                          <th key={h} style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((p, i) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(14, 165, 233, 0.03)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{p.full_name}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{p.email}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{p.phone_number || '—'}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{p.age || '—'}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{p.gender || '—'}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: p.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(14, 165, 233, 0.1)', color: p.role === 'admin' ? '#7c3aed' : 'var(--primary)' }}>
                              {p.role || 'patient'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ── UPLOAD REPORT TAB ─────────────────────────── */}
          {activeTab === 'upload' && (
            <div>
              <h2 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className='bx bx-upload'></i> Upload Lab Report
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select a patient, fill in report details, and paste the secure PDF/image link. It will appear immediately on their Patient Portal.
              </p>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <form onSubmit={handleUploadReport}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>Select Patient *</label>
                    <select className="form-control" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} required>
                      <option value="" disabled>-- Select Patient --</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.full_name} ({p.email})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 600 }}>Report Title *</label>
                      <input type="text" className="form-control" placeholder="e.g., Complete Blood Count (CBC)" value={reportName} onChange={e => setReportName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 600 }}>Ordered By (Doctor)</label>
                      <select className="form-control" value={orderedBy} onChange={e => setOrderedBy(e.target.value)}>
                        <option value="">-- Select Doctor --</option>
                        {doctors.length > 0
                          ? doctors.map(d => <option key={d.id} value={d.name}>{d.name} — {d.department}</option>)
                          : <>
                              <option value="Dr. P. Saravana Raja">Dr. P. Saravana Raja — Pediatrics</option>
                              <option value="Dr. G. Jamuna Saravana Raja">Dr. G. Jamuna Saravana Raja — Gynaecology</option>
                            </>
                        }
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>File URL (PDF / Image link) *</label>
                    <div style={{ position: 'relative' }}>
                      <i className='bx bx-link' style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '1.1rem' }}></i>
                      <input type="url" className="form-control" style={{ paddingLeft: '2.5rem' }} placeholder="https://..." value={fileUrl} onChange={e => setFileUrl(e.target.value)} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600 }}>Additional Notes</label>
                    <textarea className="form-control" rows="3" placeholder="Any clinical notes for the patient..." value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={uploading} style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <i className={`bx ${uploading ? 'bx-loader-alt bx-spin' : 'bx-paper-plane'}`}></i>
                    {uploading ? 'Publishing...' : 'Publish Report to Patient Portal'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── APPOINTMENTS TAB ─────────────────────────── */}
          {activeTab === 'appointments' && (
            <div>
              <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className='bx bx-calendar'></i> All Appointments ({appointments.length})
              </h2>
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                {appointments.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No appointments booked yet.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                        {['Patient', 'Department', 'Date', 'Time', 'Status'].map(h => (
                          <th key={h} style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a, i) => {
                        const statusColors = {
                          'Scheduled': { bg: 'rgba(14, 165, 233, 0.1)', color: '#0284c7' },
                          'Completed': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
                          'Cancelled': { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' },
                        };
                        const sc = statusColors[a.status] || statusColors['Scheduled'];
                        return (
                          <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'rgba(249, 115, 22, 0.02)' }}>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{a.patients?.full_name || 'Unknown'}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>{a.department || '—'}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>{new Date(a.appointment_date).toLocaleDateString('en-IN')}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>{a.time_slot}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: sc.bg, color: sc.color }}>
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminPortal;
