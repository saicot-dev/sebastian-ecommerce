"use client"

import { ShoppingBag } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { useCarrito } from "../CarritoProvider"

/** Botella dibujada: aparece en lugar de la bolsa cuando hay algo en el carrito. */
function IconoBotella({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M10 2h4v1.5h-4z" />
      <path d="M10.2 4.5h3.6v2.2c0 .9.4 1.4 1 2.1.8.9 1.2 1.8 1.2 3V20a2 2 0 01-2 2h-4a2 2 0 01-2-2v-8.2c0-1.2.4-2.1 1.2-3 .6-.7 1-1.2 1-2.1z" />
    </svg>
  )
}

export function BotonCarrito({ className }: { className?: string }) {
  const { cantidadTotal, listo } = useCarrito()
  const conItems = listo && cantidadTotal > 0

  return (
    <Link
      href="/carrito"
      aria-label={
        conItems
          ? `Ver el carrito, ${cantidadTotal} ${cantidadTotal === 1 ? "producto" : "productos"}`
          : "Ver el carrito"
      }
      className={cn(
        "border-border/70 hover:border-foreground/40 focus-visible:border-foreground/40 focus-visible:ring-ring/40 relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors outline-none focus-visible:ring-[3px]",
        conItems && "border-marca/40 text-marca",
        className
      )}
    >
      {conItems ? (
        <IconoBotella className="size-4" />
      ) : (
        <ShoppingBag aria-hidden className="size-4" />
      )}

      {conItems && (
        <span className="bg-marca absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full px-1 text-[0.6rem] leading-none font-medium text-white">
          {cantidadTotal}
        </span>
      )}
    </Link>
  )
}
