import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { getSupabaseCredenciales } from "./config"

/**
 * Cliente de Supabase para Server Components, Server Actions y Route Handlers.
 * Reglas absolutas: solo getAll/setAll, nunca get/set/remove.
 *
 * Lanza si no hay credenciales: durante la demo nada debería llamarlo.
 */
export async function createClient() {
  const { url, anonKey } = getSupabaseCredenciales()
  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Llamado desde un Server Component: ignorar, el proxy refresca la sesión.
        }
      },
    },
  })
}
