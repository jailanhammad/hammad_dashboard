import { createClient } from '@supabase/supabase-js'

// Replace the strings below with the ones you just copied
const supabaseUrl = 'https://ofklrkujpyqejlefhyfn.supabase.co' ;
const supabaseKey = 'sb_publishable_stvyzOa1vFYIwubdnYjHvQ_krsMADvO';


// Ensure "export" is present
export const supabase = createClient(supabaseUrl, supabaseKey)