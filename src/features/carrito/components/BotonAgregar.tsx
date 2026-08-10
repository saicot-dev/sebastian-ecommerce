"use client"

import { Button } from "@/shared/components/ui/button"

import { ControlCantidad } from "./ControlCantidad"
import { useCarrito } from "../CarritoProvider"
import { type ItemCarrito } from "../types"

type BotonAgregarProps = {
  item: Omit<ItemCarrito, "cantidad">
  className?: string
  size?: "sm" | "lg"
  children?: React.ReactNode
}

export function BotonAgregar({
  item,
  className,
  size = "sm",
  children = "Agregar al carrito",
}: BotonAgregarProps) {
  const { agregar, items, listo } = useCarrito()

  const enCarrito = items.find((i) => i.id === item.id)

  function handleClick(event: React.MouseEvent) {
    // La tarjeta entera suele ser un link: no navegar al agregar.
    event.preventDefault()
    event.stopPropagation()
    agregar(item)
  }

  // Ya está en el carrito: sumar y restar sin salir de la tarjeta.
  if (listo && enCarrito) {
    return (
      <ControlCantidad
        id={item.id}
        cantidad={enCarrito.cantidad}
        className={className}
      />
    )
  }

  return (
    <Button type="button" size={size} onClick={handleClick} className={className}>
      {children}
    </Button>
  )
}
