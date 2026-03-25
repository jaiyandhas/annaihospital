import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate Counters functionality
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / 200;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
          }
        });
        observer.observe(counter);
      });
    };
    setTimeout(animateCounters, 100);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-text animate-fade-in" style={{ marginTop: '-2rem' }}>
            <span className="badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-dark)', borderColor: 'rgba(249, 115, 22, 0.2)', borderRadius: '20px', padding: '0.4rem 1.2rem', marginBottom: '2rem' }}>Est. 2007</span>
            <h1 style={{ color: 'var(--primary-dark)', fontSize: '4.5rem', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1.5rem' }}>Annai Hospital<br/><span style={{ color: 'var(--accent-light)' }}>Child & Maternity<br/>Care</span></h1>
            <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--primary)', maxWidth: '90%', lineHeight: 1.6 }}>Providing compassionate maternity care and child speciality services for families in Tiruchengode. Your trusted partner for painless labor and comprehensive medical support.</p>
            <div className="hero-actions" style={{ marginTop: '2rem', maxWidth: '600px', display: 'flex', gap: '1rem' }}>
              <Link to="/appointment" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '30px', boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Appointment <i className='bx bx-calendar-event'></i>
              </Link>
              <Link to="/departments" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)', color: 'var(--primary-dark)', borderColor: 'var(--primary-dark)' }}>
                Our Services <i className='bx bx-right-arrow-alt'></i>
              </Link>
            </div>
          </div>
          <div className="hero-image animate-fade-in" style={{ animationDelay: '0.3s', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
             <div style={{ position: 'relative', width: '100%', maxWidth: '550px' }}>
                <img src="/hero-image.jpg" alt="Annai Hospital Facilities" style={{ width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }} />
                
                {/* Floating Trust Badge */}
                <div style={{ position: 'absolute', bottom: '-20px', left: '-30px', background: 'white', padding: '1.2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 4, display: 'flex', alignItems: 'center', gap: '1rem', animation: 'float 3s ease-in-out infinite' }}>
                   <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                      <i className='bx bx-check-shield'></i>
                   </div>
                   <div>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.1rem' }}>Expert Care</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Trusted since 2007</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section" id="about">
        <div className="container grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div className="about-content animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="badge" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.5rem', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Legacy</span>
            <h2 className="section-title text-left" style={{ marginBottom: '1.5rem', fontSize: '2.8rem', lineHeight: 1.2, color: 'var(--primary-dark)' }}>Annai Hospital <br/><span style={{ color: 'var(--accent)', fontSize: '2rem', fontWeight: 600 }}>Uncompromising Care</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              In 2007, we started as <strong>Annai Clinic</strong>—a small, dedicated outpatient facility in Tiruchengode. Over the years, thanks to the trust of our local community, we outgrew that smaller space and evolved into <strong>Annai Hospital</strong>, a fully-equipped medical center located near Valaraigate.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Today, we provide 24x7 emergency services, round-the-clock labor and delivery assistance, and advanced NICU care. You will always be under the personal care of our founders, <strong>Dr. P. Saravanaraja</strong> and <strong>Dr. G. Jamuna</strong>, who have been proudly serving families in this region for over 15 years.
            </p>
            <blockquote style={{ borderLeft: '4px solid var(--accent)', background: 'var(--bg-color-alt)', padding: '1.5rem', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--primary-dark)', margin: '2rem 0', borderRadius: '0 12px 12px 0' }}>
              "Experience the joy of painless labor and a dedicated birth companion at Annai Hospital."
            </blockquote>
          </div>
          
          <div className="about-image glass-card animate-fade-in" style={{ animationDelay: '0.4s', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(219, 234, 254, 0.5))', border: '1px solid rgba(255, 255, 255, 0.8)' }}>
            <i className='bx bx-building-house' style={{ fontSize: '7rem', color: 'var(--primary)', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(14, 165, 233, 0.2))' }}></i>
            <h3 style={{ color: 'var(--primary-dark)', textAlign: 'center', fontSize: '1.5rem' }}>Serving Since 2007</h3>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem' }}>Trusted by families in Tiruchengode</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
               <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  <i className='bx bx-plus-medical' style={{ fontSize: '2rem', color: 'var(--danger-color)' }}></i>
                  <p style={{ fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>24x7 Care</p>
               </div>
               <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  <i className='bx bx-child' style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                  <p style={{ fontWeight: 600, marginTop: '0.5rem', fontSize: '0.9rem' }}>Maternity</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container grid-4">
          <div className="stat-card glass-card">
            <div className="stat-icon"><i className='bx bx-group'></i></div>
            <div className="stat-info">
              <h3 className="counter" data-target="500000">0</h3>
              <span>+ Patients Treated</span>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon"><i className='bx bx-user-plus'></i></div>
            <div className="stat-info">
              <h3 className="counter" data-target="8">0</h3>
              <span>Dedicated Specialists</span>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon"><i className='bx bx-award'></i></div>
            <div className="stat-info">
              <h3 className="counter" data-target="20">0</h3>
              <span>+ Years Experience</span>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--danger-color), #b91c1c)' }}><i className='bx bx-plus-medical'></i></div>
            <div className="stat-info">
              <h3>24/7</h3>
              <span>Emergency Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="section bg-light" id="services">
        <div className="container">
          <h2 className="section-title">Quick Services</h2>
          <p className="section-subtitle">Access our digital healthcare services with just a click. Easy, fast, and secure.</p>
          
          <div className="grid-3">
            <Link to="/appointment" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-calendar'></i></div>
              <h3>Book Appointment</h3>
              <p>Schedule your visit with our expert doctors online instantly.</p>
              <span className="service-link">Book Now <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
            
            <Link to="/doctors" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-user-pin'></i></div>
              <h3>Find Doctor</h3>
              <p>Search and filter through our roster of experienced specialists.</p>
              <span className="service-link">Find Doctors <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
            
            <Link to="/departments" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-building-house'></i></div>
              <h3>Departments</h3>
              <p>Explore our wide range of specialized medical departments.</p>
              <span className="service-link">View Departments <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
            
            <Link to="/patient-portal" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-file-blank'></i></div>
              <h3>Patient Portal & Reports</h3>
              <p>Securely access your dashboard to view lab reports uploaded by our doctors.</p>
              <span className="service-link">Access Portal <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
            
            <Link to="/telemedicine" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-video'></i></div>
              <h3>Online Consultation</h3>
              <p>Consult with doctors from the comfort of your home via video call.</p>
              <span className="service-link">Start Call <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
            
            <Link to="/health-tools" className="service-card glass-card">
              <div className="service-icon"><i className='bx bx-heart-circle'></i></div>
              <h3>Health Tools</h3>
              <p>Use our calculators to check BMI, diabetes risk, and symptoms.</p>
              <span className="service-link">Use Tools <i className='bx bx-right-arrow-alt'></i></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctor Highlights */}
      <section className="section">
        <div className="container">
          <div className="flex-header">
            <div>
              <h2 className="section-title text-left">Featured Specialists</h2>
              <p className="section-subtitle text-left">Highly qualified and experienced medical professionals dedicated to providing the best care.</p>
            </div>
            <Link to="/doctors" className="btn btn-outline">View All Doctors</Link>
          </div>
          
          <div className="grid-2 mt-2">
            <div className="doctor-profile-card glass-card p-0" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-color-alt)', position: 'relative' }}>
                 <img src="/doctors/Saravanaraja.jpeg" alt="Dr. P. Saravanaraja" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
              <div className="doctor-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.25rem', fontSize: '1.25rem' }}>Dr. P. Saravanaraja</h4>
                <p className="specialty" style={{ marginBottom: '1rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Consultant Neonatologist, Paediatrician & Allergy Specialist</p>
                <div className="doc-meta" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1.4 }}>
                    <i className="bx bx-graduation" style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i> MBBS, DCH, MRCPCH (UK), MRCP (Edin), DPAA
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                     <i className="bx bx-medal" style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i> 20+ Years Exp.
                  </span>
                </div>
                <button className="btn btn-outline w-100 mt-auto" onClick={() => navigate('/appointment')}>Book Appointment</button>
              </div>
            </div>
            
            <div className="doctor-profile-card glass-card p-0" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-color-alt)', position: 'relative' }}>
                 <img src="/doctors/Jamuna.jpeg" alt="Dr. G. Jamuna" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
              <div className="doctor-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.25rem', fontSize: '1.25rem' }}>Dr. G. Jamuna</h4>
                <p className="specialty" style={{ marginBottom: '1rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Obstetrician & Gynaecologist</p>
                <div className="doc-meta" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1.4 }}>
                    <i className="bx bx-graduation" style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i> MBBS, D.G.O
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                     <i className="bx bx-medal" style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i> 20+ Years Exp.
                  </span>
                </div>
                <button className="btn btn-outline w-100 mt-auto" onClick={() => navigate('/appointment')}>Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Departments Preview */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Departments</h2>
          <p className="section-subtitle">Excellence in various medical specialties. State-of-the-art facilities and dedicated care.</p>
          
          <div className="grid-3 mt-2">
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-child'></i></div>
              <h3>Pediatrics & Neonatology</h3>
              <p>Specialized healthcare and medical treatments for infants, children, and adolescents.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-female'></i></div>
              <h3>Obstetrics & Gynecology</h3>
              <p>Comprehensive maternal care, painless labor, and women's health services.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-heart'></i></div>
              <h3>Cardiology</h3>
              <p>Advanced heart care, surgeries, and diagnostics provided by leading cardiologists.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-bone'></i></div>
              <h3>Orthopedics</h3>
              <p>Expert care for bones, joints, ligaments, tendons, and muscles.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-plus-medical'></i></div>
              <h3>General Surgery</h3>
              <p>Advanced laparoscopic procedures and safe, effective surgical interventions.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-wind'></i></div>
              <h3>Pulmonology</h3>
              <p>Expert diagnosis and treatment for respiratory and sleep disorders.</p>
            </Link>
          </div>
          <div className="text-center mt-3" style={{ textAlign: 'center' }}>
             <Link to="/departments" className="btn btn-primary btn-lg">View All Departments</Link>
          </div>
        </div>
      </section>

      {/* Infrastructure Gallery */}
      <section className="section" id="infrastructure">
        <div className="container">
          <h2 className="section-title">Our World-Class Infrastructure</h2>
          <p className="section-subtitle">Experience our state-of-the-art facilities designed for comfort, precision, and the highest standards of medical care.</p>
          
          <div className="infrastructure-gallery mt-2">
             <img src="/infrastructure/unnamed-2.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-3.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-4.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-5.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-6.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-7.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-8.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-9.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-10.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
             <img src="/infrastructure/unnamed-11.jpg" alt="Hospital Facility" className="gallery-img" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">Read stories from patients who have experienced our world-class care.</p>
          
          <div className="grid-3 mt-2">
            <div className="testimonial-card glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="stars">
                <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
              </div>
              <p className="comment" style={{ flexGrow: 1 }}>"I chose Annai Hospital for my second baby’s delivery, and I am truly grateful. My heartfelt thanks to Dr. Jamuna Ma’am, who took care of me right from cervical cerclage to my delivery. A big shoutout to Pediatrician Dr. Saravana Raja Sir, who took exceptional care of our baby in the NICU."</p>
              <div className="patient-info mt-2">
                <h4>Karthiga Mani</h4>
                <span>Maternity & Pediatrics Patient</span>
              </div>
            </div>
            <div className="testimonial-card glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="stars">
                <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
              </div>
              <p className="comment" style={{ flexGrow: 1 }}>"Thank you so much Dr. Jamuna Mam for the seamless delivery of my second baby girl. It's a blessing to have a healthy delivery at your hospital. Each and every nurse in the labour ward is very positive, motivating, and very kind. Ambience is too good."</p>
              <div className="patient-info mt-2">
                <h4>Saranya Murugesan</h4>
                <span>Maternity Patient</span>
              </div>
            </div>
            <div className="testimonial-card glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="stars">
                <i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i><i className='bx bxs-star'></i>
              </div>
              <p className="comment" style={{ flexGrow: 1 }}>"I’m very happy with my experience. Dr. Jamuna was a constant source of confidence and comfort. Soon after birth, Dr. Saravanaraja, the paediatrician, took over my baby’s care with great understanding. Satisfied and grateful for such a positive journey."</p>
              <div className="patient-info mt-2">
                <h4>Nathiya</h4>
                <span>Maternity & Pediatrics Patient</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tips/Blog */}
      <section className="section bg-light">
        <div className="container">
          <div className="flex-header">
            <div>
              <h2 className="section-title text-left">Health Tips & Articles</h2>
              <p className="section-subtitle text-left">Stay informed with the latest health advice from our doctors.</p>
            </div>
            <Link to="/blog" className="btn btn-outline">View All Articles</Link>
          </div>
          
          <div className="grid-3 mt-2">
            <div className="blog-preview-card glass-card p-0" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1505506874110-6a7a4f9aa118?auto=format&fit=crop&q=80&w=800" alt="Heart Health" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
               <div className="blog-content p-2" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                 <span className="blog-category" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'inline-block' }}>Heart Health</span>
                 <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>5 Daily Habits for a Stronger Heart</h4>
                 <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>Learn how simple lifestyle changes can significantly improve your cardiovascular health.</p>
                 <Link to="/blog" className="read-more" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--primary)' }}>Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
            <div className="blog-preview-card glass-card p-0" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=800" alt="Diabetes Prevention" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
               <div className="blog-content p-2" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                 <span className="blog-category" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'inline-block' }}>Prevention</span>
                 <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>Preventing Type 2 Diabetes</h4>
                 <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>Early detection and manageable diet changes are key to stopping diabetes before it starts.</p>
                 <Link to="/blog" className="read-more" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--primary)' }}>Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
            <div className="blog-preview-card glass-card p-0" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&q=80&w=800" alt="Healthy Lifestyle" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
               <div className="blog-content p-2" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                 <span className="blog-category" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'inline-block' }}>Lifestyle</span>
                 <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>Maintaining a Healthy Lifestyle</h4>
                 <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>Balancing work, diet, and exercise is essential for long-term health and wellness.</p>
                 <Link to="/blog" className="read-more" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--primary)' }}>Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
