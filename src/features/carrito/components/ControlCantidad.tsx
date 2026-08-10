"use client"

import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

import { useCarrito } from "../CarritoProvider"

type ControlCantidadProps = {
  id: string
  cantidad: number
  className?: string
}

/**
 * Sumar y restar sin entrar al carrito. Al llegar a 0 el ítem se quita
 * y el contenedor vuelve a mostrar el botón "Agregar".
 */
export function ControlCantidad({
  id,
  cantidad,
  className,
}: ControlCantidadProps) {
  const { cambiarCantidad } = useCarrito()

  return (
    <div
      className={cn(
        "border-border/70 flex h-9 items-center justify-between rounded-md border px-1",
        className
      )}
    >
      <button
        type="button"
        onClick={() => cambiarCantidad(id, cantidad - 1)}
        aria-label={cantidad === 1 ? "Quitar del carrito" : "Restar uno"}
        className="hover:text-marca flex size-7 items-center justify-center rounded transition-colors"
      >
        <Minus aria-hidden className="size-3.5" />
      </button>

      <span
        aria-live="polite"
        className="min-w-8 text-center text-sm font-medium tabular-nums"
      >
        {cantidad}
      </span>

      <button
        type="button"
        onClick={() => cambiarCantidad(id, cantidad + 1)}
        aria-label="Sumar uno"
        className="hover:text-marca flex size-7 items-center justify-center rounded transition-colors"
      >
        <Plus aria-hidden className="size-3.5" />
      </button>
    </div>
  )
}
