"use client"

import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { formatCurrency } from "@/lib/format-currency"
import { Button } from "@/shared/components/ui/button"

import { useCarrito } from "../CarritoProvider"

export function DetalleCarrito() {
  const { items, subtotal, cantidadTotal, cambiarCantidad, quitar, vaciar, listo } =
    useCarrito()

  if (!listo) {
    return (
      <p className="text-muted-foreground py-16 text-center text-sm">
        Cargando tu carrito…
      </p>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted-foreground text-sm">
          Todavía no agregaste nada al carrito.
        </p>
        <Button asChild>
          <Link href="/productos">Ver los vinos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
      <ul className="divide-border/70 flex flex-col divide-y border-y">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-4">
            <div className="border-border/70 relative size-20 shrink-0 overflow-hidden rounded-sm border bg-white">
              <Image
                src={item.imagen}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.nombre}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.detalle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => quitar(item.id)}
                  aria-label={`Quitar ${item.nombre}`}
                  className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <div className="border-border/70 flex items-center gap-1 rounded-full border">
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    aria-label="Quitar uno"
                    className="hover:text-marca flex size-7 items-center justify-center transition-colors"
                  >
                    <Minus aria-hidden className="size-3" />
                  </button>
                  <span className="min-w-6 text-center text-sm tabular-nums">
                    {item.cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                    aria-label="Agregar uno"
                    className="hover:text-marca flex size-7 items-center justify-center transition-colors"
                  >
                    <Plus aria-hidden className="size-3" />
                  </button>
                </div>

                <span className="text-sm font-semibold tabular-nums">
                  {formatCurrency(item.precio * item.cantidad)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="flex h-fit flex-col gap-4 lg:sticky lg:top-24">
        <div className="border-border/70 flex flex-col gap-3 rounded-sm border p-5">
          <p className="text-sm font-medium">Resumen</p>

          <div className="text-muted-foreground flex justify-between text-sm">
            <span>
              {cantidadTotal} {cantidadTotal === 1 ? "producto" : "productos"}
            </span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </div>

          <div className="text-muted-foreground flex justify-between text-sm">
            <span>Envío</span>
            <span>Se calcula al pagar</span>
          </div>

          <div className="border-border/70 mt-1 flex items-baseline justify-between border-t pt-3">
            <span className="text-sm font-medium">Total</span>
            <span className="text-xl font-semibold tabular-nums">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <Button size="lg" className="mt-2 w-full">
            Finalizar compra
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            El total definitivo se confirma en el checkout.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/productos"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Seguir comprando
          </Link>
          <button
            type="button"
            onClick={vaciar}
            className="text-muted-foreground hover:text-destructive text-sm transition-colors"
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  )
}
