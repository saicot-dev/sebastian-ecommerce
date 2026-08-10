"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { ORDENES } from "../types"

/**
 * Selector de orden del catálogo. Escribe `?orden=` en la URL conservando
 * los filtros activos (`tipo`, `q`), así el orden es enlazable y compartible.
 */
export function OrdenarVinos() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const actual = searchParams.get("orden") ?? ""

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    const valor = event.target.value

    if (valor) {
      params.set("orden", valor)
    } else {
      params.delete("orden")
    }

    router.push(`/productos?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="orden-catalogo"
        className="text-muted-foreground text-xs whitespace-nowrap"
      >
        Ordenar por
      </label>
      <select
        id="orden-catalogo"
        value={actual}
        onChange={handleChange}
        className="border-border/70 focus-visible:border-foreground/40 focus-visible:ring-ring/40 h-9 rounded-full border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]"
      >
        <option value="">Recomendados</option>
        {ORDENES.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
