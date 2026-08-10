import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getBodegaBySlug, getBodegas } from "@/features/bodegas/queries"
import { GrillaVinos } from "@/features/catalogo/components/GrillaVinos"
import { getVinosByBodega } from "@/features/catalogo/queries"

export async function generateStaticParams() {
  const bodegas = await getBodegas()
  return bodegas.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/bodegas/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const bodega = await getBodegaBySlug(slug)
  if (!bodega) return { title: "Bodega no encontrada" }

  return { title: bodega.nombre, description: bodega.resumen }
}

export default async function BodegaPage({
  params,
}: PageProps<"/bodegas/[slug]">) {
  const { slug } = await params
  const bodega = await getBodegaBySlug(slug)

  if (!bodega) notFound()

  const vinos = await getVinosByBodega(bodega.nombre)

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link
        href="/bodegas"
        className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
      >
        ← Volver a bodegas
      </Link>

      <header className="border-border/70 mb-10 flex flex-col gap-4 border-b pb-8">
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
            {bodega.region}
          </p>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {bodega.nombre}
          </h1>
        </div>

        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {bodega.descripcion}
        </p>

        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
              Desde
            </dt>
            <dd className="font-mono text-sm">{bodega.fundacion}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
              Especialidades
            </dt>
            <dd className="text-sm">{bodega.especialidades.join(" · ")}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
              En catálogo
            </dt>
            <dd className="font-mono text-sm">
              {vinos.length} {vinos.length === 1 ? "vino" : "vinos"}
            </dd>
          </div>
        </dl>
      </header>

      <h2 className="mb-6 text-2xl font-medium tracking-tight">
        Vinos de {bodega.nombre}
      </h2>

      {vinos.length > 0 ? (
        <GrillaVinos vinos={vinos} />
      ) : (
        <p className="text-muted-foreground py-16 text-center text-sm">
          Todavía no tenemos vinos de esta bodega en el catálogo.
        </p>
      )}
    </div>
  )
}
