/**
 * Imágenes disponibles en `public/`, agrupadas por uso.
 *
 * En modo demo el panel elige entre estas: no hay subida de archivos porque no
 * hay storage. Al conectar Supabase Storage, el selector se reemplaza por un
 * input de archivo y esta lista desaparece.
 */

export const IMAGENES_BOTELLA = [
  "/producto-valle-profundo.png",
  "/producto-brisa-marina.png",
  "/producto-flor-de-seda.png",
  "/producto-vinedo-real.png",
  "/producto-celebracion.png",
] as const

export const IMAGENES_ACCESORIO = [
  "/acc-sacacorchos.png",
  "/acc-oxigenador.png",
  "/acc-tapones.png",
  "/acc-termometro.png",
  "/acc-copas.png",
] as const

export const IMAGENES_TIPO = [
  "/tipo-tinto.jpg",
  "/tipo-blanco.jpg",
  "/tipo-rosado.jpg",
  "/tipo-espumante.jpg",
] as const

export const IMAGENES_HERO = ["/hero-vino.png"] as const
