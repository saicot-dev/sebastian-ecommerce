/** Presentación del vino: botella suelta o caja de 6. */
export type Presentacion = "botella" | "caja"

export type ItemCarrito = {
  /** Clave única del ítem: slug + presentación. */
  id: string
  slug: string
  nombre: string
  detalle: string
  imagen: string
  /** Precio unitario congelado al agregar. Referencial: el total real se
   *  recalcula en el server al hacer checkout. */
  precio: number
  cantidad: number
  tipo: "vino" | "accesorio"
  presentacion?: Presentacion
}
