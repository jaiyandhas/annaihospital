import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const PatientPortal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ongoingTokens, setOngoingTokens] = useState({}); // { doctor_id: token_number }

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);

      // Fetch patient profile
      const { data: profile } = await supabase
        .from('patients')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();
      
      if (profile) {
        setPatientData(profile);
        
        // Fetch appointments
        const { data: apts } = await supabase
          .from('appointments')
          .select('*, doctors(name, department)')
          .eq('patient_id', profile.id)
          .order('appointment_date', { ascending: true });
        setAppointments(apts || []);

        // Fetch prescriptions
        const { data: prescs } = await supabase
          .from('prescriptions')
          .select('*, doctors(name)')
          .eq('patient_id', profile.id)
          .order('prescribed_date', { ascending: false });
        setPrescriptions(prescs || []);

        // Fetch lab reports (order by created_at as safe fallback — date_uploaded may not exist in all schema versions)
        const { data: labs } = await supabase
          .from('lab_reports')
          .select('*')
          .eq('patient_id', profile.id)
          .order('created_at', { ascending: false });
        setLabReports(labs || []);

        // Fetch ongoing tokens for doctors the patient is seeing today
        if (apts && apts.length > 0) {
          const todayDocs = apts
            .filter(a => new Date(a.appointment_date).toDateString() === new Date().toDateString())
            .map(a => a.doctor_id);
          
          if (todayDocs.length > 0) {
             const { data: ongoingApts } = await supabase
               .from('appointments')
               .select('doctor_id, token_number')
               .in('doctor_id', todayDocs)
               .eq('appointment_date', new Date().toISOString().split('T')[0])
               .eq('status', 'Ongoing');
             
             if (ongoingApts) {
               const mapping = {};
               ongoingApts.forEach(a => mapping[a.doctor_id] = a.token_number);
               setOngoingTokens(mapping);
             }

             // Realtime listener for queue updates
             const channels = supabase.channel('queue-updates')
               .on(
                 'postgres_changes',
                 { event: 'UPDATE', schema: 'public', table: 'appointments' },
                 (payload) => {
                   if (payload.new.status === 'Ongoing') {
                     setOngoingTokens(prev => ({ ...prev, [payload.new.doctor_id]: payload.new.token_number }));
                   }
                 }
               )
               .subscribe();
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading your secure dashboard...</div>;

  const upcomingApts = appointments.filter(a => new Date(a.appointment_date) >= new Date() && a.status !== 'Cancelled');
  const pastApts = appointments.filter(a => new Date(a.appointment_date) < new Date() || a.status === 'Cancelled');
  const activePresc = prescriptions.filter(p => p.status === 'Active');

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-color)', paddingTop: '90px' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', background: 'white', borderRight: '1px solid var(--border-color)', padding: '2rem', height: '100%', overflowY: 'auto' }} className="desktop-only">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>
            <i className='bx bx-user'></i>
          </div>
          <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.25rem' }}>{patientData?.full_name || 'Patient'}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{patientData?.email}</p>
        </div>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
          <li><a href="#" className="portal-nav active"><i className='bx bx-grid-alt'></i> Dashboard</a></li>
          <li><a href="#appointments" className="portal-nav"><i className='bx bx-calendar-event'></i> Appointments</a></li>
          <li><a href="#reports" className="portal-nav"><i className='bx bx-file-blank'></i> Lab Reports</a></li>
          <li><a href="#prescriptions" className="portal-nav"><i className='bx bx-capsule'></i> Prescriptions</a></li>
        </ul>

        <div style={{ marginTop: '2rem' }}>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}><i className='bx bx-log-out'></i> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ color: 'var(--primary-dark)', fontSize: '2rem' }}>Welcome back, {patientData?.full_name?.split(' ')[0]}!</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Here is an overview of your health profile.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/appointment')}><i className='bx bx-plus'></i> New Appointment</button>
          </header>

          {/* Stats Row */}
          <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success-color)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                <i className='bx bx-calendar-check'></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0 }}>{upcomingApts.length}</h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Upcoming Appts</span>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(15, 76, 129, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                <i className='bx bx-file'></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0 }}>{labReports.length}</h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Lab Reports</span>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                <i className='bx bx-capsule'></i>
              </div>
              <div>
                <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0 }}>{activePresc.length}</h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Active Prescriptions</span>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem' }}>

            {/* Appointments Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} id="appointments">
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className='bx bx-time'></i> Upcoming Appointments</h3>
                
                {upcomingApts.length === 0 ? (
                   <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No upcoming appointments scheduled.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {upcomingApts.map(apt => {
                      const isToday = new Date(apt.appointment_date).toDateString() === new Date().toDateString();
                      const currentOngoing = ongoingTokens[apt.doctor_id] || 0;
                      const isMyTurn = currentOngoing === apt.token_number;
                      const estimatedWaitTokens = apt.token_number - currentOngoing;
                      
                      return (
                      <div key={apt.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent)', background: isToday ? 'rgba(14, 165, 233, 0.05)' : 'transparent' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{apt.department} Consultation</h4>
                          <span className={`status-badge ${apt.status === 'Ongoing' ? 'status-green' : 'status-yellow'}`} style={{ fontSize: '0.7rem', background: apt.status === 'Ongoing' ? 'var(--success-color)' : '', color: apt.status === 'Ongoing' ? 'white' : ''}}>
                            {apt.status || 'Scheduled'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><i className='bx bx-user-pin'></i> Dr. {apt.doctors?.name || 'Assigned Doctor'}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, margin: 0 }}><i className='bx bx-calendar'></i> {new Date(apt.appointment_date).toLocaleDateString()}</p>
                        
                        {/* Live token tracker if appointment is today and has a token */}
                        {isToday && apt.token_number && (
                          <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid rgba(15, 76, 129, 0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your Token</p>
                                <h2 style={{ margin: 0, color: 'var(--primary-dark)', fontSize: '1.8rem' }}>#{apt.token_number}</h2>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Now Serving</p>
                                <h2 style={{ margin: 0, color: currentOngoing ? 'var(--success-color)' : 'var(--text-light)', fontSize: '1.8rem' }}>
                                  {currentOngoing ? `#${currentOngoing}` : '—'}
                                </h2>
                              </div>
                            </div>
                            
                            {apt.status === 'Completed' ? (
                               <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--success-color)', fontWeight: 600 }}>Consultation completed.</p>
                            ) : isMyTurn ? (
                               <div style={{ marginTop: '0.8rem', padding: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success-color)', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>
                                 <i className='bx bx-bell'></i> It is your turn! Please go to the doctor's room.
                               </div>
                            ) : estimatedWaitTokens > 0 ? (
                              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--warning-color)', fontWeight: 500 }}>
                                <i className='bx bx-time'></i> Estimated wait: ~{estimatedWaitTokens * 10} mins ({estimatedWaitTokens} patients ahead)
                              </p>
                            ) : (
                              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Queue hasn't reached your token yet.</p>
                            )}
                          </div>
                        )}
                      </div>
                    )})}
                  </div>
                )}
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className='bx bx-history'></i> Past Appointments</h3>
                {pastApts.length === 0 ? (
                   <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No past appointments found.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pastApts.slice(0,3).map(apt => (
                      <div key={apt.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{apt.department} Consultation</h4>
                          <span className="status-badge" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{apt.status}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><i className='bx bx-user-pin'></i> Dr. {apt.doctors?.name || 'Doctor'}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}><i className='bx bx-calendar'></i> {new Date(apt.appointment_date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Reports & Prescriptions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div className="glass-card" style={{ padding: '1.5rem' }} id="prescriptions">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><i className='bx bx-capsule'></i> Prescriptions</h3>
                </div>

                {prescriptions.length === 0 ? (
                   <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No active prescriptions.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {prescriptions.map(p => (
                      <div key={p.id} style={{ padding: '1rem', background: 'var(--bg-color-alt)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: p.status === 'Active' ? '4px solid var(--accent)' : 'none' }}>
                        <i className='bx bx-plus-medical' style={{ fontSize: '2rem', color: p.status === 'Active' ? 'var(--accent-dark)' : 'var(--text-light)' }}></i>
                        <div>
                          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{p.medication_name} <span style={{fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>({p.dosage})</span></h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{p.instructions}</p>
                          <p style={{ color: 'var(--primary)', fontSize: '0.75rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>By: Dr. {p.doctors?.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }} id="reports">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><i className='bx bx-file-blank'></i> Lab Reports</h3>
                </div>

                {labReports.length === 0 ? (
                   <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No lab reports available yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {labReports.map(report => (
                      <div key={report.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>{report.report_name}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(report.date_uploaded || report.created_at).toLocaleDateString()} | Ordered By: {report.ordered_by || '—'}</span>
                        </div>
                        <a href={report.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                          <i className='bx bx-download'></i> View
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      <style>{`
        .portal-nav {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: all 0.2s;
          font-weight: 500;
          text-decoration: none;
        }
        .portal-nav:hover {
          background: rgba(15, 76, 129, 0.05);
          color: var(--primary);
        }
        .portal-nav.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 10px rgba(15, 76, 129, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PatientPortal;
