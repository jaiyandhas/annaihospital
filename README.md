# Annai Hospital

Annai Hospital is a modern, full-stack healthcare platform built to streamline interactions between patients, doctors, and the hospital administration.

![Annai Hospital](/public/logo.png)

## Overview

This project provides a comprehensive solution for managing a hospital's digital presence. It includes functionalities for:

*   **Patiant Portal:** Secure login for patients to access their health records, view lab reports, and manage appointments.
*   **Appointment Booking:** Easy-to-use interface to schedule appointments with specific doctors or departments.
*   **Telemedicine:** Integrated telemedicine capabilities for remote consultations.
*   **Advanced AI Symptom Checker:** An AI-powered tool to help analyze symptoms and suggest potential departments or specialists.
*   **Medicine Checker:** Tools for checking and managing prescribed medications.
*   **Admin Dashboard:** Secure interface for authorized staff to view all appointments and manage patient records, including uploading lab reports.
*   **Hospital Information:** Detailed pages for departments, doctors, services, a blog, and contact details.

## Tech Stack

*   **Frontend:** HTML, CSS (Vanilla), JavaScript (ES6+ Modules)
*   **Build Tool:** Vite
*   **Backend/Database:** Supabase (PostgreSQL)
*   **Routing:** Custom vanilla JS router
*   **Icons:** Boxicons

## Getting Started

To run this project locally, you will need Node.js and npm installed. You will also need access to the Supabase instance used for the backend (or configure your own).

### Prerequisites

*   Node.js (v18+)
*   npm (v9+)
*   A Supabase account and project.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jaiyandhas/annaihospital.git
    cd annaihospital
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    The project relies on a `.env` file to store Supabase credentials. Create a file named `.env` in the root directory and add your Supabase URL and Anon Key.
    ```env
    VITE_SUPABASE_URL="your_supabase_url_here"
    VITE_SUPABASE_ANON_KEY="your_supabase_anon_key_here"
    ```

4.  **Database Setup:**
    The project requires a specific database schema in Supabase. You can use the provided SQL files (`schema.sql` and `lab_reports_schema.sql`) to set up your tables using the Supabase SQL Editor.
    *   `schema.sql`: Sets up tables for patients, doctors, appointments, etc.
    *   `lab_reports_schema.sql`: Sets up tables specifically for securely storing patient lab reports.

### Running the Project

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `dist/` directory, ready to be deployed to a hosting service like Vercel, Netlify, or GitHub Pages.

## Deployment

This application is ready to be deployed to modern hosting platforms.

**Deploying to Vercel (Recommended):**
1.  Connect your GitHub repository to your Vercel account.
2.  Vercel will automatically detect the Vite preset.
3.  Ensure your environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are added to the Vercel project settings.
4.  Deploy!

## License

This project is open-source and available under the MIT License.
