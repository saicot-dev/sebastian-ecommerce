"use server"

import { isSupabaseConfigurado } from "@/integrations/supabase/config"

import { registroSchema, type RegistroInput } from "./schema"

export type ResultadoRegistro =
  | { ok: true; mensaje: string }
  | { ok: false; error: string }

/**
 * Alta de suscriptor.
 *
 * Revalida en el server: el cliente puede saltearse la validación de Zod.
 *
 * Modo demo: mientras no haya credenciales de Supabase, valida y responde
 * sin persistir. Al conectar la base, insertar acá — el formulario no cambia.
 */
export async function registrarSuscriptor(
  input: RegistroInput
): Promise<ResultadoRegistro> {
  const parsed = registroSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Revisá los datos ingresados",
    }
  }

  if (!isSupabaseConfigurado()) {
    return {
      ok: true,
      mensaje: `Listo, ${parsed.data.nombre}. Te escribimos a ${parsed.data.email}.`,
    }
  }

  // TODO: al conectar Supabase, insertar en la tabla de suscriptores
  // (con RLS + WITH CHECK) y manejar el caso de email duplicado.
  return {
    ok: true,
    mensaje: `Listo, ${parsed.data.nombre}. Te escribimos a ${parsed.data.email}.`,
  }
}
