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
        <div className="container grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div className="about-content animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="badge" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '5px 15px', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>About Us</span>
            <h2 className="section-title text-left" style={{ marginBottom: '1.5rem', fontSize: '2.5rem', lineHeight: 1.2 }}>Annai Hospital <br/><span style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 500 }}>Child Speciality & Maternity Care</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              <strong>ANNAI CLINIC</strong> which was an outpatient facility is now being moved to a larger space with facilities like 24x7 emergency services, 24×7 labour and delivery assistance, Modular Operation Theatre facility, Neonatal Intensive Care Unit, Infertility Center and other Gynecological services at a new location near Valaraigate as <strong>ANNAI HOSPITAL</strong>. 
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              You will be under the care of <strong>Dr. P. Saravana Raja, MBBS., DCH.</strong>, and <strong>Dr. G. Jamuna Saravana Raja, MBBS., DGO.</strong>, leading practitioners in Tiruchengode. They have been serving people in and around Tiruchengode since 2007.
            </p>
            <blockquote style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1rem', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--primary-dark)', margin: '2rem 0' }}>
              "Experience the Joy of Painless Labor and birth companion at Annai Hospital."
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
              <h3 className="counter" data-target="15000">0</h3>
              <span>+ Patients Treated</span>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon"><i className='bx bx-user-plus'></i></div>
            <div className="stat-info">
              <h3 className="counter" data-target="2">0</h3>
              <span>Dedicated Specialists</span>
            </div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon"><i className='bx bx-award'></i></div>
            <div className="stat-info">
              <h3 className="counter" data-target="15">0</h3>
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
            <div className="doctor-profile-card glass-card p-0">
              <div className="doctor-img-placeholder" style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--primary))' }}>
                 <i className='bx bx-user' style={{ color: 'white', fontSize: '5rem' }}></i>
              </div>
              <div className="doctor-info p-2">
                <h4>Dr. P. Saravana Raja</h4>
                <p className="specialty">MBBS., DCH.</p>
                <div className="doc-meta">
                  <span><i className='bx bx-medal'></i> 15+ Years Exp.</span>
                </div>
                <button className="btn btn-primary w-100 mt-1" onClick={() => navigate('/appointment')}>Book Appointment</button>
              </div>
            </div>
            <div className="doctor-profile-card glass-card p-0">
              <div className="doctor-img-placeholder" style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent))' }}>
                 <i className='bx bx-user' style={{ color: 'white', fontSize: '5rem' }}></i>
              </div>
              <div className="doctor-info p-2">
                <h4>Dr. G. Jamuna Saravana Raja</h4>
                <p className="specialty">MBBS., DGO.</p>
                <div className="doc-meta">
                  <span><i className='bx bx-medal'></i> 15+ Years Exp.</span>
                </div>
                <button className="btn btn-primary w-100 mt-1" onClick={() => navigate('/appointment')}>Book Appointment</button>
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
              <div className="dept-icon"><i className='bx bx-heart'></i></div>
              <h3>Cardiology</h3>
              <p>Advanced heart care, surgeries, and diagnostics provided by leading cardiologists.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-brain'></i></div>
              <h3>Neurology</h3>
              <p>Comprehensive treatment for brain, spinal cord, and nervous system disorders.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-bone'></i></div>
              <h3>Orthopedics</h3>
              <p>Expert care for bones, joints, ligaments, tendons, and muscles.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-child'></i></div>
              <h3>Pediatrics</h3>
              <p>Specialized healthcare and medical treatments for infants, children, and adolescents.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-scan'></i></div>
              <h3>Radiology</h3>
              <p>Advanced imaging technologies including MRI, CT scans, X-Rays, and Ultrasound.</p>
            </Link>
            <Link to="/departments" className="dept-card glass-card">
              <div className="dept-icon"><i className='bx bx-first-aid'></i></div>
              <h3>General Medicine</h3>
              <p>Primary healthcare, prevention, diagnosis, and treatment of adult diseases.</p>
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
            <div className="blog-preview-card glass-card p-0">
               <div className="blog-img-placeholder" style={{ background: 'linear-gradient(135deg, #fca5a5, #f87171)' }}>
                 <i className='bx bx-heart'></i>
               </div>
               <div className="blog-content p-2">
                 <span className="blog-category">Heart Health</span>
                 <h4>5 Daily Habits for a Stronger Heart</h4>
                 <p>Learn how simple lifestyle changes can significantly improve your cardiovascular health.</p>
                 <Link to="/blog" className="read-more">Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
            <div className="blog-preview-card glass-card p-0">
               <div className="blog-img-placeholder" style={{ background: 'linear-gradient(135deg, #93c5fd, #60a5fa)' }}>
                 <i className='bx bx-test-tube'></i>
               </div>
               <div className="blog-content p-2">
                 <span className="blog-category">Prevention</span>
                 <h4 style={{ marginTop: '5px', marginBottom: '10px' }}>Preventing Type 2 Diabetes</h4>
                 <p style={{ marginBottom: '15px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Early detection and manageable diet changes are key to stopping diabetes before it starts.</p>
                 <Link to="/blog" className="read-more" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
            <div className="blog-preview-card glass-card p-0">
               <div className="blog-img-placeholder" style={{ background: 'linear-gradient(135deg, #86efac, #4ade80)' }}>
                 <i className='bx bx-run'></i>
               </div>
               <div className="blog-content p-2">
                 <span className="blog-category">Lifestyle</span>
                 <h4 style={{ marginTop: '5px', marginBottom: '10px' }}>Maintaining a Healthy Lifestyle</h4>
                 <p style={{ marginBottom: '15px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Balancing work, diet, and exercise is essential for long-term health and wellness.</p>
                 <Link to="/blog" className="read-more" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Read More <i className='bx bx-right-arrow-alt'></i></Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
