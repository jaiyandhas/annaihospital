import React from 'react';
import { useNavigate } from 'react-router-dom';

const departmentsRecord = [
  {
    title: 'Neonatology & Paediatrics',
    bg: 'linear-gradient(135deg, rgba(15, 76, 129, 0.9), rgba(34, 197, 94, 0.9))',
    icon: 'bx-child',
    desc: 'Compassionate and specialized healthcare for infants, children, and adolescents. Our child-friendly environment ensures reduced anxiety during treatments and checkups.',
    tags: ['Vaccinations', 'Neonatal Care', 'General Checkups'],
    doc: 'Dr. P. Saravanaraja'
  },
  {
    title: 'Obstetrics & Gynaecology',
    bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(15, 76, 129, 0.9))',
    icon: 'bx-female',
    desc: 'Comprehensive women\'s health services from adolescence through menopause, including expert maternity care, reproductive health, and surgical interventions.',
    tags: ['Maternity Care', 'Women\'s Wellness', 'Surgical Obstetrics'],
    doc: 'Dr. Jamuna Saravanaraja'
  },
  {
    title: 'Pulmonology & Sleep Medicine',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(79, 70, 229, 0.9))',
    icon: 'bx-wind',
    desc: 'Expert diagnosis and management of respiratory disorders, allergies, and sleep-related breathing issues for improved pulmonary health.',
    tags: ['Asthma Care', 'Sleep Apnea', 'Lung Function Testing'],
    doc: 'Dr. M. Punitha'
  },
  {
    title: 'Cardiology',
    bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(185, 28, 28, 0.9))',
    icon: 'bx-heart',
    desc: 'Cutting-edge cardiovascular care, from preventive screenings and diagnostics to advanced interventions and cardiac rehabilitation.',
    tags: ['Echocardiogram', 'Interventional Cardiology', 'Heart Failure'],
    doc: 'Dr. Priya'
  },
  {
    title: 'General & Laparoscopic Surgery',
    bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.9), rgba(15, 76, 129, 0.9))',
    icon: 'bx-plus-medical',
    desc: 'Advanced minimally invasive surgical procedures ensuring quicker recovery, less pain, and minimal scarring alongside traditional general surgery excellence.',
    tags: ['Laparoscopy', 'Hernia', 'Appendicitis'],
    doc: 'Dr. Vimala'
  },
  {
    title: 'Orthopaedics',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(220, 38, 38, 0.9))',
    icon: 'bx-bone',
    desc: 'Comprehensive care for the musculoskeletal system. From joint replacements to sports injuries, we restore your mobility and quality of life.',
    tags: ['Joint Replacement', 'Trauma Care', 'Arthroscopy'],
    doc: 'Dr. M. Karthikeyen'
  },
  {
    title: 'Paediatric Surgery',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))',
    icon: 'bxs-baby-carriage',
    desc: 'Dedicated surgical care for neonates, infants, and children. Handling complex congenital and acquired conditions with utmost precision and care.',
    tags: ['Neonatal Surgery', 'Congenital Anomalies', 'Urology'],
    doc: 'Dr. P. Jayakumar'
  },
  {
    title: 'Anaesthesiology',
    bg: 'linear-gradient(135deg, rgba(107, 114, 128, 0.9), rgba(75, 85, 99, 0.9))',
    icon: 'bx-pulse',
    desc: 'Ensuring patient safety and comfort during surgical procedures with advanced pain management and critical care expertise.',
    tags: ['Pain Management', 'Perioperative Care', 'Critical Care'],
    doc: 'Dr. G. Arul & Dr. S.U. Chithrapavai'
  }
];

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
             
             {departmentsRecord.map((dept, index) => (
               <div key={index} className="glass-card dept-detail-card animate-slide-up" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)', animationDelay: (index * 0.1) + 's' }}>
                  <div style={{ height: '200px', background: dept.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <i className={"bx " + dept.icon} style={{ fontSize: '5rem', color: 'white' }}></i>
                  </div>
                  <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                     <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>{dept.title}</h2>
                     <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{dept.desc}</p>
                     <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {dept.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{tag}</span>
                        ))}
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                           <i className='bx bx-user-circle' style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i> {dept.doc}
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate('/appointment')}>Book Now</button>
                     </div>
                  </div>
               </div>
             ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
