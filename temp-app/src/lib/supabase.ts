import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate environment variables
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return url.includes('supabase.co')
  } catch {
    return false
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env.local file or Vercel environment variables.'
  )
}

if (supabaseUrl && !isValidUrl(supabaseUrl)) {
  console.error(
    `Invalid Supabase URL: ${supabaseUrl}. Please verify your NEXT_PUBLIC_SUPABASE_URL environment variable.`
  )
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
}
