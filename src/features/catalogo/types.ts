export type TipoDeVino = "tinto" | "blanco" | "rosado" | "espumante"

/** Botellas por caja y descuento por compra mayorista. */
export const BOTELLAS_POR_CAJA = 6
export const DESCUENTO_CAJA = 0.15

/** Precio de la caja de 6: 15% más barato que comprar 6 botellas sueltas. */
export function precioCaja(precioBotella: number): number {
  const bruto = precioBotella * BOTELLAS_POR_CAJA * (1 - DESCUENTO_CAJA)
  // Redondeo a centena para que no queden precios con decimales raros.
  return Math.round(bruto / 100) * 100
}

/** Criterios de orden del catálogo. */
export type OrdenCatalogo =
  | "precio-asc"
  | "precio-desc"
  | "anio-asc"
  | "anio-desc"

export const ORDENES: readonly { valor: OrdenCatalogo; label: string }[] = [
  { valor: "precio-asc", label: "Más barato primero" },
  { valor: "precio-desc", label: "Más caro primero" },
  { valor: "anio-desc", label: "Cosecha más nueva" },
  { valor: "anio-asc", label: "Cosecha más antigua" },
] as const

/** Valida el parámetro `?orden=` de la URL. */
export function parseOrden(
  valor: string | undefined
): OrdenCatalogo | undefined {
  return ORDENES.find((o) => o.valor === valor)?.valor
}

export type Vino = {
  id: string
  slug: string
  nombre: string
  varietal: string
  tipo: TipoDeVino
  bodega: string
  anio: number
  precio: number
  /** Precio anterior. Si existe, el vino está en oferta. */
  precioAnterior?: number
  /** Foto de la botella. Varias etiquetas comparten imagen en modo demo. */
  imagen: string
  /** Foto de la caja de 6. */
  imagenCaja: string
  notas: string
  maridaje: string
  graduacion: string
  destacado: boolean
  masVendido: boolean
}
