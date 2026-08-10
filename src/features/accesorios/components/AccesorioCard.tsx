"use client"

import Image from "next/image"

import { useAdmin } from "@/features/admin/AdminProvider"
import { aplicarEdicionAccesorio } from "@/features/admin/aplicar-ediciones"
import { BotonAgregar } from "@/features/carrito/components/BotonAgregar"
import { formatCurrency } from "@/lib/format-currency"

import { type Accesorio } from "../types"

/** Client Component solo por el modo demo: ver la nota en `VinoCard`. */
export function AccesorioCard({
  accesorio: original,
}: {
  accesorio: Accesorio
}) {
  const { estado, listo } = useAdmin()
  const accesorio = listo
    ? aplicarEdicionAccesorio(original, estado)
    : original

  const enOferta = accesorio.precioAnterior !== undefined

  return (
    <article className="border-border/70 hover:border-foreground/30 flex h-full flex-col overflow-hidden rounded-sm border transition-colors">
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={accesorio.imagen}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-6"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm leading-tight font-medium tracking-tight">
            {accesorio.nombre}
          </h3>
          <p className="text-muted-foreground text-xs leading-snug text-pretty">
            {accesorio.descripcion}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight">
              {formatCurrency(accesorio.precio)}
            </span>
            {enOferta && (
              <span className="text-muted-foreground text-xs line-through">
                {formatCurrency(accesorio.precioAnterior!)}
              </span>
            )}
          </div>

          <BotonAgregar
            className="w-full"
            item={{
              id: `accesorio-${accesorio.slug}`,
              slug: accesorio.slug,
              nombre: accesorio.nombre,
              detalle: "Accesorio",
              imagen: accesorio.imagen,
              precio: accesorio.precio,
              tipo: "accesorio",
            }}
          />
        </div>
      </div>
    </article>
  )
}
