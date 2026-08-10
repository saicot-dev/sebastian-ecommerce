"use client"

import Image from "next/image"

import { useAdmin } from "../AdminProvider"
import { IMAGENES_HERO, IMAGENES_TIPO } from "../imagenes"
import { CampoTexto } from "./CamposAdmin"
import { SelectorImagen } from "./SelectorImagen"

const TIPOS = [
  { clave: "tipoTinto", label: "Tinto", pordefecto: "/tipo-tinto.jpg" },
  { clave: "tipoBlanco", label: "Blanco", pordefecto: "/tipo-blanco.jpg" },
  { clave: "tipoRosado", label: "Rosado", pordefecto: "/tipo-rosado.jpg" },
  {
    clave: "tipoEspumante",
    label: "Espumante",
    pordefecto: "/tipo-espumante.jpg",
  },
] as const

/**
 * Imágenes de la home: hero y las 4 tarjetas de tipo.
 *
 * Además de elegir entre las fotos de `public/`, se puede pegar una ruta o URL
 * a mano — de otro modo el editor solo permitiría intercambiar las 4 que ya hay.
 */
export function EditorSitio() {
  const { estado, editarSitio } = useAdmin()
  const hero = estado.sitio.hero ?? "/hero-vino.png"

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold tracking-tight">
            Foto principal (hero)
          </h3>
          <p className="text-muted-foreground text-sm">
            La foto grande que abre la home.
          </p>
        </div>

        <div className="border-border/70 relative aspect-[1385/768] w-full max-w-md overflow-hidden rounded-sm border bg-white">
          <Image
            src={hero}
            alt="Vista previa del hero"
            fill
            sizes="448px"
            className="object-contain"
          />
        </div>

        <SelectorImagen
          label="Elegir entre las fotos cargadas"
          value={hero}
          opciones={IMAGENES_HERO}
          onChange={(v) => editarSitio({ hero: v })}
        />

        <CampoTexto
          label="O pegá la ruta de otra foto"
          value={hero}
          placeholder="/mi-foto.png"
          ayuda="La foto tiene que estar en la carpeta public/ del proyecto."
          onChange={(v) => editarSitio({ hero: v })}
        />
      </section>

      <section className="flex flex-col gap-4 border-t pt-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold tracking-tight">
            Tipos de vino
          </h3>
          <p className="text-muted-foreground text-sm">
            Las 4 fotos cuadradas que van debajo del hero.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {TIPOS.map((tipo) => {
            const actual = estado.sitio[tipo.clave] ?? tipo.pordefecto

            return (
              <div key={tipo.clave} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="border-border/70 relative size-16 shrink-0 overflow-hidden rounded-sm border bg-white">
                    <Image
                      src={actual}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">{tipo.label}</p>
                </div>

                <SelectorImagen
                  label="Elegir foto"
                  value={actual}
                  opciones={IMAGENES_TIPO}
                  ajuste="contain"
                  onChange={(v) => editarSitio({ [tipo.clave]: v })}
                />

                <CampoTexto
                  label="O pegá otra ruta"
                  value={actual}
                  placeholder="/tipo-tinto.jpg"
                  onChange={(v) => editarSitio({ [tipo.clave]: v })}
                />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
