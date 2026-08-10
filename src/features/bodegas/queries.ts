import { BODEGAS_MOCK } from "./mock-data"
import { type Bodega } from "./types"

/**
 * DAL de bodegas. Hoy lee de `mock-data.ts` (modo demo).
 * Al conectar Supabase solo cambia el cuerpo de estas funciones.
 */

export async function getBodegas(): Promise<Bodega[]> {
  return [...BODEGAS_MOCK]
}

export async function getBodegaBySlug(slug: string): Promise<Bodega | null> {
  return BODEGAS_MOCK.find((b) => b.slug === slug) ?? null
}

/** Busca por nombre exacto: es lo que guarda `Vino.bodega`. */
export async function getBodegaByNombre(
  nombre: string
): Promise<Bodega | null> {
  return BODEGAS_MOCK.find((b) => b.nombre === nombre) ?? null
}
