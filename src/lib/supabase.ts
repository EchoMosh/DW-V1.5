import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hecuzfntjyffydozkgnx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlY3V6Zm50anlmZnlkb3prZ254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NTY5MDYsImV4cCI6MjA3MTIzMjkwNn0.BApkoKx3JLdWyyF1l1cTTeP4pKmFeNUiTAf4gEnBFhE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
