import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getBodegaByNombre } from "@/features/bodegas/queries"
import { SelectorPresentacion } from "@/features/catalogo/components/SelectorPresentacion"
import { getVinoBySlug } from "@/features/catalogo/queries"

export async function generateMetadata({
  params,
}: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const vino = await getVinoBySlug(slug)
  if (!vino) return { title: "Vino no encontrado" }

  return {
    title: `${vino.nombre} ${vino.varietal} ${vino.anio}`,
    description: vino.notas,
  }
}

export default async function VinoPage({
  params,
}: PageProps<"/productos/[slug]">) {
  const { slug } = await params
  const vino = await getVinoBySlug(slug)

  if (!vino) notFound()

  const bodega = await getBodegaByNombre(vino.bodega)

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link
        href="/productos"
        className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm transition-colors"
      >
        ← Volver al catálogo
      </Link>

      <SelectorPresentacion vino={vino} bodegaSlug={bodega?.slug} />
    </div>
  )
}
