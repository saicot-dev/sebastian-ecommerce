const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Durante la fase de demo el proyecto corre con datos hardcodeados y sin
 * credenciales de Supabase. Todo lo que toque la base pregunta primero por acá.
 */
export function isSupabaseConfigurado(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

/**
 * Devuelve las credenciales ya validadas. Llamar solo tras verificar
 * `isSupabaseConfigurado()`.
 */
export function getSupabaseCredenciales(): { url: string; anonKey: string } {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase no está configurado. Definí NEXT_PUBLIC_SUPABASE_URL y " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local (ver .env.example)."
    )
  }
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY }
}
