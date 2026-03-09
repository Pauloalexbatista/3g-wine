import { createClient } from '@supabase/supabase-js'

// Utilizando as credenciais oficiais do projeto 3GWINE
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozketrcgjkqxwvynpxrd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1rLZPddAjK_BqM0ruv2_fw_ULLTPI0B'

export const supabase = createClient(supabaseUrl, supabaseKey)
