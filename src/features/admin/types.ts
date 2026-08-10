/**
 * Cambios que el administrador hizo desde el panel, guardados por id.
 * Solo se guardan los campos tocados: lo que no está acá sale del mock.
 */
export type EdicionVino = {
  nombre?: string
  precio?: number
  precioAnterior?: number | null
  notas?: string
  imagen?: string
  bodega?: string
  anio?: number
}

export type EdicionAccesorio = {
  nombre?: string
  precio?: number
  precioAnterior?: number | null
  descripcion?: string
  imagen?: string
}

export type EdicionBodega = {
  nombre?: string
  region?: string
  resumen?: string
  descripcion?: string
}

/** Imágenes del hero y de los 4 tipos de vino de la home. */
export type EdicionSitio = {
  hero?: string
  tipoTinto?: string
  tipoBlanco?: string
  tipoRosado?: string
  tipoEspumante?: string
}

export type EstadoAdmin = {
  vinos: Record<string, EdicionVino>
  accesorios: Record<string, EdicionAccesorio>
  bodegas: Record<string, EdicionBodega>
  sitio: EdicionSitio
}

export const ESTADO_ADMIN_VACIO: EstadoAdmin = {
  vinos: {},
  accesorios: {},
  bodegas: {},
  sitio: {},
}
