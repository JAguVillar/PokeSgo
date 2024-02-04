import { createClient } from '@supabase/supabase-js'

const url = 'https://jxwkhepuvosrpkayesuu.supabase.co'
const anon_key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4d2toZXB1dm9zcnBrYXllc3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NjExMTgsImV4cCI6MjAyMjUzNzExOH0.N2yVbqYBCtrTXNhfXgfRnxS5JMaJVUL-bmv0LiwFBm4'

export const supabase = createClient(url, anon_key)
