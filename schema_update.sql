-- schema_update.sql
-- Run this in your Supabase SQL Editor to set up the new tables

-- 1. Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id), -- Link to Supabase Auth
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    date_of_birth DATE,
    age INTEGER,
    gender TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    qualifications TEXT,
    experience_years INTEGER,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    department TEXT,
    status TEXT DEFAULT 'Scheduled', -- Scheduled, Completed, Cancelled
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Lab Reports Table (Updated)
CREATE TABLE IF NOT EXISTS public.lab_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    report_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    ordered_by TEXT,
    date_uploaded TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    uploaded_by TEXT -- Could be 'Admin' or specific admin user ID
);

-- 5. Prescriptions Table
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    instructions TEXT,
    prescribed_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    status TEXT DEFAULT 'Active', -- Active, Completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Enable Row Level Security (RLS)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Allow public access for now to ensure smooth development
-- (In production, you'd restrict these based on authenticated user IDs)
CREATE POLICY "Public Read Access" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Access" ON public.patients FOR UPDATE USING (true);

CREATE POLICY "Public Read Access" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Access" ON public.appointments FOR UPDATE USING (true);

CREATE POLICY "Public Read Access" ON public.lab_reports FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON public.lab_reports FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access" ON public.prescriptions FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON public.prescriptions FOR INSERT WITH CHECK (true);

-- =============================================
-- ADMIN ROLE SETUP
-- =============================================
-- Step 1: Add role column to patients (safe to run even if it already exists)
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'patient';

-- Step 2: Grant admin to specific email addresses
-- Run this AFTER you have registered these accounts via the app's signup page
UPDATE public.patients SET role = 'admin' WHERE email = 'jaiyandhas@gmail.com';
UPDATE public.patients SET role = 'admin' WHERE email = 'admin@annaihospital.com';
