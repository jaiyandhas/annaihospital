import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <i className='bx bx-check-circle' style={{ fontSize: '4rem', color: '#10b981' }}></i>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Message Sent!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Thank you for reaching out to Annai Hospital. Our medical team will review your inquiry and get back to you within 24 hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '30px' }}>
            Back to Contact
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Premium Hero Section */}
      <div 
        className="page-header relative" 
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', 
          color: 'white', 
          padding: '5rem 0 7rem', 
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)' }}></div>
        <div className="container relative" style={{ zIndex: 2 }}>
          <h1 className="animate-slide-up" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-1px' }}>
            Get in Touch
          </h1>
          <p className="animate-slide-up" style={{ color: '#e2e8f0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', animationDelay: '0.1s' }}>
            Whether you have a medical inquiry, need to book an appointment, or are facing an emergency, our team is here to assist you immediately.
          </p>
        </div>
      </div>

      {/* Main Content Area overlapping the hero */}
      <div className="container" style={{ marginTop: '-4rem', zIndex: 10, flexGrow: 1, paddingBottom: '4rem' }}>
        <div className="grid-2" style={{ gap: '2rem', alignItems: 'stretch' }}>
          
          {/* Contact Information Cards */}
          <div className="contact-info-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Phone Card */}
            <div className="glass-card animate-slide-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem', animationDelay: '0.2s', borderLeft: '4px solid #10b981' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className='bx bxs-phone-call' style={{ fontSize: '2rem', color: '#10b981' }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Call Us</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Our hotlines are open 24/7 for appointments, general inquiries, and medical emergencies.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="tel:+919944057549" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        +91 99440 57549
                    </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-card animate-slide-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem', animationDelay: '0.3s', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className='bx bxs-envelope' style={{ fontSize: '2rem', color: '#3b82f6' }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Email Support</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Send us your reports or non-emergency medical questions, and our staff will reply within 24 hours.
                </p>
                <a href="mailto:annaihospitals.tg@gmail.com" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.05)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    annaihospitals.tg@gmail.com
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card animate-slide-up" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem', animationDelay: '0.4s', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className='bx bxs-map' style={{ fontSize: '2rem', color: '#8b5cf6' }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Visit Us</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.5, fontWeight: 500 }}>
                  Annai Hospital
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Near Valaraigate,<br/>
                  Tiruchengode, Tamil Nadu<br/>
                  India
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="glass-card animate-slide-up flex flex-col" style={{ padding: '2.5rem', animationDelay: '0.5s', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Send a Message</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Fill out the form below and we will get back to you immediately.</p>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flexGrow: 1 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" className="form-control" placeholder="John Doe" required style={{ padding: '0.8rem 1rem', background: 'var(--bg-color)' }} />
              </div>
              
              <div className="grid-2" style={{ gap: '1.2rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input type="email" className="form-control" placeholder="john@example.com" required style={{ padding: '0.8rem 1rem', background: 'var(--bg-color)' }} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                    <input type="text" className="form-control" placeholder="+91 12345 67890" required style={{ padding: '0.8rem 1rem', background: 'var(--bg-color)' }} />
                  </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subject</label>
                <select className="form-control" required style={{ padding: '0.8rem 1rem', background: 'var(--bg-color)' }}>
                    <option value="">-- Select Inquiry Type --</option>
                    <option value="appointment">Appointment Booking</option>
                    <option value="reports">Lab Reports Issue</option>
                    <option value="billing">Billing & Insurance</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ margin: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Message</label>
                <textarea className="form-control" placeholder="How can we help you?" required style={{ flexGrow: 1, padding: '1rem', background: 'var(--bg-color)', minHeight: '120px', resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ padding: '1rem', fontSize: '1.05rem', marginTop: '1rem', letterSpacing: '0.5px' }}>
                 Send Message <i className='bx bx-paper-plane' style={{ marginLeft: '0.5rem' }}></i>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
