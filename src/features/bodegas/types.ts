export type Bodega = {
  id: string
  slug: string
  nombre: string
  /** Localidad y provincia. */
  region: string
  /** Año en que la bodega empezó a producir. */
  fundacion: number
  /** Presentación corta, para las tarjetas del listado. */
  resumen: string
  /** Texto largo, para la ficha de la bodega. */
  descripcion: string
  /** Varietales por los que se la conoce. */
  especialidades: readonly string[]
}
