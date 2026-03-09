-- Create Lab Reports Table
CREATE TABLE IF NOT EXISTS public.lab_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    report_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    ordered_by TEXT,
    notes TEXT
);

-- Enable RLS
ALTER TABLE public.lab_reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to lab reports (in a real app, strict RLS should be applied based on auth rules)
CREATE POLICY "Allow public read access to lab reports" ON public.lab_reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert to lab_reports" ON public.lab_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to lab_reports" ON public.lab_reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to lab_reports" ON public.lab_reports FOR DELETE USING (true);
