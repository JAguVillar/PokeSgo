import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxwkhepuvosrpkayesuu.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4d2toZXB1dm9zcnBrYXllc3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NjExMTgsImV4cCI6MjAyMjUzNzExOH0.N2yVbqYBCtrTXNhfXgfRnxS5JMaJVUL-bmv0LiwFBm4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
