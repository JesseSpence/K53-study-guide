import { createClient } from '@supabase/supabase-js'

export function useSupabaseAdmin() {
  const config = useRuntimeConfig()
  if (!process.env.SUPABASE_URL || !config.supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(process.env.SUPABASE_URL, config.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}
