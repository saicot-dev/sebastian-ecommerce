"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { type Bodega } from "../types"

/**
 * Desplegable de bodegas del header. Isla Client dentro de un header Server:
 * recibe las bodegas ya resueltas por props, no las busca.
 */
export function MenuBodegas({ bodegas }: { bodegas: readonly Bodega[] }) {
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)

  // Cierra al hacer clic afuera o con Escape: si no, el panel queda pegado.
  useEffect(() => {
    if (!abierto) return

    function handleClick(event: MouseEvent) {
      if (!contenedor.current?.contains(event.target as Node)) {
        setAbierto(false)
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setAbierto(false)
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [abierto])

  return (
    <div ref={contenedor} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-haspopup="true"
        className="text-foreground/70 hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
      >
        Bodegas
        <ChevronDown
          aria-hidden
          className={`size-3.5 transition-transform ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      {abierto && (
        <div className="bg-background border-border/70 absolute top-full left-1/2 z-50 mt-3 w-64 -translate-x-1/2 rounded-sm border p-2 shadow-lg">
          <ul className="flex flex-col">
            {bodegas.map((bodega) => (
              <li key={bodega.slug}>
                <Link
                  href={`/bodegas/${bodega.slug}`}
                  onClick={() => setAbierto(false)}
                  className="hover:bg-muted flex flex-col gap-0.5 rounded-sm px-3 py-2 transition-colors"
                >
                  <span className="text-sm font-medium">{bodega.nombre}</span>
                  <span className="text-muted-foreground text-xs">
                    {bodega.region}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/bodegas"
            onClick={() => setAbierto(false)}
            className="border-border/70 text-marca mt-2 block border-t px-3 pt-3 pb-1 text-xs font-medium"
          >
            Ver todas las bodegas →
          </Link>
        </div>
      )}
    </div>
  )
}
