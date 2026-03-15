import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar-container ${isHome && !isScrolled ? 'is-home' : 'scrolled'}`}>
      <nav className="container navbar">
        {/* Left: Logo */}
        <Link to="/" className="logo">
          <img 
            src="/logo.png" 
            alt="Annai Hospital" 
            style={{ width: '45px', height: '45px', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="logo-icon" style={{ display: 'none', background: 'var(--accent)' }}>
            <i className='bx bx-child'></i>
          </div>
          <div className="logo-text" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ lineHeight: 1 }} className="dynamic-text">Annai</h2>
            <span style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: 700 }} className="dynamic-sub">HOSPITAL</span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <ul className="nav-links desktop-links">
          <li><Link to="/" className="nav-item">DISCOVER ANNAI</Link></li>
          <li><Link to="/departments" className="nav-item">SPECIALTIES</Link></li>
          <li className="nav-dropdown">
            <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>FOR PATIENTS <i className='bx bx-chevron-down'></i></a>
            <ul className="dropdown-menu shadow-md">
              <li><Link to="/patient-portal"><i className='bx bx-laptop'></i> Patient Dashboard</Link></li>
              <li><Link to="/appointment"><i className='bx bx-calendar-check'></i> Book Appointment</Link></li>
              <li><Link to="/doctors"><i className='bx bx-user-pin'></i> Our Doctors</Link></li>
              <li><Link to="/telemedicine"><i className='bx bx-video'></i> Telemedicine</Link></li>
              <li><Link to="/health-tools"><i className='bx bx-heart'></i> Health Calculators</Link></li>
              <li><Link to="/symptom-checker"><i className='bx bx-analyse'></i> Symptom Checker</Link></li>
              <li><Link to="/medicine-checker"><i className='bx bx-capsule'></i> Pharmacy Search</Link></li>
            </ul>
          </li>
        </ul>

        {/* Right: Actions */}
        <div className="nav-actions" style={{ gap: '1rem' }}>
          <Link to="/contact" className="premium-icon-btn phone-btn" aria-label="Call Us" title="Contact Us">
            <i className='bx bxs-phone'></i>
          </Link>
          <button className="premium-icon-btn search-btn" aria-label="Search" title="Search">
            <i className='bx bx-search'></i>
          </button>
          <div className="divider" style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }}></div>
          <button className="action-btn lang-btn premium-lang-btn">EN <i className='bx bx-chevron-down'></i></button>

          <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className='bx bx-menu'></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <ul className={`mobile-menu nav-links ${isMobileMenuOpen ? 'active' : ''}`} style={{ margin: 0 }}>
          <li><Link to="/" className="nav-item">DISCOVER ANNAI</Link></li>
          <li><Link to="/departments" className="nav-item">SPECIALTIES</Link></li>
          <li className={`mobile-dropdown-parent ${isMobileDropdownOpen ? 'active' : ''}`}>
            <div 
              className="nav-item" 
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              FOR PATIENTS <i className='bx bx-chevron-down dropdown-arrow'></i>
            </div>
            <ul className="mobile-dropdown-menu" style={{ display: isMobileDropdownOpen ? 'flex' : 'none' }}>
              <li><Link to="/patient-portal"><i className='bx bx-laptop'></i> Patient Dashboard</Link></li>
              <li><Link to="/appointment"><i className='bx bx-calendar-check'></i> Book Appointment</Link></li>
              <li><Link to="/doctors"><i className='bx bx-user-pin'></i> Our Doctors</Link></li>
              <li><Link to="/telemedicine"><i className='bx bx-video'></i> Telemedicine</Link></li>
              <li><Link to="/health-tools"><i className='bx bx-heart'></i> Health Calculators</Link></li>
              <li><Link to="/symptom-checker"><i className='bx bx-analyse'></i> Symptom Checker</Link></li>
              <li><Link to="/medicine-checker"><i className='bx bx-capsule'></i> Pharmacy Search</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
