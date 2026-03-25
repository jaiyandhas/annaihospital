-- doctors_insert.sql
-- Run this in your Supabase SQL Editor

-- Step 1: Clear all existing doctor rows (start fresh with real data)
DELETE FROM public.doctors;

-- Step 2: Make email nullable (it was NOT NULL in the original schema)
ALTER TABLE public.doctors ALTER COLUMN email DROP NOT NULL;

-- Step 3: Make experience_years nullable (we only know qualifications, not years)
ALTER TABLE public.doctors ALTER COLUMN experience_years DROP NOT NULL;

-- Step 4: Add specialty column if it doesn't exist yet
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS specialty TEXT;

-- Step 5: Insert all 7 real doctors
-- image_url paths match the files placed in /public/doctors/
INSERT INTO public.doctors (name, department, specialty, qualifications, availability, image_url, role)
VALUES
    (
        'Dr. P. Saravanaraja',
        'Neonatology & Paediatrics',
        'Consultant Neonatologist, Paediatrician & Allergy Specialist',
        'MBBS, DCH, MRCPCH (UK), MRCP (Edin), DPAA',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Saravanaraja.jpeg',
        'doctor'
    ),
    (
        'Dr. G. Jamuna',
        'Obstetrics & Gynaecology',
        'Obstetrician & Gynaecologist',
        'MBBS, D.G.O',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Jamuna.jpeg',
        'doctor'
    ),
    (
        'Dr. M. Punitha',
        'Pulmonology & Sleep Medicine',
        'Consultant Pulmonologist & Sleep Specialist',
        'MBBS, DTCD, DNB',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Punita.jpeg',
        'doctor'
    ),
    (
        'Dr. M. Karthikeyen',
        'Orthopaedics',
        'Orthopaedic Surgeon',
        'MBBS, MS (Ortho), DNB (Ortho)',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/KARTHIKEYEN.jpeg',
        'doctor'
    ),
    (
        'Dr. P. Jayakumar',
        'Paediatric Surgery',
        'Paediatric Surgeon',
        'MBBS, MS, MCh',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Jayakumar.jpeg',
        'doctor'
    ),
    (
        'Dr. G. Arul',
        'Anaesthesiology',
        'Anaesthesiologist',
        'MBBS, DA',
        'Mon-Sat: On Call',
        '/doctors/ARUL.jpeg',
        'doctor'
    ),
    (
        'Dr. S. U. Chithrapavai',
        'Anaesthesiology',
        'Anaesthesiologist',
        'MBBS, DA',
        'Mon-Sat: On Call',
        '/doctors/CHITHRAPAVAI.jpeg',
        'doctor'
    ),
    (
        'Dr. Vimala',
        'General & Laparoscopic Surgery',
        'General & Laparoscopic Surgeon',
        'MBBS, MS (JIPMER), DNB, FMAS',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Vimala.jpeg',
        'doctor'
    );
