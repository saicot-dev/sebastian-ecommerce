"use client"

import { useState } from "react"

import { type Accesorio } from "@/features/accesorios/types"
import { type Bodega } from "@/features/bodegas/types"
import { type Vino } from "@/features/catalogo/types"

import { useAdmin } from "../AdminProvider"
import { EditorAccesorios } from "./EditorAccesorios"
import { EditorBodegas } from "./EditorBodegas"
import { EditorSitio } from "./EditorSitio"
import { EditorVinos } from "./EditorVinos"

type Pestana = "vinos" | "accesorios" | "bodegas" | "sitio"

const PESTANAS: readonly { valor: Pestana; label: string }[] = [
  { valor: "vinos", label: "Vinos" },
  { valor: "accesorios", label: "Accesorios" },
  { valor: "bodegas", label: "Bodegas" },
  { valor: "sitio", label: "Imágenes del sitio" },
] as const

type PanelAdminProps = {
  vinos: readonly Vino[]
  accesorios: readonly Accesorio[]
  bodegas: readonly Bodega[]
}

export function PanelAdmin({ vinos, accesorios, bodegas }: PanelAdminProps) {
  const { listo, cantidadCambios, restablecerTodo } = useAdmin()
  const [pestana, setPestana] = useState<Pestana>("vinos")

  return (
    <div className="flex flex-col gap-6">
      {/* El aviso va arriba de todo y no se puede cerrar: sin base de datos,
          confundir esto con un panel real es el error más caro posible. */}
      <div className="border-marca/30 bg-marca/5 flex flex-col gap-1 rounded-sm border p-4">
        <p className="text-marca text-sm font-semibold">
          Modo demostración — los cambios no se guardan en el servidor
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Este panel sirve para mostrar cómo se vería la administración. Lo que
          edites se guarda solo en este navegador y no lo ve nadie más: si abrís
          la tienda en otra computadora, todo vuelve a estar como antes. Tampoco
          hay login todavía, así que esta página es pública. Para que sea real
          hay que conectar la base de datos.
        </p>
      </div>

      <div className="border-border/70 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <nav className="flex flex-wrap gap-2" aria-label="Secciones del panel">
          {PESTANAS.map((p) => (
            <button
              key={p.valor}
              type="button"
              onClick={() => setPestana(p.valor)}
              aria-current={pestana === p.valor ? "page" : undefined}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                pestana === p.valor
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/70 hover:border-foreground/30"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        {listo && cantidadCambios > 0 && (
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground text-xs">
              {cantidadCambios}{" "}
              {cantidadCambios === 1 ? "cambio" : "cambios"} sin publicar
            </p>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "¿Descartar todos los cambios y volver a los datos originales?"
                  )
                ) {
                  restablecerTodo()
                }
              }}
              className="border-border/70 hover:border-destructive/50 hover:text-destructive rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            >
              Descartar cambios
            </button>
          </div>
        )}
      </div>

      {pestana === "vinos" && (
        <EditorVinos vinos={vinos} bodegas={bodegas.map((b) => b.nombre)} />
      )}
      {pestana === "accesorios" && <EditorAccesorios accesorios={accesorios} />}
      {pestana === "bodegas" && <EditorBodegas bodegas={bodegas} />}
      {pestana === "sitio" && <EditorSitio />}
    </div>
  )
}
