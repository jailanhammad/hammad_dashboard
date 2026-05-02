import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ofklrkujpyqejlefhyfn.supabase.co' ;
const supabaseKey = 'sb_publishable_stvyzOa1vFYIwubdnYjHvQ_krsMADvO';


export const supabase = createClient(supabaseUrl, supabaseKey)