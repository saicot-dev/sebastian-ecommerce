"use client"

import Image from "next/image"
import Link from "next/link"

import { useAdmin } from "@/features/admin/AdminProvider"
import { aplicarEdicionVino } from "@/features/admin/aplicar-ediciones"
import { BotonAgregar } from "@/features/carrito/components/BotonAgregar"
import { formatCurrency } from "@/lib/format-currency"

import { type Vino } from "../types"

/**
 * Client Component solo por el modo demo: lee los cambios del panel de admin,
 * que viven en `localStorage`. Cuando los datos vengan de Supabase, las queries
 * ya traerán los valores editados y esto vuelve a ser Server Component.
 */
export function VinoCard({ vino: original }: { vino: Vino }) {
  const { estado, listo } = useAdmin()
  // Hasta leer `localStorage` mostramos el original: si no, el HTML del
  // servidor no coincide con el del cliente y React avisa por hidratación.
  const vino = listo ? aplicarEdicionVino(original, estado) : original

  const enOferta = vino.precioAnterior !== undefined
  const descuento = enOferta
    ? Math.round((1 - vino.precio / vino.precioAnterior!) * 100)
    : 0

  return (
    <article className="group border-border/70 hover:border-foreground/30 relative flex flex-col overflow-hidden rounded-sm border transition-colors">
      <Link href={`/productos/${vino.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          <Image
            src={vino.imagen}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />

          {enOferta && (
            <span className="bg-marca absolute top-2 left-2 rounded-full px-2 py-1 text-[0.65rem] font-medium tracking-wide text-white">
              −{descuento}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3">
          {/* Los tres datos que el usuario pidió resaltar. */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-muted rounded-full px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase">
              {vino.tipo}
            </span>
            <span className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
              {vino.bodega}
            </span>
            <span className="text-muted-foreground font-mono text-[0.65rem]">
              {vino.anio}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm leading-tight font-medium tracking-tight">
              {vino.nombre}
            </h3>
            <p className="text-muted-foreground text-xs">{vino.varietal}</p>
          </div>

          <div className="mt-auto flex items-baseline gap-2 pt-1">
            <span className="text-base font-semibold tracking-tight">
              {formatCurrency(vino.precio)}
            </span>
            {enOferta && (
              <span className="text-muted-foreground text-xs line-through">
                {formatCurrency(vino.precioAnterior!)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Fuera del <Link>: un <button> dentro de un <a> es HTML inválido. */}
      <div className="px-3 pb-3">
        <BotonAgregar
          className="w-full"
          item={{
            id: `vino-${vino.slug}-botella`,
            slug: vino.slug,
            nombre: `${vino.nombre} ${vino.varietal}`,
            detalle: `Botella · ${vino.anio}`,
            imagen: vino.imagen,
            precio: vino.precio,
            tipo: "vino",
            presentacion: "botella",
          }}
        />
      </div>
    </article>
  )
}
