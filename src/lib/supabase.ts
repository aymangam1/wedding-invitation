import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()

// Supabase renamed the browser-safe key from "anon" to "publishable"; accept either.
const publishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/**
 * `null` when the project keys are missing, which lets the guest book fall back
 * to device-local storage instead of crashing.
 */
export const supabase: SupabaseClient | null =
  url && publishableKey ? createClient(url, publishableKey, { auth: { persistSession: false } }) : null

export const isSupabaseEnabled = supabase !== null
