import { createBrowserClient } from "@supabase/ssr"

import { getSupabaseCredenciales } from "./config"

/**
 * Cliente de Supabase para Client Components.
 * Solo usa variables NEXT_PUBLIC_ — nunca la service key.
 *
 * Lanza si no hay credenciales: durante la demo nada debería llamarlo.
 */
export function createClient() {
  const { url, anonKey } = getSupabaseCredenciales()
  return createBrowserClient(url, anonKey)
}
