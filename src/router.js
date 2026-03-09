// Router handles view switching
import { renderHome } from './views/home.js';
import { renderDoctors } from './views/doctors.js';
import { renderAppointment } from './views/appointment.js';
import { renderSymptomChecker } from './views/symptomChecker.js';
import { renderBedAvailability } from './views/bedAvailability.js';
import { renderLabReports } from './views/labReports.js';
import { renderPatientPortal } from './views/patientPortal.js';
import { renderMedicineChecker } from './views/medicineChecker.js';
import { renderHealthTools } from './views/healthTools.js';
import { renderTelemedicine } from './views/telemedicine.js';
import { renderDepartments } from './views/departments.js';
import { renderBlog } from './views/blog.js';
import { renderContact } from './views/contact.js';
import { renderAdminDash } from './views/admin.js';

const routes = {
    '/': renderHome,
    '/doctors': renderDoctors,
    '/appointment': renderAppointment,
    '/symptom-checker': renderSymptomChecker,
    '/beds': renderBedAvailability,
    '/lab-reports': renderLabReports,
    '/patient-portal': renderPatientPortal,
    '/medicine-checker': renderMedicineChecker,
    '/health-tools': renderHealthTools,
    '/telemedicine': renderTelemedicine,
    '/departments': renderDepartments,
    '/blog': renderBlog,
    '/admin': renderAdminDash,
    // Add other routes here...
};

export const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

export const router = async () => {
    const path = location.pathname;

    // Find the exact matching route or default to home if not found
    const viewFunction = routes[path] || routes['/'];

    const appContainer = document.getElementById('app');
    appContainer.innerHTML = ''; // Clear current view

    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Execute the view rendering function
    await viewFunction(appContainer);
};

export const initRouter = () => {
    window.addEventListener('popstate', router);
    router(); // Initial call

    // We also need to map window.navigateTo so child components can use it without importing
    window.navigateTo = navigateTo;
};
