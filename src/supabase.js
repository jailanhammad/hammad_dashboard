import { createClient } from '@supabase/supabase-client'

// 1. Your Project URL (found in your Supabase settings)
const supabaseUrl = 'https://ofklrkujpyqejlefyhfn.supabase.co'

// 2. Your Anon/Public Key (Copy the long string from your Supabase API settings)
const supabaseKey = 'YOUR_LONG_ANON_KEY_HERE' 

// 3. Create and export the client
// IMPORTANT: Use parentheses (), not square brackets []
export const supabase = createClient(supabaseUrl, supabaseKey)