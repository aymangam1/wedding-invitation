import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * The Supabase dashboard shows the REST endpoint (`.../rest/v1/`), but the
 * client expects the project root and would otherwise build paths like
 * `/rest/v1/rest/v1/wishes`. Accept either form.
 */
function projectRoot(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim().replace(/\/+$/, '')
  return trimmed ? trimmed.replace(/\/rest\/v\d+$/, '') : undefined
}

const url = projectRoot(import.meta.env.VITE_SUPABASE_URL)

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
