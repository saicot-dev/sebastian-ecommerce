"use client"

import Image from "next/image"
import { useState } from "react"

import { type Vino } from "@/features/catalogo/types"
import { formatCurrency } from "@/lib/format-currency"

import { useAdmin } from "../AdminProvider"
import { IMAGENES_BOTELLA } from "../imagenes"
import { CampoArea, CampoNumero, CampoTexto } from "./CamposAdmin"
import { SelectorImagen } from "./SelectorImagen"

/**
 * Lista de vinos con edición desplegable. Solo se abre uno a la vez: con 16
 * vinos, mostrarlos todos abiertos vuelve la página inmanejable.
 */
export function EditorVinos({
  vinos,
  bodegas,
}: {
  vinos: readonly Vino[]
  bodegas: readonly string[]
}) {
  const { estado, listo, editarVino } = useAdmin()
  const [abierto, setAbierto] = useState<string | null>(null)

  return (
    <ul className="divide-border/70 flex flex-col divide-y">
      {vinos.map((vino) => {
        const edicion = estado.vinos[vino.id] ?? {}
        const nombre = edicion.nombre ?? vino.nombre
        const precio = edicion.precio ?? vino.precio
        const imagen = edicion.imagen ?? vino.imagen
        const editado = listo && Object.keys(edicion).length > 0
        const estaAbierto = abierto === vino.id

        // `null` significa "el admin borró la oferta"; `undefined`, "no la tocó".
        const precioAnterior =
          edicion.precioAnterior === null
            ? undefined
            : (edicion.precioAnterior ?? vino.precioAnterior)

        return (
          <li key={vino.id} className="py-3">
            <div className="flex items-center gap-3">
              <div className="border-border/70 relative size-14 shrink-0 overflow-hidden rounded-sm border bg-white">
                <Image
                  src={imagen}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium">{nombre}</p>
                  {editado && (
                    <span className="bg-marca rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium text-white">
                      editado
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground truncate text-xs">
                  {vino.varietal} · {edicion.bodega ?? vino.bodega} ·{" "}
                  {edicion.anio ?? vino.anio}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold">
                {formatCurrency(precio)}
              </p>

              <button
                type="button"
                onClick={() => setAbierto(estaAbierto ? null : vino.id)}
                aria-expanded={estaAbierto}
                className="border-border/70 hover:border-foreground/30 shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {estaAbierto ? "Cerrar" : "Editar"}
              </button>
            </div>

            {estaAbierto && (
              <div className="border-border/70 mt-4 flex flex-col gap-4 rounded-sm border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <CampoTexto
                    label="Nombre"
                    value={nombre}
                    onChange={(v) => editarVino(vino.id, { nombre: v })}
                  />

                  <label className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground text-xs tracking-wide uppercase">
                      Bodega
                    </span>
                    <select
                      value={edicion.bodega ?? vino.bodega}
                      onChange={(e) =>
                        editarVino(vino.id, { bodega: e.target.value })
                      }
                      className="border-border/70 focus-visible:border-foreground/40 focus-visible:ring-ring/40 w-full rounded-sm border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
                    >
                      {bodegas.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>

                  <CampoNumero
                    label="Precio"
                    value={precio}
                    onChange={(v) =>
                      editarVino(vino.id, { precio: v ?? vino.precio })
                    }
                  />

                  <CampoNumero
                    label="Precio anterior"
                    value={precioAnterior}
                    opcional
                    ayuda="Si lo completás, el vino se muestra en oferta."
                    onChange={(v) =>
                      editarVino(vino.id, { precioAnterior: v ?? null })
                    }
                  />

                  <CampoNumero
                    label="Año"
                    value={edicion.anio ?? vino.anio}
                    onChange={(v) =>
                      editarVino(vino.id, { anio: v ?? vino.anio })
                    }
                  />
                </div>

                <CampoArea
                  label="Notas de cata"
                  value={edicion.notas ?? vino.notas}
                  onChange={(v) => editarVino(vino.id, { notas: v })}
                />

                <SelectorImagen
                  label="Foto de la botella"
                  value={imagen}
                  opciones={IMAGENES_BOTELLA}
                  onChange={(v) => editarVino(vino.id, { imagen: v })}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
