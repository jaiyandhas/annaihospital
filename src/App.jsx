import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';

// Pages
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import PatientPortal from './pages/PatientPortal.jsx';
import AdminPortal from './pages/AdminPortal.jsx';
import Appointment from './pages/Appointment.jsx';

import Doctors from './pages/Doctors.jsx';
import Departments from './pages/Departments.jsx';
import HealthTools from './pages/HealthTools.jsx';
import SymptomChecker from './pages/SymptomChecker.jsx';
import MedicineChecker from './pages/MedicineChecker.jsx';
import { Telemedicine, LabReportsPage } from './pages/UtilityPages.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/patient-portal" element={<PatientPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/appointment" element={<Appointment />} />
            
            <Route path="/departments" element={<Departments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/lab-reports" element={<LabReportsPage />} />
            <Route path="/health-tools" element={<HealthTools />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/medicine-checker" element={<MedicineChecker />} />
            <Route path="/telemedicine" element={<Telemedicine />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
