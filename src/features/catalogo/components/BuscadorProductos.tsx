"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"

type BuscadorProductosProps = {
  className?: string
}

/**
 * Buscador del catálogo. Navega a /productos?q=... — la búsqueda real
 * la resuelve esa página cuando exista el catálogo.
 */
export function BuscadorProductos({ className }: BuscadorProductosProps) {
  const router = useRouter()
  const [termino, setTermino] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const limpio = termino.trim()
    if (!limpio) return
    router.push(`/productos?q=${encodeURIComponent(limpio)}`)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("group relative w-full", className)}
    >
      <label htmlFor="buscador-productos" className="sr-only">
        Buscar vinos
      </label>

      <Search
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
      />

      <input
        id="buscador-productos"
        type="search"
        value={termino}
        onChange={(event) => setTermino(event.target.value)}
        placeholder="Buscar un varietal, una línea, una cosecha"
        className="border-border/70 placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-ring/40 h-10 w-full rounded-full border bg-transparent pr-4 pl-10 text-sm transition-colors outline-none focus-visible:ring-[3px] [&::-webkit-search-cancel-button]:appearance-none"
      />
    </form>
  )
}
