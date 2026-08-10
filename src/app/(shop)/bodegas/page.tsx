import { type Metadata } from "next"
import Link from "next/link"

import { getBodegas } from "@/features/bodegas/queries"
import { getVinosByBodega } from "@/features/catalogo/queries"

export const metadata: Metadata = {
  title: "Bodegas",
  description:
    "Las bodegas con las que trabajamos: productores de Mendoza, Salta y la costa atlántica.",
}

export default async function BodegasPage() {
  const bodegas = await getBodegas()

  // Cuántos vinos tiene cada bodega en el catálogo, para mostrarlo en la tarjeta.
  const conConteo = await Promise.all(
    bodegas.map(async (bodega) => ({
      bodega,
      cantidad: (await getVinosByBodega(bodega.nombre)).length,
    }))
  )

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-8 flex max-w-2xl flex-col gap-2">
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
          Nuestros productores
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Bodegas con las que trabajamos
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          No producimos vino: lo seleccionamos. Estas son las bodegas cuyas
          etiquetas elegimos, visitamos y sostenemos en el catálogo.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {conConteo.map(({ bodega, cantidad }) => (
          <li key={bodega.slug}>
            <Link
              href={`/bodegas/${bodega.slug}`}
              className="border-border/70 hover:border-foreground/30 flex h-full flex-col gap-3 rounded-sm border p-5 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium tracking-tight">
                  {bodega.nombre}
                </h2>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  {bodega.region}
                </p>
              </div>

              <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                {bodega.resumen}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {bodega.especialidades.map((esp) => (
                  <span
                    key={esp}
                    className="bg-muted rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
                  >
                    {esp}
                  </span>
                ))}
              </div>

              <p className="border-border/70 text-muted-foreground border-t pt-3 font-mono text-xs">
                Desde {bodega.fundacion} · {cantidad}{" "}
                {cantidad === 1 ? "vino" : "vinos"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
