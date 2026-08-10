"use client"

import { useState } from "react"

import { type Bodega } from "@/features/bodegas/types"

import { useAdmin } from "../AdminProvider"
import { CampoArea, CampoTexto } from "./CamposAdmin"

export function EditorBodegas({ bodegas }: { bodegas: readonly Bodega[] }) {
  const { estado, listo, editarBodega } = useAdmin()
  const [abierto, setAbierto] = useState<string | null>(null)

  return (
    <ul className="divide-border/70 flex flex-col divide-y">
      {bodegas.map((bodega) => {
        const edicion = estado.bodegas[bodega.id] ?? {}
        const nombre = edicion.nombre ?? bodega.nombre
        const editado = listo && Object.keys(edicion).length > 0
        const estaAbierto = abierto === bodega.id

        return (
          <li key={bodega.id} className="py-3">
            <div className="flex items-center gap-3">
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
                  {edicion.region ?? bodega.region} · desde {bodega.fundacion}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAbierto(estaAbierto ? null : bodega.id)}
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
                    ayuda="Ojo: los vinos se enlazan por nombre. Si lo cambiás, en la demo los vinos siguen mostrando el anterior."
                    onChange={(v) => editarBodega(bodega.id, { nombre: v })}
                  />
                  <CampoTexto
                    label="Región"
                    value={edicion.region ?? bodega.region}
                    onChange={(v) => editarBodega(bodega.id, { region: v })}
                  />
                </div>

                <CampoArea
                  label="Resumen"
                  value={edicion.resumen ?? bodega.resumen}
                  filas={2}
                  onChange={(v) => editarBodega(bodega.id, { resumen: v })}
                />

                <CampoArea
                  label="Descripción"
                  value={edicion.descripcion ?? bodega.descripcion}
                  filas={4}
                  onChange={(v) => editarBodega(bodega.id, { descripcion: v })}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
