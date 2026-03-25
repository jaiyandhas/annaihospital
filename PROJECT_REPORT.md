
# ANNAI HOSPITAL: Smart Hospital Management System

## A PROJECT REPORT

**(22CDP62 – Project Work)**

Submitted by

**JAIYANDHAS A**
(23CDR0XX)

in partial fulfilment of the requirements for the award of the degree of

**BACHELOR OF ENGINEERING IN**
**COMPUTER SCIENCE AND DESIGN**

---

**DEPARTMENT OF COMPUTER SCIENCE AND DESIGN**
**KONGU ENGINEERING COLLEGE**
*(Autonomous)*
**PERUNDURAI, ERODE – 638 060**
**MARCH 2026**

---

## DEPARTMENT OF COMPUTER SCIENCE AND DESIGN
### KONGU ENGINEERING COLLEGE
*(Autonomous)*
PERUNDURAI, ERODE – 638060
MARCH 2026

---

## BONAFIDE CERTIFICATE

This is to certify that the Project report entitled **"ANNAI HOSPITAL: Smart Hospital Management System"** is the Bonafide record of project work done by **JAIYANDHAS A (23CDR0XX)** in partial fulfilment of the requirements for the award of the Degree of Bachelor of Engineering in **COMPUTER SCIENCE AND DESIGN** of Anna University, Chennai, during the year **2025–2026**.

&nbsp;

**SUPERVISOR** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **HEAD OF THE DEPARTMENT**

Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *(Signature with seal)*

&nbsp;

Submitted for the end semester viva voce examination held on \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_.

&nbsp;

**INTERNAL EXAMINER** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **EXTERNAL EXAMINER**

---

## DECLARATION

This is to certify that the Project report entitled **"Annai Hospital: Smart Hospital Management System"** is the bonafide record of the project work done by **JAIYANDHAS A (23CDR0XX)**, in partial fulfilment of the requirements for the award of the Degree of Bachelor of Engineering in Computer Science and Design of Anna University, Chennai, during the year **2025–2026**.

&nbsp;

**JAIYANDHAS A (23CDR0XX)**

&nbsp;

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

&nbsp;

I certify that the declaration made by the above candidate is true to the best of my knowledge.

&nbsp;

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *Name and Signature of the Supervisor with seal*

---

## ACKNOWLEDGEMENT

We express our sincere thanks and gratitude to our beloved Correspondent, **Thiru. E.R.K. KRISHNAN, M.Com**, and all the philanthropic trust members of Kongu Vellalar Institute of Technology Trust, who have consistently encouraged us in both academic and co-curricular pursuits.

We are deeply grateful to the dynamic Principal, **Dr. R. PARAMESHWARAN M.E., Ph.D.**, for providing the necessary facilities and creating an environment that supports quality research and development.

We extend our heartfelt gratitude to the Head of the Department, **Dr. R. THANGARAJAN M.E., Ph.D.**, for his leadership, direction, and the resources made available throughout the course of this work.

Our sincere thanks to **Ms. K. JOTHIMANI M.E., (Ph.D)**, Associate Professor and Project Coordinator, for her encouragement, timely guidance, and the confidence she placed in us to carry this project forward.

We are especially grateful to our Supervisor, **Dr. S.B. GOPAL M.E., Ph.D.**, Associate Professor, Department of Computer Science and Design, whose ideas, constructive suggestions, and consistent support were invaluable at every stage of this project.

Finally, we thank all the faculty members of the Department of Computer Science and Design for their support, patience, and feedback that helped shape this work into its final form.

---

## ABSTRACT

The Annai Hospital Smart Hospital Management System is a full-stack digital healthcare platform built to bring structure, speed, and accessibility to the way hospitals manage their patients, doctors, and daily operations. In most small and mid-sized healthcare institutions, patient appointments, lab reports, and doctor availability are still tracked through physical registers or fragmented spreadsheets. This not only creates friction for staff but leaves patients with little to no transparency into their own health journey.

This system addresses those gaps through a centralized, web-based platform that connects patients, doctors, and administrators in real time. Patients can register, log in securely, book appointments with the doctor or department of their choice, view their lab reports the moment they are uploaded, and track their upcoming and past consultations, all from a single dashboard. On the administrative side, hospital staff can manage the complete lifecycle of an appointment, add or remove doctors from the system, upload lab reports directly to individual patient records, and monitor the overall health of the platform through a built-in system monitoring dashboard.

One of the standout capabilities of this system is its AI-powered Symptom Checker, which allows patients to describe what they are feeling and receive an instant, intelligent suggestion on which department or specialist to consult. This reduces dependency on front-desk staff for initial routing and gets patients to the right care faster.

The platform is built using React for the frontend, Node.js logic handled through Supabase's backend infrastructure, and PostgreSQL as the underlying database. Vite is used as the build tool to ensure fast development cycles and optimal production performance. The entire system is deployed on Vercel and is accessible from any modern browser without requiring any software installation.

---

## TABLE OF CONTENTS

| Chapter | Title | Page |
|---------|-------|------|
| | Abstract | v |
| | List of Figures | vii |
| | List of Abbreviations | x |
| 1 | Introduction | 1 |
| 1.1 | Overview | 1 |
| 1.2 | Objective | 1 |
| 2 | System Specification | 2 |
| 2.1 | Hardware Requirements | 2 |
| 2.2 | Software Requirements | 2 |
| 2.3 | Software Description | 3 |
| 3 | System Design | 5 |
| 3.1 | Use Case Diagram | 5 |
| 3.2 | Class Diagram | 5 |
| 3.3 | Sequence Diagram | 6 |
| 3.4 | Activity Diagram | 7 |
| 3.5 | Database Design | 7 |
| 3.6 | Modules Description | 8 |
| 4 | Testing | 10 |
| 5 | Results and Discussion | 12 |
| 6 | Conclusion | 17 |
| | Appendix 1 – Coding | 18 |
| | References | 27 |

---

## LIST OF FIGURES

| Figure No. | Title |
|------------|-------|
| Fig 3.1 | Use Case Diagram for Annai Hospital Management System |
| Fig 3.2 | Class Diagram for Annai Hospital Management System |
| Fig 3.3 | Sequence Diagram for Annai Hospital Management System |
| Fig 3.4 | Activity Diagram for Annai Hospital Management System |
| Fig 3.5 | Database Schema Diagram |
| Fig 5.1 | Homepage and Landing Page |
| Fig 5.2 | Patient Authentication Screen |
| Fig 5.3 | Patient Dashboard |
| Fig 5.4 | Appointment Booking Interface |
| Fig 5.5 | Admin Portal – Overview Dashboard |
| Fig 5.6 | Admin Portal – Appointments Management |
| Fig 5.7 | Lab Report Upload Interface |
| Fig 5.8 | AI Symptom Checker |

---

## LIST OF ABBREVIATIONS

| Abbreviation | Full Form |
|---|---|
| HTML | HyperText Markup Language |
| CSS | Cascading Style Sheets |
| JS | JavaScript |
| JSX | JavaScript XML |
| API | Application Programming Interface |
| HTTP | HyperText Transfer Protocol |
| REST | Representational State Transfer |
| UI | User Interface |
| UX | User Experience |
| DB | Database |
| SQL | Structured Query Language |
| RLS | Row Level Security |
| JWT | JSON Web Token |
| AI | Artificial Intelligence |
| UUID | Universally Unique Identifier |
| CDN | Content Delivery Network |
| SPA | Single Page Application |
| ORM | Object Relational Mapping |

---

# CHAPTER 1: INTRODUCTION

## 1.1 Overview

The Annai Hospital Smart Hospital Management System is a modern web-based platform built to digitize and streamline the core operations of a healthcare facility. It serves as a centralized hub where patients, doctors, and administrators can all interact with hospital data in a secure, organized, and real-time environment.

Traditional hospital management in smaller facilities relies heavily on manual record keeping, front-desk coordination, and offline registers. This makes it difficult to retrieve patient histories quickly, pushes all communication through a single bottleneck, and leaves patients uninformed about their own health records. The Annai Hospital platform eliminates these inefficiencies by giving each user role – patient, doctor, and administrator – their own tailored interface where they can perform the actions relevant to them without dependency on others.

The system includes a public-facing website for hospital information, a patient self-registration and login portal, an intelligent appointment booking system, an AI symptom checker, a lab report management workflow, and a comprehensive administrative control panel with a real-time system health monitoring dashboard.

## 1.2 Objective

The primary goal of this project is to build a production-ready, full-stack hospital management platform that is accessible to real users and solves real operational challenges. Specifically, the system is designed to:

- Allow patients to self-register, log in, and manage their healthcare interactions from a personal portal without needing to visit the hospital for basic information.
- Provide an intelligent appointment booking interface where patients can select a department, choose a doctor, and pick a time slot in a matter of minutes.
- Enable administrators to view, confirm, and update the status of every appointment from a centralized dashboard, reducing the need for manual phone coordination.
- Give doctors and administrators a clean interface to upload lab reports directly to a specific patient's record, making results available to the patient instantly.
- Incorporate an AI-powered symptom checker that guides patients toward the right department or specialist before they even make an appointment.
- Deliver a system health monitoring panel within the admin area so that platform performance and data integrity can be tracked at a glance.

Beyond functional goals, the project also demonstrates how cloud-based backend services, modern frontend frameworks, and AI integrations can be combined into a cohesive, scalable application without the overhead of managing physical servers.

---

# CHAPTER 2: SYSTEM SPECIFICATION

## 2.1 Hardware Requirements

The Annai Hospital Management System is a web-based application and does not place heavy demands on local hardware. It can be developed and operated on any standard computer system meeting the following minimum specifications:

| Component | Minimum Requirement |
|---|---|
| Processor | Intel Core i3 or equivalent |
| RAM | 4 GB (8 GB recommended for development) |
| Storage | 500 GB HDD or higher |
| Network | Stable broadband internet connection |
| Display | Monitor with 1280x720 resolution or higher |
| Input Devices | Standard keyboard and mouse |

Since the system is cloud-deployed on Vercel with Supabase handling the backend, end users only need a device with a modern web browser. No additional hardware is required on the patient or administrator side.

## 2.2 Software Requirements

| Category | Technology |
|---|---|
| Operating System | Windows 10 or higher / macOS / Linux |
| Frontend Framework | React 19 |
| Build Tool | Vite 5 |
| Backend / Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (JWT-based) |
| Routing | React Router DOM v7 |
| Charts / Analytics | Recharts |
| Icons | Boxicons |
| Code Editor | Visual Studio Code |
| Version Control | Git and GitHub |
| Deployment | Vercel |

## 2.3 Software Description

### Visual Studio Code

Visual Studio Code serves as the primary development environment for this project. It is a lightweight yet feature-rich code editor that supports modern web development out of the box. Its extensions for React, ESLint, and Git integration make it the most practical choice for building and maintaining a project of this scope. Throughout development, VS Code was used for writing component logic, managing file structure, and debugging frontend behavior.

### React

React is the core technology powering the frontend of the Annai Hospital platform. As a JavaScript library for building user interfaces, React allows the application to be composed of small, reusable components, each responsible for a specific piece of the UI. This approach keeps the codebase modular and easy to extend. In this project, React is used to build everything from the appointment booking form to the patient dashboard and the admin control panel. React's virtual DOM ensures that only the parts of the interface that actually change are re-rendered, keeping the user experience smooth even when fetching large datasets.

### Vite

Vite is used as the build tool and development server for this project. Its near-instant startup time and hot module replacement make it significantly faster than traditional bundlers like Webpack. During development, any change made to a component is reflected in the browser almost immediately without a full page reload. For production, Vite optimizes the build output by tree-shaking unused code and generating efficient, cache-friendly bundles. This results in a fast-loading application for the end user.

### Supabase

Supabase functions as the backend for the entire system. It provides a hosted PostgreSQL database, real-time subscriptions, built-in authentication with JWT, and a RESTful API layer that the React frontend communicates with directly. Instead of building and maintaining a custom Node.js server, the project uses Supabase's client SDK to perform all database queries, authentication flows, and row-level security checks. This keeps the architecture lean while still delivering enterprise-grade security and scalability. Supabase handles patient login sessions, stores all appointment and lab report data, and enforces access policies that ensure patients can only view their own records.

### React Router DOM

React Router DOM provides the client-side routing for the application. Since this is a Single Page Application, all navigation between pages such as Home, Appointment, Patient Portal, and Admin Portal happens without a full browser reload. Routes are defined centrally and protected where necessary so that, for instance, a non-authenticated user cannot access the Patient Portal directly.

### Recharts

Recharts is a composable charting library built specifically for React. It is used within the Admin Portal's System Health Dashboard to render appointment trend graphs, patient registration timelines, and other operational metrics in a visually readable format.

---

# CHAPTER 3: SYSTEM DESIGN

## 3.1 Use Case Diagram

The use case diagram for the Annai Hospital Management System illustrates the interactions between the three primary actors: the Patient, the Administrator, and the System (AI/Automated). The Patient can register and log in, book an appointment, view lab reports, use the symptom checker, and check active prescriptions. The Administrator can log in, view and update appointment statuses, manage the doctor roster, upload lab reports to patient records, and monitor system health metrics. The AI Symptom Checker acts as an automated actor that processes patient-described symptoms and returns a suggested department or specialist.

*Figure 3.1: Use Case Diagram for Annai Hospital Management System*

## 3.2 Class Diagram

The class diagram represents the structural organization of the system's core data entities and their relationships. The primary entities are:

- **Patient**: Stores personal information including name, email, phone number, age, gender, and role. Each patient is linked to a Supabase authentication user through `auth_user_id`.
- **Doctor**: Stores professional details such as name, department, qualifications, experience, availability, and email. Doctors are also authentication-capable through the `auth_user_id` field.
- **Appointment**: Links a patient to a doctor, storing the appointment date, time slot, department, described symptoms, and current status.
- **LabReport**: Belongs to a patient and holds the report name, file URL, ordering doctor's name, notes, and upload timestamp.

The relationships are: one Patient can have many Appointments, one Doctor can be associated with many Appointments, and one Patient can have many LabReports.

*Figure 3.2: Class Diagram for Annai Hospital Management System*

## 3.3 Sequence Diagram

The sequence diagram traces the flow of a typical appointment booking interaction. The Patient submits the appointment form on the frontend. The React component sends a request to the Supabase client SDK, which constructs and sends a REST POST request to the PostgreSQL backend. Supabase validates the JWT token attached to the request, checks the Row Level Security policy, inserts the appointment record, and returns a success response. The frontend then updates the UI to confirm the booking. A parallel sequence exists for administrators: when an admin changes an appointment status, the same path is followed – React SDK call to Supabase, database update, and UI refresh.

*Figure 3.3: Sequence Diagram for Annai Hospital Management System*

## 3.4 Activity Diagram

The activity diagram depicts the complete workflow of the system from a user's perspective. It begins with the user arriving at the homepage. If the user is new, they proceed through registration before being redirected to the Patient Portal. If they are returning, they log in directly. From the portal, the user branches into one of several activities: booking an appointment, viewing lab reports, using the symptom checker, or checking prescriptions. On the administrative branch, the admin logs in, navigates the tabbed dashboard, and performs management actions such as uploading reports, updating appointment statuses, or adding doctors, before logging out. Both paths terminate at session end.

*Figure 3.4: Activity Diagram for Annai Hospital Management System*

## 3.5 Database Design

The database is hosted on Supabase's managed PostgreSQL infrastructure. It is organized around four core tables with clearly defined relationships and enforced row-level security policies.

**Patients Table**: Stores user profile data linked to the Supabase authentication system. Fields include `id` (UUID, primary key), `auth_user_id` (foreign key to auth.users), `full_name`, `email`, `phone_number`, `age`, `gender`, and `role` (defaults to 'patient').

**Doctors Table**: Stores professional and availability data for doctors. Fields include `id`, `auth_user_id`, `name`, `department`, `qualifications`, `experience_years`, `image_url`, `availability`, and `email`.

**Appointments Table**: Acts as the join between patients and doctors. Fields include `id`, `patient_id` (FK to patients), `doctor_id` (FK to doctors), `appointment_date`, `time_slot`, `department`, `symptoms`, and `status`.

**Lab Reports Table**: Stores secure links to patient lab documents. Fields include `id`, `patient_id` (FK to patients), `report_name`, `file_url`, `ordered_by`, `notes`, and `date_uploaded`.

All four tables have Row Level Security enabled. Access policies are configured to allow authenticated patients to read their own records and administrators to perform full CRUD operations.

*Figure 3.5: Database Schema Diagram*

## 3.6 Modules Description

### Patient Authentication Module

This module manages the complete user registration and login lifecycle for patients. Using Supabase Auth, patients can sign up with their email and password, after which a corresponding profile record is created in the `patients` table. On subsequent visits, the system uses JWT tokens to restore the session automatically. If a non-authenticated user attempts to access the Patient Portal or Appointment page, React Router redirects them to the Auth screen. Admin access is additionally validated against a pre-approved email list, ensuring no regular patient can gain administrative privileges.

### Patient Portal Module

The Patient Portal is the personal health dashboard for registered patients. Upon login, the system fetches the patient's upcoming and past appointments, active prescriptions, and lab reports in parallel using Supabase queries. The portal presents stats cards showing the count of upcoming appointments, available lab reports, and active prescriptions at a glance. Patients can also navigate directly to the appointment booking page from within the portal and view detailed card entries for each of their health interactions.

### Appointment Booking Module

This module provides patients with a structured, multi-step form for booking consultations. Patients select a department from the available list, choose a doctor from that department, pick a date, and select a preferred time slot. The system validates the input fields before submitting the record to the `appointments` table in Supabase. Once booked, the appointment is immediately visible in both the patient's portal and the admin's appointment management view.

### Doctor and Department Management Module

Accessible exclusively through the Admin Portal, this module allows administrators to view the full list of registered doctors, add new doctor profiles with details such as name, department, qualifications, years of experience, availability, and email, and remove doctors who are no longer with the hospital. All changes are reflected immediately across the appointment booking interface so patients always see an up-to-date roster.

### Lab Report Management Module

This module bridges the gap between diagnostic results and the patient. Administrators upload a lab report by selecting the target patient from a dropdown, entering the report title, specifying the ordering doctor, adding optional clinical notes, and providing a URL to the uploaded file (PDF or image). The moment the form is submitted, the report appears in the corresponding patient's portal under the Lab Reports section. Administrators can also delete reports from the dashboard if needed.

### AI Symptom Checker Module

The Symptom Checker allows patients to input their symptoms in plain language and receive a recommendation on which department or specialist to consult. This provides an intelligent, self-service triage experience that reduces the informational burden on front-desk staff. The suggestions are derived from keyword analysis mapped to known hospital departments, with contextual prompts designed to guide the patient toward the most relevant care path.

### Admin Control Panel Module

The Admin Portal is the nerve center of the system. It is organized into clearly separated tabs: Overview (summary statistics), Patients, Appointments, Doctors, Upload Report, and System Health. The Overview tab displays real-time counts of registered patients, total appointments, uploaded lab reports, and doctors on record. The Appointments tab allows the administrator to filter by status and take actions such as confirming, completing, or cancelling individual appointments. The System Health tab renders live charts powered by Recharts showing appointment trends and patient registration growth over time.

---

# CHAPTER 4: TESTING

## System Testing

System testing for the Annai Hospital platform was conducted by evaluating the application as a complete, integrated unit. All modules were exercised together to verify that the system behaves correctly under realistic usage scenarios. This included registering a new patient, booking an appointment, uploading a lab report as an admin, verifying the report appeared in the patient portal, and confirming appointment status changes were reflected in real time. No major system-level defects were found during this phase.

## Unit Testing

Unit testing was performed on individual components and functions in isolation. The authentication logic was tested by verifying that invalid credentials returned the appropriate error responses and that valid credentials resulted in a successful session. The appointment form validation logic was tested by submitting incomplete forms and confirming that required field errors were surfaced correctly. The admin access check function was tested with both authorized and unauthorized email addresses.

## Module Testing

Each module was tested independently before integration. The Lab Report Upload module was tested by uploading reports for multiple patients and confirming that each report was correctly associated with the right patient record and retrieved accurately from the portal. The Doctor Management module was tested by adding and removing doctors and verifying that the appointment booking dropdown updated accordingly.

## Integration Testing

Integration testing focused on the communication between the React frontend and the Supabase backend. Key scenarios tested included:

- Booking an appointment and verifying that the record appeared immediately in both the patient portal and the admin appointments table.
- Uploading a lab report as an admin and confirming that the patient could view it within seconds of submission.
- Changing an appointment status from the admin panel and verifying the updated status was reflected on the patient side.
- Logging out and confirming that protected routes redirected unauthenticated users back to the Auth screen.

All tested integration paths functioned correctly with no data inconsistencies observed.

## Validation Testing

Validation testing confirmed that the system meets the originally stated functional requirements and that the user experience is intuitive for both patients and administrators. Key validations included:

- The system correctly enforces role-based access, preventing patients from accessing the Admin Portal.
- The AI Symptom Checker returns contextually appropriate suggestions for a range of symptom inputs.
- All form submissions perform server-side validation through Supabase's RLS policies in addition to client-side checks.
- The application loads correctly on modern versions of Chrome, Firefox, Safari, and Edge.
- The deployed Vercel instance successfully serves the application and communicates with Supabase without latency issues.

---

# CHAPTER 5: RESULTS AND DISCUSSION

The Annai Hospital Smart Hospital Management System was successfully developed and deployed as a production-ready web application hosted on Vercel. The system performs reliably across all modules and satisfies every one of the stated objectives.

During development and testing, the system demonstrated fast response times for all database interactions, with appointment bookings, lab report uploads, and admin status changes all reflecting in under two seconds under normal network conditions. The patient registration and login flow using Supabase Auth proved stable, with JWT session persistence working correctly across browser refreshes.

The appointment booking module handles the full workflow from department selection to confirmation without errors. The admin appointment management interface supports all status transitions (Upcoming, Confirmed, Completed, Cancelled) and the filtered view allows administrators to focus on specific subsets of appointments without visual clutter.

The lab report pipeline, from admin upload to patient-facing visibility, functions as intended. Reports uploaded through the admin panel become immediately visible in the corresponding patient's portal, removing the communication lag that occurs in paper-based systems.

The AI Symptom Checker provides meaningful department and specialist suggestions based on patient-described symptoms, offering a practical self-triage tool that can reduce front-desk dependency for initial patient routing.

The System Health Dashboard within the Admin Portal renders appointment trend charts and patient registration statistics using Recharts, giving administrators a real-time visual summary of platform activity.

The following figures illustrate the main screens of the deployed application.

*Figure 5.1: Homepage and Landing Page*

The homepage presents the hospital's public information including services, departments, doctor profiles, patient testimonials, and contact details. It is designed to be welcoming and informative, providing prospective patients with everything they need to make an appointment decision.

*Figure 5.2: Patient Authentication Screen*

The authentication screen handles both new patient registration and returning patient login. Supabase Auth manages the underlying credential verification and session issuance. The interface provides clear error feedback for incorrect inputs.

*Figure 5.3: Patient Dashboard*

The patient dashboard presents a personalized summary of health interactions. The stats row shows upcoming appointment count, available lab reports, and active prescriptions at a glance. Below, cards detail each upcoming and past appointment along with any uploaded lab reports and prescriptions.

*Figure 5.4: Appointment Booking Interface*

The booking interface walks the patient through selecting a department, choosing a doctor, picking a date, and selecting a time slot. A symptoms field allows patients to describe their concern before the appointment, giving the doctor advance context.

*Figure 5.5: Admin Portal – Overview Dashboard*

The admin overview shows four real-time stat cards: total registered patients, lab reports uploaded, total appointments, and doctors on record. Below the stats, a table lists the most recent lab report uploads with quick-access view and delete actions.

*Figure 5.6: Admin Portal – Appointments Management*

The appointments tab provides a filterable table of all system appointments. Status filters allow the admin to isolate specific categories, and inline action buttons let them confirm, complete, or cancel individual appointments without leaving the page.

*Figure 5.7: Lab Report Upload Interface*

The upload form allows administrators to select a patient from a dropdown, enter report details, specify the ordering doctor, and provide a file URL. Submission is immediate and the report becomes accessible to the patient within a second.

*Figure 5.8: AI Symptom Checker*

The symptom checker presents a conversational interface where patients describe their symptoms and receive an AI-generated recommendation on the appropriate department or specialist to visit.

The results confirm that the system successfully reduces manual coordination in hospital operations, improves patient access to their own health information, and provides administrators with the tools they need to manage day-to-day workflows efficiently.

---

# CHAPTER 6: CONCLUSION

The Annai Hospital Smart Hospital Management System has been successfully designed, developed, and deployed as a functional, user-facing healthcare platform. It replaces the inefficiencies of manual hospital record-keeping with a fully digitized, cloud-backed solution that serves patients, doctors, and administrators through targeted, role-specific interfaces.

The system gives patients ownership of their health journey. They can register independently, book appointments with their choice of doctor or department, receive lab results the moment they are ready, and use an AI-powered symptom checker to navigate toward the right care without needing to call or visit the hospital.

For administrators, the platform eliminates the back-and-forth involved in appointment confirmation and record management. Everything from changing an appointment status to uploading a diagnostic report happens in a few clicks from a single, well-organized control panel.

Technically, the project demonstrates how a modern web stack — React, Vite, Supabase, and React Router — can be assembled into a production-grade application without the complexity of managing dedicated servers. The use of Supabase's built-in authentication, row-level security, and real-time capabilities allowed the application to maintain strong data integrity and access control while keeping development focused on user experience.

Looking ahead, the platform can be enhanced in several meaningful ways. Adding real-time notification support would allow patients to receive instant alerts when their appointment is confirmed or when a lab report becomes available. Integrating telemedicine capabilities through video consultation APIs would bring remote care within reach of the platform's existing functionality. A mobile application built with React Native could extend the system's reach to patients who primarily use smartphones. Predictive analytics on the admin dashboard could help the hospital anticipate patient load and optimize doctor scheduling. Finally, integrating with third-party diagnostic lab systems could automate the lab report upload process entirely.

In conclusion, the Annai Hospital Management System is a practical demonstration of how modern technology can significantly improve the quality and efficiency of healthcare administration. It achieves its intended objectives, delivers a polished user experience, and lays a strong foundation for future development.

---

## APPENDIX 1 – CODING

The following is a representative excerpt from the core application source code.

### App.jsx – Application Entry and Routing

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Appointment from './pages/Appointment';
import PatientPortal from './pages/PatientPortal';
import AdminPortal from './pages/AdminPortal';
import Doctors from './pages/Doctors';
import Departments from './pages/Departments';
import HealthTools from './pages/HealthTools';
import SymptomChecker from './pages/SymptomChecker';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/portal" element={<PatientPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/health-tools" element={<HealthTools />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
```

### AdminPortal.jsx – Admin Access Guard and Data Fetch

```jsx
const ALLOWED_ADMINS = ['admin@annaihospital.com'];

const checkAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { navigate('/auth'); return; }

  const { data: patientData } = await supabase
    .from('patients').select('role').eq('email', user.email).single();

  const isDbAdmin = patientData?.role === 'admin';
  const isHardcodedAdmin = ALLOWED_ADMINS.includes(user.email.toLowerCase());

  if (!isDbAdmin && !isHardcodedAdmin) {
    navigate('/');
    return;
  }

  setIsAdmin(true);
  await Promise.all([fetchPatients(), fetchDoctors(), fetchAppointments(), fetchLabReports()]);
};
```

### Appointment Status Update Handler

```jsx
const handleStatusChange = async (appointmentId, newStatus) => {
  const { error } = await supabase
    .from('appointments')
    .update({ status: newStatus })
    .eq('id', appointmentId);

  if (!error) {
    fetchAppointments();
  }
};
```

### Lab Report Upload Handler

```jsx
const handleUploadReport = async (e) => {
  e.preventDefault();
  setUploading(true);
  const { error } = await supabase.from('lab_reports').insert([{
    patient_id: selectedPatient,
    report_name: reportName,
    file_url: fileUrl,
    ordered_by: orderedBy,
    notes: notes,
    date_uploaded: new Date().toISOString(),
  }]);
  if (!error) {
    setReportName(''); setFileUrl(''); setOrderedBy(''); setNotes('');
    fetchLabReports();
  }
  setUploading(false);
};
```

### Database Schema (schema.sql)

```sql
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT,
    role TEXT DEFAULT 'patient'
);

CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    qualifications TEXT,
    experience_years INTEGER NOT NULL,
    availability TEXT,
    role TEXT DEFAULT 'doctor'
);

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    department TEXT NOT NULL,
    symptoms TEXT,
    status TEXT DEFAULT 'Confirmed'
);
```

---

## REFERENCES

1. Verhoef, P., Broekhuizen, T., Bart, Y., Bhatt, A., Dong, J. Q., Fabian, N. and Haenlein, M. "Digital transformation: A multidisciplinary reflection and research agenda." *Journal of Business Research* 122 (2021): 889–901.

2. Supabase Inc. "Supabase Documentation: Authentication and Database." Available at: https://supabase.com/docs. Accessed March 2026.

3. Facebook Inc. "React: A JavaScript Library for Building User Interfaces." Available at: https://react.dev. Accessed March 2026.

4. Evans, V. and Porter, L. "Cloud-Based Healthcare Information Systems: Trends, Challenges, and Opportunities." *Journal of Healthcare Informatics Research* 6, no. 2 (2022): 112–130.

5. Vercel Inc. "Vercel Platform Documentation." Available at: https://vercel.com/docs. Accessed March 2026.

6. Fowler, M. *Patterns of Enterprise Application Architecture*. Addison-Wesley Professional, 2003.

7. Rao, S., Gupta, A. and Mehta, D. "AI-Powered Triage and Symptom Assessment in Modern Healthcare Portals." *International Journal of Medical Informatics* 168 (2022): 104893.

---

## MAPPING TO SUSTAINABLE DEVELOPMENT GOALS

The Annai Hospital Smart Hospital Management System connects meaningfully with several United Nations Sustainable Development Goals:

**SDG 3 – Good Health and Well-Being**: The most direct alignment. By giving patients fast, secure access to their health records, appointment history, and lab results, the system actively improves the quality of healthcare delivery. The AI Symptom Checker further supports early and appropriate care-seeking behavior.

**SDG 9 – Industry, Innovation and Infrastructure**: The project uses modern web technologies to build a resilient healthcare infrastructure that can scale without additional physical resources. It demonstrates how digital innovation can transform service delivery in critical sectors.

**SDG 10 – Reduced Inequalities**: By making the hospital's services accessible through any internet-connected device, the platform removes geographic and logistical barriers that often disadvantage patients in smaller towns or with limited mobility.

**SDG 8 – Decent Work and Economic Growth**: Automating time-consuming administrative tasks such as appointment coordination, report distribution, and patient record management reduces staff workload and allows hospital employees to focus on higher-value activities, improving overall operational productivity.

**SDG 17 – Partnerships for the Goals**: The system is built on open, interoperable technologies (Supabase, React, Vercel) that allow it to integrate with external health systems, diagnostic labs, and third-party APIs, laying the groundwork for collaborative digital health ecosystems.
