-- doctors_insert.sql
-- Run this in your Supabase SQL Editor

-- Step 1: Clear all existing doctor rows (start fresh with real data)
DELETE FROM public.doctors;

-- Step 2: Make email nullable (it was NOT NULL in the original schema)
ALTER TABLE public.doctors ALTER COLUMN email DROP NOT NULL;

-- Step 3: Make experience_years nullable
ALTER TABLE public.doctors ALTER COLUMN experience_years DROP NOT NULL;

-- Step 4: Add specialty column if it doesn't exist yet
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS specialty TEXT;

-- Step 5: Add display_order column to control showcase order
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 99;

-- Step 6: Insert all 8 real doctors in showcase order
-- image_url paths match the files placed in /public/doctors/
INSERT INTO public.doctors (display_order, name, department, specialty, qualifications, availability, image_url, role)
VALUES
    (
        1,
        'Dr. P. Saravanaraja',
        'Neonatology & Paediatrics',
        'Consultant Neonatologist, Paediatrician & Allergy Specialist',
        'MBBS, DCH, MRCPCH (UK), MRCP (Edin), DPAA',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Saravanaraja.jpeg',
        'doctor'
    ),
    (
        2,
        'Dr. Jamuna Saravanaraja',
        'Obstetrics & Gynaecology',
        'Obstetrician & Gynaecologist',
        'MBBS, D.G.O',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Jamuna.jpeg',
        'doctor'
    ),
    (
        3,
        'Dr. Vimala',
        'General & Laparoscopic Surgery',
        'General & Laparoscopic Surgeon',
        'MBBS, MS (JIPMER), DNB, FMAS',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Vimala.jpeg',
        'doctor'
    ),
    (
        4,
        'Dr. M. Karthikeyen',
        'Orthopaedics',
        'Orthopaedic Surgeon',
        'MBBS, MS (Ortho), DNB (Ortho)',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/KARTHIKEYEN.jpeg',
        'doctor'
    ),
    (
        5,
        'Dr. P. Jayakumar',
        'Paediatric Surgery',
        'Paediatric Surgeon',
        'MBBS, MS, MCh',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Jayakumar.jpeg',
        'doctor'
    ),
    (
        6,
        'Dr. Priya',
        'Cardiology',
        'Cardiologist',
        'MBBS, MD (Internal Medicine), DrNB (Cardiology)',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Priya.jpeg',
        'doctor'
    ),
    (
        7,
        'Dr. M. Punitha',
        'Pulmonology & Sleep Medicine',
        'Consultant Pulmonologist & Sleep Specialist',
        'MBBS, DTCD, DNB',
        'Mon-Sat: 09:00 AM - 05:00 PM',
        '/doctors/Punita.jpeg',
        'doctor'
    ),
    (
        8,
        'Dr. G. Arul',
        'Anaesthesiology',
        'Anaesthesiologist',
        'MBBS, DA',
        'Mon-Sat: On Call',
        '/doctors/ARUL.jpeg',
        'doctor'
    ),
    (
        9,
        'Dr. S. U. Chithrapavai',
        'Anaesthesiology',
        'Anaesthesiologist',
        'MBBS, DA',
        'Mon-Sat: On Call',
        '/doctors/CHITHRAPAVAI.jpeg',
        'doctor'
    );
