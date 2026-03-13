import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ozketrcgjkqxwvynpxrd.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1rLZPddAjK_BqM0ruv2_fw_ULLTPI0B'
  )
}
