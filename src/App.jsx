import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Pages
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import PatientPortal from './pages/PatientPortal.jsx';
import AdminPortal from './pages/AdminPortal.jsx';
import Appointment from './pages/Appointment.jsx';
import Contact from './pages/Contact.jsx';
import Articles from './pages/Articles.jsx';

import Doctors from './pages/Doctors.jsx';
import Departments from './pages/Departments.jsx';
import HealthTools from './pages/HealthTools.jsx';
import SymptomChecker from './pages/SymptomChecker.jsx';
import NotFound from './pages/NotFound.jsx';

import { LabReportsPage } from './pages/UtilityPages.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/patient-portal" element={<PatientPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />
            
            <Route path="/departments" element={<Departments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/lab-reports" element={<LabReportsPage />} />
            <Route path="/health-tools" element={<HealthTools />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
