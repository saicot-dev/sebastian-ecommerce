import Link from "next/link"

import { type EdicionSitio } from "@/features/admin/types"

import { ImagenTipo } from "./ImagenTipo"

type TipoDeVino = {
  slug: string
  nombre: string
  imagen: string
  /** Clave con la que el panel de admin guarda la foto elegida. */
  claveAdmin: keyof EdicionSitio
}

const TIPOS_DE_VINO: readonly TipoDeVino[] = [
  {
    slug: "tinto",
    nombre: "Tinto",
    imagen: "/tipo-tinto.jpg",
    claveAdmin: "tipoTinto",
  },
  {
    slug: "blanco",
    nombre: "Blanco",
    imagen: "/tipo-blanco.jpg",
    claveAdmin: "tipoBlanco",
  },
  {
    slug: "rosado",
    nombre: "Rosado",
    imagen: "/tipo-rosado.jpg",
    claveAdmin: "tipoRosado",
  },
  {
    slug: "espumante",
    nombre: "Espumante",
    imagen: "/tipo-espumante.jpg",
    claveAdmin: "tipoEspumante",
  },
] as const

export function TiposDeVino() {
  return (
    <section className="border-b">
      {/* Mismo padding lateral que el Hero: así las tarjetas quedan alineadas
          con los bordes de la foto principal. */}
      <div className="w-full px-4 py-3 lg:px-6 lg:py-4">
        {/* Oculto a la vista: la grilla se explica sola, pero un lector de
            pantalla necesita saber qué agrupa esta lista de links. */}
        <h2 id="tipos-de-vino-titulo" className="sr-only">
          Comprar por tipo de vino
        </h2>

        {/* Separadas y con tope de ancho: pegadas y a pantalla completa se veían
            demasiado grandes y apretadas. */}
        <ul
          aria-labelledby="tipos-de-vino-titulo"
          className="mx-auto grid w-full max-w-[min(100%,clamp(740px,116svh,1250px))] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
        >
          {TIPOS_DE_VINO.map((tipo) => (
            <li key={tipo.slug} className="group">
              <Link
                href={`/productos?tipo=${tipo.slug}`}
                className="focus-visible:ring-ring/40 flex h-full flex-col gap-2.5 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-offset-4"
              >
                {/* Cuadrada a propósito: estas fotos traen el nombre del tipo
                    escrito abajo, y en formato apaisado ese texto queda cortado.
                    `object-contain` las muestra enteras, sin recorte. */}
                {/* Tope atado al viewport: en pantallas bajas las 4 se achican
                    para entrar junto con el hero. Va en el ancho, no en el
                    alto: con `aspect-square` limitar el alto deforma la foto. */}
                {/* `mx-auto`: como el `max-w` deja la caja más angosta que su
                    columna, sin esto cada foto queda pegada a la izquierda y
                    las 4 se ven desparejas. */}
                <div className="border-border/70 group-hover:border-foreground/30 relative mx-auto aspect-square w-full max-w-[clamp(118px,21svh,196px)] overflow-hidden rounded-sm border bg-white transition-colors">
                  <ImagenTipo
                    clave={tipo.claveAdmin}
                    pordefecto={tipo.imagen}
                  />
                </div>

                {/* La foto ya trae el nombre del tipo escrito: repetirlo debajo
                    duplica. Queda solo para lectores de pantalla, que necesitan
                    saber a dónde lleva el link. */}
                <span className="sr-only">{tipo.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
