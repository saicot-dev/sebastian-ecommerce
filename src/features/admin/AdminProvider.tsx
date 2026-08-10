"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  ESTADO_ADMIN_VACIO,
  type EdicionAccesorio,
  type EdicionBodega,
  type EdicionSitio,
  type EdicionVino,
  type EstadoAdmin,
} from "./types"

const CLAVE_STORAGE = "sebastian-admin"

/**
 * Estado del panel de administración en MODO DEMO.
 *
 * Los cambios viven en `localStorage`, no en una base de datos: son visibles
 * solo en este navegador y se pierden al limpiar el almacenamiento. Al conectar
 * Supabase, este provider se reemplaza por Server Actions que escriben en las
 * tablas reales, y los componentes que lo consumen cambian de hook a props.
 */
type AdminContextValor = {
  estado: EstadoAdmin
  /** `false` hasta leer `localStorage`: evita desajuste de hidratación. */
  listo: boolean
  editarVino: (id: string, cambios: EdicionVino) => void
  editarAccesorio: (id: string, cambios: EdicionAccesorio) => void
  editarBodega: (id: string, cambios: EdicionBodega) => void
  editarSitio: (cambios: EdicionSitio) => void
  restablecerTodo: () => void
  /** Cantidad de elementos con cambios sin publicar. */
  cantidadCambios: number
}

const AdminContext = createContext<AdminContextValor | null>(null)

function leerStorage(): EstadoAdmin {
  if (typeof window === "undefined") return ESTADO_ADMIN_VACIO

  try {
    const crudo = window.localStorage.getItem(CLAVE_STORAGE)
    if (!crudo) return ESTADO_ADMIN_VACIO

    const parseado = JSON.parse(crudo) as Partial<EstadoAdmin>
    return {
      vinos: parseado.vinos ?? {},
      accesorios: parseado.accesorios ?? {},
      bodegas: parseado.bodegas ?? {},
      sitio: parseado.sitio ?? {},
    }
  } catch {
    // JSON corrupto: arrancamos limpio en vez de romper la página.
    return ESTADO_ADMIN_VACIO
  }
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoAdmin>(ESTADO_ADMIN_VACIO)
  const [listo, setListo] = useState(false)

  // Igual que el carrito: la lectura va en un frame aparte para no llamar a
  // setState durante el efecto de montaje.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setEstado(leerStorage())
      setListo(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!listo) return
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado))
  }, [estado, listo])

  const editarVino = useCallback((id: string, cambios: EdicionVino) => {
    setEstado((prev) => ({
      ...prev,
      vinos: { ...prev.vinos, [id]: { ...prev.vinos[id], ...cambios } },
    }))
  }, [])

  const editarAccesorio = useCallback(
    (id: string, cambios: EdicionAccesorio) => {
      setEstado((prev) => ({
        ...prev,
        accesorios: {
          ...prev.accesorios,
          [id]: { ...prev.accesorios[id], ...cambios },
        },
      }))
    },
    []
  )

  const editarBodega = useCallback((id: string, cambios: EdicionBodega) => {
    setEstado((prev) => ({
      ...prev,
      bodegas: { ...prev.bodegas, [id]: { ...prev.bodegas[id], ...cambios } },
    }))
  }, [])

  const editarSitio = useCallback((cambios: EdicionSitio) => {
    setEstado((prev) => ({ ...prev, sitio: { ...prev.sitio, ...cambios } }))
  }, [])

  const restablecerTodo = useCallback(() => {
    setEstado(ESTADO_ADMIN_VACIO)
  }, [])

  const cantidadCambios =
    Object.keys(estado.vinos).length +
    Object.keys(estado.accesorios).length +
    Object.keys(estado.bodegas).length +
    Object.keys(estado.sitio).length

  return (
    <AdminContext.Provider
      value={{
        estado,
        listo,
        editarVino,
        editarAccesorio,
        editarBodega,
        editarSitio,
        restablecerTodo,
        cantidadCambios,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin(): AdminContextValor {
  const contexto = useContext(AdminContext)
  if (!contexto) {
    throw new Error("useAdmin debe usarse dentro de <AdminProvider>")
  }
  return contexto
}
