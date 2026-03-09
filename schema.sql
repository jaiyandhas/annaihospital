-- Run this schema in your Supabase SQL Editor

-- 1. Create Patients Table
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

-- 2. Create Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    image_url TEXT,
    qualifications TEXT,
    experience_years INTEGER NOT NULL,
    availability TEXT,
    role TEXT DEFAULT 'doctor'
);

-- 3. Create Appointments Table
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

-- Set up Row Level Security (RLS) policies
-- Enable RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public access for now (for development/demo purposes)
-- NOTE: In production, configure stricter RLS policies!
CREATE POLICY "Allow public read access to doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Allow public insert to doctors" ON public.doctors FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow public insert to patients" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to patients" ON public.patients FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow public insert to appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to appointments" ON public.appointments FOR UPDATE USING (true);

-- Insert Initial Founder Doctors
INSERT INTO public.doctors (name, email, department, qualifications, experience_years, availability)
VALUES 
    ('Dr. P. Saravana Raja', 'saravanaraja@annaihospital.com', 'Pediatrics', 'MBBS., DCH.', 17, 'Mon-Sat: 09:00 AM - 05:00 PM'),
    ('Dr. G. Jamuna Saravana Raja', 'jamuna@annaihospital.com', 'Obstetrician & Gynecologist', 'MBBS., DGO.', 17, 'Mon-Sat: 09:00 AM - 05:00 PM')
ON CONFLICT (email) DO NOTHING;
