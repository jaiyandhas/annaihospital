import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [exp, setExp] = useState('all');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      setDoctors(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const s = search.toLowerCase();
    const res = doctors.filter(doc => {
      const matchSearch = doc.name.toLowerCase().includes(s);
      const matchDept =
        dept === 'all' ||
        (doc.department && doc.department.toLowerCase() === dept.toLowerCase());
      const matchExp =
        exp === 'all' ||
        (doc.experience_years && doc.experience_years >= parseInt(exp));
      return matchSearch && matchDept && matchExp;
    });
    setFiltered(res);
  };

  // Ensures "Dr." prefix is present exactly once regardless of DB value
  const formatName = (name) => {
    if (!name) return '';
    return name.startsWith('Dr. ') ? name : `Dr. ${name}`;
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div
        className="page-header"
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Find a Doctor</h1>
          <p style={{ color: '#cbd5e1' }}>
            Search our complete directory of specialized medical professionals.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div
            className="filter-section glass-card"
            style={{ marginBottom: '3rem', padding: '1.5rem' }}
          >
            <div className="grid-4" style={{ gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <select
                  className="form-control"
                  value={dept}
                  onChange={e => setDept(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="Neonatology & Paediatrics">Neonatology &amp; Paediatrics</option>
                  <option value="Obstetrics & Gynaecology">Obstetrics &amp; Gynaecology</option>
                  <option value="Pulmonology & Sleep Medicine">Pulmonology &amp; Sleep Medicine</option>
                  <option value="Orthopaedics">Orthopaedics</option>
                  <option value="Paediatric Surgery">Paediatric Surgery</option>
                  <option value="Anaesthesiology">Anaesthesiology</option>
                  <option value="General & Laparoscopic Surgery">General &amp; Laparoscopic Surgery</option>
                </select>
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <select
                  className="form-control"
                  value={exp}
                  onChange={e => setExp(e.target.value)}
                >
                  <option value="all">Any Experience</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <button className="btn btn-primary w-100" onClick={handleFilter}>
                  <i className="bx bx-filter-alt"></i> Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid-4">
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                <i
                  className="bx bx-loader-alt bx-spin"
                  style={{ fontSize: '3rem', color: 'var(--primary)' }}
                ></i>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                  Loading directory...
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div
                style={{
                  gridColumn: '1/-1',
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'var(--text-secondary)',
                }}
              >
                No doctors found matching filters.
              </div>
            ) : (
              filtered.map(doc => (
                <div
                  key={doc.id}
                  className="doctor-profile-card glass-card p-0"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* Photo */}
                  <div
                    style={{
                      height: '220px',
                      overflow: 'hidden',
                      borderRadius: '12px 12px 0 0',
                      background:
                        'linear-gradient(135deg, var(--primary-light), var(--primary))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {doc.image_url ? (
                      <img
                        src={doc.image_url}
                        alt={doc.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                        onError={e => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <i
                        className="bx bx-user"
                        style={{ color: 'white', fontSize: '5rem' }}
                      ></i>
                    )}
                  </div>

                  {/* Info */}
                  <div
                    className="doctor-info p-2"
                    style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                      {formatName(doc.name)}
                    </h4>
                    <p
                      className="specialty"
                      style={{
                        marginBottom: '0.75rem',
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {doc.specialty || doc.department}
                    </p>
                    <div
                      className="doc-meta"
                      style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}
                    >
                      <span>
                        <i className="bx bx-graduation"></i>{' '}
                        {doc.qualifications || 'MBBS'}
                      </span>
                      {doc.experience_years != null && (
                        <span>
                          <i className="bx bx-medal"></i> {doc.experience_years} Years Exp.
                        </span>
                      )}
                      <span>
                        <i className="bx bx-time"></i> {doc.availability || 'Mon-Sat'}
                      </span>
                    </div>
                    <button
                      className="btn btn-outline w-100 mt-auto"
                      onClick={() => navigate('/appointment')}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
