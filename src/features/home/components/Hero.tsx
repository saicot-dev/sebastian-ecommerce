import { ImagenHero } from "./ImagenHero"

export function Hero() {
  return (
    // El ancho manda hasta 1250px, pero en pantallas bajas gana el `clamp`:
    // así la foto se achica sola y los 4 tipos siguen entrando.
    // ESTE ES EL MÁXIMO: medido en navegador real, con valores más altos las
    // tarjetas se caen fuera de la primera pantalla en 1280x720 y 1366x768.
    // La foto es apaisada (1385x768), así que cada px de ancho suma 0,55 de alto.
    // El `min(100%,…)` es obligatorio: el mínimo del clamp (740px) es más ancho
    // que un teléfono, y sin él la foto se desborda y se corta a la derecha.
    <section className="mx-auto w-full max-w-[min(100%,clamp(740px,116svh,1250px))] px-4 pt-4 lg:px-6 lg:pt-5">
      {/* El h1 de la página. Va oculto a la vista porque el hero es solo la
          foto, pero Google y los lectores de pantalla necesitan el título. */}
      <h1 className="sr-only">
        Sebastian Wines — Tienda de vinos: tintos, blancos, rosados y espumantes
      </h1>

      {/* Entera, sin recorte: el alto sale de su proporción real (1385x768).
          No usar `object-cover` acá — recorta la foto y se ve ampliada. */}
      <ImagenHero />
    </section>
  )
}
