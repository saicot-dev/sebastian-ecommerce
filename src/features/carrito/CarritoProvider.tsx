"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { type ItemCarrito } from "./types"

const CLAVE_STORAGE = "sebastian-carrito"

type CarritoContexto = {
  items: ItemCarrito[]
  cantidadTotal: number
  subtotal: number
  agregar: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void
  quitar: (id: string) => void
  cambiarCantidad: (id: string, cantidad: number) => void
  vaciar: () => void
  /** `false` hasta leer `localStorage`: evita parpadeo del contador. */
  listo: boolean
}

const Contexto = createContext<CarritoContexto | null>(null)

function leerStorage(): ItemCarrito[] {
  try {
    const crudo = localStorage.getItem(CLAVE_STORAGE)
    if (!crudo) return []
    const parsed: unknown = JSON.parse(crudo)
    return Array.isArray(parsed) ? (parsed as ItemCarrito[]) : []
  } catch {
    // Storage corrupto o deshabilitado: arrancar vacío.
    return []
  }
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([])
  const [listo, setListo] = useState(false)

  // Se lee después de montar: en el server no hay localStorage.
  // Fuera del cuerpo del efecto para no encadenar renders.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setItems(leerStorage())
      setListo(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!listo) return
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items))
    } catch {
      // Sin storage disponible el carrito igual funciona en memoria.
    }
  }, [items, listo])

  const agregar = useCallback(
    (item: Omit<ItemCarrito, "cantidad">, cantidad = 1) => {
      setItems((previos) => {
        const existente = previos.find((i) => i.id === item.id)
        if (existente) {
          return previos.map((i) =>
            i.id === item.id ? { ...i, cantidad: i.cantidad + cantidad } : i
          )
        }
        return [...previos, { ...item, cantidad }]
      })
    },
    []
  )

  const quitar = useCallback((id: string) => {
    setItems((previos) => previos.filter((i) => i.id !== id))
  }, [])

  const cambiarCantidad = useCallback((id: string, cantidad: number) => {
    setItems((previos) =>
      cantidad <= 0
        ? previos.filter((i) => i.id !== id)
        : previos.map((i) => (i.id === id ? { ...i, cantidad } : i))
    )
  }, [])

  const vaciar = useCallback(() => setItems([]), [])

  const valor = useMemo<CarritoContexto>(
    () => ({
      items,
      cantidadTotal: items.reduce((n, i) => n + i.cantidad, 0),
      subtotal: items.reduce((n, i) => n + i.precio * i.cantidad, 0),
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
      listo,
    }),
    [items, agregar, quitar, cambiarCantidad, vaciar, listo]
  )

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export function useCarrito(): CarritoContexto {
  const ctx = useContext(Contexto)
  if (!ctx) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>")
  }
  return ctx
}
