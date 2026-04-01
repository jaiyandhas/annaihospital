-- Run this schema in your Supabase SQL Editor to prepare for the Queue System

-- 1. Add queue columns to the existing appointments table
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS token_number INTEGER,
ADD COLUMN IF NOT EXISTS expected_time TEXT,
ADD COLUMN IF NOT EXISTS is_skipped BOOLEAN DEFAULT false;

-- 2. Ensure the publication allows real-time listening on appointments 
-- so patients get instant updates when admins move the queue.
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;

ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
