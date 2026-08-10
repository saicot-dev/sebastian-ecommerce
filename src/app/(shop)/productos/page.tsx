import { type Metadata } from "next"

import { getBodegas } from "@/features/bodegas/queries"
import { FiltrarPorBodega } from "@/features/catalogo/components/FiltrarPorBodega"
import { GrillaVinos } from "@/features/catalogo/components/GrillaVinos"
import { OrdenarVinos } from "@/features/catalogo/components/OrdenarVinos"
import { buscarVinos } from "@/features/catalogo/queries"
import { parseOrden, type TipoDeVino } from "@/features/catalogo/types"

export const metadata: Metadata = {
  title: "Todos los vinos",
  description:
    "Catálogo completo: tintos, blancos, rosados y espumantes de Sebastian Wines.",
}

const TIPOS_VALIDOS = ["tinto", "blanco", "rosado", "espumante"] as const

function parseTipo(valor: string | undefined): TipoDeVino | undefined {
  return TIPOS_VALIDOS.find((t) => t === valor)
}

export default async function ProductosPage({
  searchParams,
}: PageProps<"/productos">) {
  // En Next 16 `searchParams` es una Promise.
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const tipo = parseTipo(
    typeof params.tipo === "string" ? params.tipo : undefined
  )
  const orden = parseOrden(
    typeof params.orden === "string" ? params.orden : undefined
  )

  const bodegas = await getBodegas()
  // Solo aceptamos una bodega que exista: si no, el filtro devolvería vacío
  // ante cualquier valor inventado en la URL.
  const bodegaParam = typeof params.bodega === "string" ? params.bodega : undefined
  const bodega = bodegas.find((b) => b.nombre === bodegaParam)?.nombre

  const vinos = await buscarVinos({ q, tipo, orden, bodega })

  const titulo = bodega
    ? bodega
    : tipo
      ? `Vinos ${tipo}s`
      : q
        ? `Resultados para "${q}"`
        : "Todos los vinos"

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-6 flex flex-col gap-1">
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
          Catálogo
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {titulo}
        </h1>
      </div>

      <div className="border-border/70 mb-6 flex flex-wrap items-center justify-between gap-3 border-y py-3">
        <p className="text-muted-foreground text-sm">
          {vinos.length} {vinos.length === 1 ? "vino" : "vinos"}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <FiltrarPorBodega bodegas={bodegas.map((b) => b.nombre)} />
          <OrdenarVinos />
        </div>
      </div>

      {vinos.length > 0 ? (
        <GrillaVinos vinos={vinos} />
      ) : (
        <p className="text-muted-foreground py-16 text-center text-sm">
          No encontramos vinos con esa búsqueda. Probá con otro varietal o
          bodega.
        </p>
      )}
    </div>
  )
}
