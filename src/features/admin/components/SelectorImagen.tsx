"use client"

import Image from "next/image"

type SelectorImagenProps = {
  label: string
  value: string
  onChange: (valor: string) => void
  /** Rutas de `public/` entre las que se puede elegir. */
  opciones: readonly string[]
  /** `contain` para botellas con fondo transparente, `cover` para fotos. */
  ajuste?: "contain" | "cover"
}

/**
 * Elige una imagen entre las que ya están en `public/`.
 * No sube archivos: en modo demo no hay storage donde guardarlos.
 */
export function SelectorImagen({
  label,
  value,
  onChange,
  opciones,
  ajuste = "contain",
}: SelectorImagenProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
        {label}
      </legend>

      <div className="flex flex-wrap gap-2">
        {opciones.map((ruta) => {
          const activa = ruta === value
          return (
            <button
              key={ruta}
              type="button"
              onClick={() => onChange(ruta)}
              aria-pressed={activa}
              aria-label={ruta}
              className={`focus-visible:ring-ring/40 relative size-16 overflow-hidden rounded-sm border bg-white transition-colors outline-none focus-visible:ring-[3px] ${
                activa
                  ? "border-marca ring-marca/30 ring-2"
                  : "border-border/70 hover:border-foreground/30"
              }`}
            >
              <Image
                src={ruta}
                alt=""
                fill
                sizes="64px"
                className={ajuste === "cover" ? "object-cover" : "object-contain p-1"}
              />
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
