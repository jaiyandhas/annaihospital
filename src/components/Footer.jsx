import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid-4 footer-top">
          
          <div className="footer-widget brand-widget">
            <Link to="/" className="logo logo-light" style={{ gap: '0.5rem', textDecoration: 'none' }}>
              <img 
                src="/logo.png" 
                alt="Annai Hospital" 
                style={{ width: '45px', height: '45px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="logo-icon" style={{ display: 'none', background: 'var(--accent)' }}>
                <i className='bx bx-child'></i>
              </div>
              <div className="logo-text">
                <h2 style={{ color: 'white' }}>Annai</h2>
                <span style={{ color: 'var(--accent-light)' }}>Hospital</span>
              </div>
            </Link>
            <p className="brand-desc">Trusted Child Speciality and Maternity care since 2007. Experience the joy of painless labor and birth companionship.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className='bx bxl-facebook'></i></a>
              <a href="#" aria-label="Twitter"><i className='bx bxl-twitter'></i></a>
              <a href="#" aria-label="Instagram"><i className='bx bxl-instagram'></i></a>
              <a href="#" aria-label="LinkedIn"><i className='bx bxl-linkedin'></i></a>
            </div>
          </div>
          
          <div className="footer-widget links-widget">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/doctors">Find a Doctor</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/lab-reports">Download Reports</Link></li>
              <li><Link to="/telemedicine">Online Consultation</Link></li>
            </ul>
          </div>
          
          <div className="footer-widget links-widget">
            <h3>Services</h3>
            <ul>
              <li><Link to="/departments">Cardiology</Link></li>
              <li><Link to="/departments">Neurology</Link></li>
              <li><Link to="/departments">Orthopedics</Link></li>
              <li><Link to="/departments">24/7 Emergency</Link></li>
              <li><Link to="/health-tools">Health Calculators</Link></li>
            </ul>
          </div>
          
          <div className="footer-widget contact-widget">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <i className='bx bx-map'></i>
                <span>Near Valaraigate, Tiruchengode</span>
              </li>
              <li>
                <i className='bx bx-phone'></i>
                <span>+9199440 57549</span>
              </li>
              <li>
                <i className='bx bx-envelope'></i>
                <span>info@annaihospital.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }} title="Staff Portal">Annai Hospital</Link>. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
