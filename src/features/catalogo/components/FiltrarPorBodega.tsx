"use client"

import { useRouter, useSearchParams } from "next/navigation"

/**
 * Filtro por bodega del catálogo. Igual que `OrdenarVinos`: escribe `?bodega=`
 * conservando los demás parámetros, así el filtro se combina y el link se comparte.
 */
export function FiltrarPorBodega({ bodegas }: { bodegas: readonly string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const actual = searchParams.get("bodega") ?? ""

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    const valor = event.target.value

    if (valor) {
      params.set("bodega", valor)
    } else {
      params.delete("bodega")
    }

    router.push(`/productos?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="filtro-bodega"
        className="text-muted-foreground text-xs whitespace-nowrap"
      >
        Bodega
      </label>
      <select
        id="filtro-bodega"
        value={actual}
        onChange={handleChange}
        className="border-border/70 focus-visible:border-foreground/40 focus-visible:ring-ring/40 h-9 rounded-full border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]"
      >
        <option value="">Todas</option>
        {bodegas.map((nombre) => (
          <option key={nombre} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>
    </div>
  )
}
