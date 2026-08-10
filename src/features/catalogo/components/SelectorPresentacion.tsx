"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useAdmin } from "@/features/admin/AdminProvider"
import { aplicarEdicionVino } from "@/features/admin/aplicar-ediciones"
import { BotonAgregar } from "@/features/carrito/components/BotonAgregar"
import { formatCurrency } from "@/lib/format-currency"

import {
  BOTELLAS_POR_CAJA,
  DESCUENTO_CAJA,
  precioCaja,
  type Vino,
} from "../types"

type Presentacion = "botella" | "caja"

type SelectorPresentacionProps = {
  vino: Vino
  /** Slug de la bodega, para enlazar su ficha. Lo resuelve la página Server. */
  bodegaSlug?: string
}

export function SelectorPresentacion({
  vino: original,
  bodegaSlug,
}: SelectorPresentacionProps) {
  const [presentacion, setPresentacion] = useState<Presentacion>("botella")
  const { estado, listo } = useAdmin()

  // Modo demo: los cambios del panel viven en `localStorage`.
  const vino = listo ? aplicarEdicionVino(original, estado) : original

  const esCaja = presentacion === "caja"
  const precio = esCaja ? precioCaja(vino.precio) : vino.precio
  const imagen = esCaja ? vino.imagenCaja : vino.imagen

  // Cuánto se ahorra frente a comprar 6 botellas sueltas.
  const ahorro = vino.precio * BOTELLAS_POR_CAJA - precioCaja(vino.precio)

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="border-border/70 relative aspect-square w-full overflow-hidden rounded-sm border bg-white">
        <Image
          src={imagen}
          alt={
            esCaja
              ? `Caja de ${BOTELLAS_POR_CAJA} botellas de ${vino.nombre}`
              : `${vino.nombre} ${vino.varietal}`
          }
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-8 lg:p-12"
        />
      </div>

      <div className="flex flex-col gap-6">
        {/* Los tres datos que el usuario pidió resaltar. */}
        <dl className="border-border/70 grid grid-cols-3 gap-4 rounded-sm border p-4">
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Tipo
            </dt>
            <dd className="text-sm font-medium capitalize">{vino.tipo}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Bodega
            </dt>
            <dd className="text-sm font-medium">
              {bodegaSlug ? (
                <Link
                  href={`/bodegas/${bodegaSlug}`}
                  className="hover:text-marca underline-offset-4 transition-colors hover:underline"
                >
                  {vino.bodega}
                </Link>
              ) : (
                vino.bodega
              )}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Año
            </dt>
            <dd className="text-sm font-medium">{vino.anio}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {vino.nombre}
          </h1>
          <p className="text-muted-foreground text-lg">{vino.varietal}</p>
        </div>

        {/* Botella / caja de 6 */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-muted-foreground mb-2 text-xs tracking-[0.16em] uppercase">
            Presentación
          </legend>

          <div className="grid grid-cols-2 gap-2">
            <OpcionPresentacion
              activa={!esCaja}
              onClick={() => setPresentacion("botella")}
              titulo="Botella"
              detalle="750 ml"
              precio={formatCurrency(vino.precio)}
            />
            <OpcionPresentacion
              activa={esCaja}
              onClick={() => setPresentacion("caja")}
              titulo={`Caja x${BOTELLAS_POR_CAJA}`}
              detalle={`Ahorrás ${formatCurrency(ahorro)}`}
              precio={formatCurrency(precioCaja(vino.precio))}
              etiqueta={`−${Math.round(DESCUENTO_CAJA * 100)}%`}
            />
          </div>
        </fieldset>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold tracking-tight">
            {formatCurrency(precio)}
          </span>
          {esCaja && (
            <span className="text-muted-foreground text-sm">
              {formatCurrency(Math.round(precio / BOTELLAS_POR_CAJA))} por
              botella
            </span>
          )}
        </div>

        <BotonAgregar
          size="lg"
          className="w-full sm:w-auto"
          item={{
            id: `vino-${vino.slug}-${presentacion}`,
            slug: vino.slug,
            nombre: `${vino.nombre} ${vino.varietal}`,
            detalle: esCaja
              ? `Caja x${BOTELLAS_POR_CAJA} · ${vino.anio}`
              : `Botella · ${vino.anio}`,
            imagen,
            precio,
            tipo: "vino",
            presentacion,
          }}
        />

        <dl className="divide-border/70 flex flex-col divide-y border-t pt-2">
          <div className="flex flex-col gap-1 py-3">
            <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
              Notas de cata
            </dt>
            <dd className="text-sm leading-relaxed">{vino.notas}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3">
            <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
              Maridaje
            </dt>
            <dd className="text-sm leading-relaxed">{vino.maridaje}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3">
            <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
              Graduación
            </dt>
            <dd className="text-sm leading-relaxed">{vino.graduacion}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

type OpcionProps = {
  activa: boolean
  onClick: () => void
  titulo: string
  detalle: string
  precio: string
  etiqueta?: string
}

function OpcionPresentacion({
  activa,
  onClick,
  titulo,
  detalle,
  precio,
  etiqueta,
}: OpcionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className={`focus-visible:ring-ring/40 relative flex flex-col gap-0.5 rounded-sm border p-3 text-left transition-colors outline-none focus-visible:ring-[3px] ${
        activa
          ? "border-foreground/60 bg-muted/50"
          : "border-border/70 hover:border-foreground/30"
      }`}
    >
      {etiqueta && (
        <span className="bg-marca absolute top-2 right-2 rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium text-white">
          {etiqueta}
        </span>
      )}
      <span className="text-sm font-medium">{titulo}</span>
      <span className="text-muted-foreground text-xs">{detalle}</span>
      <span className="mt-1 text-sm font-semibold">{precio}</span>
    </button>
  )
}
