import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xofiecvemtecyjbjfkbc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZmllY3ZlbXRlY3lqYmpma2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjc4ODEsImV4cCI6MjA4ODYwMzg4MX0.tZuOy0J__MavSPm_iQR3s2ZIha5YEkvLh-zTEEmy-Gs'

export const supabase = createClient(supabaseUrl, supabaseKey)
