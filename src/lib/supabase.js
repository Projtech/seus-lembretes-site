import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ptivwmuxlmmqxjhwxwgr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aXZ3bXV4bG1tcXhqaHd4d2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTgxMzQsImV4cCI6MjA2NTY5NDEzNH0.QpBxX5tWVeNPbtlV-xZKwRa3VbzsaGzNkD8MrYvuyfA'

export const supabase = createClient(supabaseUrl, supabaseKey)