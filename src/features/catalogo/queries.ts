import { VINOS_MOCK } from "./mock-data"
import {
  type OrdenCatalogo,
  type TipoDeVino,
  type Vino,
} from "./types"

/**
 * DAL del catálogo. Hoy lee de `mock-data.ts` (modo demo).
 * Al conectar Supabase solo cambia el cuerpo de estas funciones.
 */

export async function getVinos(): Promise<Vino[]> {
  return [...VINOS_MOCK]
}

export async function getVinosMasVendidos(limite = 8): Promise<Vino[]> {
  return VINOS_MOCK.filter((v) => v.masVendido).slice(0, limite)
}

export async function getVinosEnOferta(limite = 4): Promise<Vino[]> {
  return VINOS_MOCK.filter((v) => v.precioAnterior !== undefined).slice(
    0,
    limite
  )
}

export async function getVinosDestacados(limite = 4): Promise<Vino[]> {
  return VINOS_MOCK.filter((v) => v.destacado).slice(0, limite)
}

export async function getVinoBySlug(slug: string): Promise<Vino | null> {
  return VINOS_MOCK.find((v) => v.slug === slug) ?? null
}

export async function getVinosByBodega(nombre: string): Promise<Vino[]> {
  return VINOS_MOCK.filter((v) => v.bodega === nombre)
}

type FiltrosCatalogo = {
  tipo?: TipoDeVino
  q?: string
  orden?: OrdenCatalogo
  /** Nombre exacto de la bodega, tal como lo guarda `Vino.bodega`. */
  bodega?: string
}

const COMPARADORES: Record<OrdenCatalogo, (a: Vino, b: Vino) => number> = {
  "precio-asc": (a, b) => a.precio - b.precio,
  "precio-desc": (a, b) => b.precio - a.precio,
  "anio-asc": (a, b) => a.anio - b.anio,
  "anio-desc": (a, b) => b.anio - a.anio,
}

export async function buscarVinos({
  tipo,
  q,
  orden,
  bodega,
}: FiltrosCatalogo = {}): Promise<Vino[]> {
  let resultado = [...VINOS_MOCK]

  if (tipo) {
    resultado = resultado.filter((v) => v.tipo === tipo)
  }

  if (bodega) {
    resultado = resultado.filter((v) => v.bodega === bodega)
  }

  if (q) {
    const termino = q.trim().toLowerCase()
    resultado = resultado.filter((v) =>
      [v.nombre, v.varietal, v.bodega, v.tipo].some((campo) =>
        campo.toLowerCase().includes(termino)
      )
    )
  }

  if (orden) {
    resultado.sort(COMPARADORES[orden])
  }

  return resultado
}
