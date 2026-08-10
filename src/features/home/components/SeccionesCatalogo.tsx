import { GrillaVinos } from "@/features/catalogo/components/GrillaVinos"
import {
  getVinosDestacados,
  getVinosEnOferta,
  getVinosMasVendidos,
} from "@/features/catalogo/queries"

import { EncabezadoSeccion } from "./EncabezadoSeccion"

/** Ancho común de las secciones de contenido de la home. */
const CONTENEDOR = "mx-auto w-full max-w-[1200px] px-4 lg:px-6"

export async function MasVendidos() {
  const vinos = await getVinosMasVendidos(8)

  return (
    <section className="border-b">
      <div className={`${CONTENEDOR} py-10 lg:py-14`}>
        <EncabezadoSeccion
          eyebrow="Lo que más sale"
          titulo="Vinos más vendidos"
          href="/productos"
        />
        <GrillaVinos vinos={vinos} />
      </div>
    </section>
  )
}

export async function Ofertas() {
  const vinos = await getVinosEnOferta(4)

  return (
    <section className="bg-muted/40 border-b">
      <div className={`${CONTENEDOR} py-10 lg:py-14`}>
        <EncabezadoSeccion
          eyebrow="Por tiempo limitado"
          titulo="Ofertas"
          href="/productos?oferta=1"
          hrefLabel="Ver todas"
        />
        <GrillaVinos vinos={vinos} />
      </div>
    </section>
  )
}

export async function Destacados() {
  const vinos = await getVinosDestacados(4)

  return (
    <section className="border-b">
      <div className={`${CONTENEDOR} py-10 lg:py-14`}>
        <EncabezadoSeccion
          eyebrow="Nuestra selección"
          titulo="Vinos destacados"
          href="/productos"
        />
        <GrillaVinos vinos={vinos} />
      </div>
    </section>
  )
}
