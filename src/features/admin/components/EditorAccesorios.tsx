"use client"

import Image from "next/image"
import { useState } from "react"

import { type Accesorio } from "@/features/accesorios/types"
import { formatCurrency } from "@/lib/format-currency"

import { useAdmin } from "../AdminProvider"
import { IMAGENES_ACCESORIO } from "../imagenes"
import { CampoArea, CampoNumero, CampoTexto } from "./CamposAdmin"
import { SelectorImagen } from "./SelectorImagen"

export function EditorAccesorios({
  accesorios,
}: {
  accesorios: readonly Accesorio[]
}) {
  const { estado, listo, editarAccesorio } = useAdmin()
  const [abierto, setAbierto] = useState<string | null>(null)

  return (
    <ul className="divide-border/70 flex flex-col divide-y">
      {accesorios.map((acc) => {
        const edicion = estado.accesorios[acc.id] ?? {}
        const nombre = edicion.nombre ?? acc.nombre
        const precio = edicion.precio ?? acc.precio
        const imagen = edicion.imagen ?? acc.imagen
        const editado = listo && Object.keys(edicion).length > 0
        const estaAbierto = abierto === acc.id

        const precioAnterior =
          edicion.precioAnterior === null
            ? undefined
            : (edicion.precioAnterior ?? acc.precioAnterior)

        return (
          <li key={acc.id} className="py-3">
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
                  {edicion.descripcion ?? acc.descripcion}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold">
                {formatCurrency(precio)}
              </p>

              <button
                type="button"
                onClick={() => setAbierto(estaAbierto ? null : acc.id)}
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
                    onChange={(v) => editarAccesorio(acc.id, { nombre: v })}
                  />
                  <CampoNumero
                    label="Precio"
                    value={precio}
                    onChange={(v) =>
                      editarAccesorio(acc.id, { precio: v ?? acc.precio })
                    }
                  />
                  <CampoNumero
                    label="Precio anterior"
                    value={precioAnterior}
                    opcional
                    ayuda="Si lo completás, se muestra en oferta."
                    onChange={(v) =>
                      editarAccesorio(acc.id, { precioAnterior: v ?? null })
                    }
                  />
                </div>

                <CampoArea
                  label="Descripción"
                  value={edicion.descripcion ?? acc.descripcion}
                  filas={2}
                  onChange={(v) => editarAccesorio(acc.id, { descripcion: v })}
                />

                <SelectorImagen
                  label="Foto"
                  value={imagen}
                  opciones={IMAGENES_ACCESORIO}
                  onChange={(v) => editarAccesorio(acc.id, { imagen: v })}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
