import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import {
  getSupabaseCredenciales,
  isSupabaseConfigurado,
} from "@/integrations/supabase/config"

/**
 * Proxy (ex middleware). Su ÚNICA tarea de auth es refrescar la sesión.
 * NO es la barrera de seguridad (CVE-2025-29927): la autorización real vive
 * en el DAL (getUser + chequeo de rol) y en el RLS de Supabase.
 *
 * Mientras el proyecto corra en modo demo (sin credenciales de Supabase),
 * pasa de largo sin tocar la request.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  if (!isSupabaseConfigurado()) return response

  const { url, anonKey } = getSupabaseCredenciales()

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresca el token. No tomar decisiones de autorización acá.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
}
