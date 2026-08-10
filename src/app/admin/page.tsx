import { type Metadata } from "next"

import { getAccesorios } from "@/features/accesorios/queries"
import { PanelAdmin } from "@/features/admin/components/PanelAdmin"
import { getBodegas } from "@/features/bodegas/queries"
import { getVinos } from "@/features/catalogo/queries"

export const metadata: Metadata = {
  title: { absolute: "Administración | Sebastian Wines" },
  // No queremos esta página en Google mientras no tenga login.
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const [vinos, accesorios, bodegas] = await Promise.all([
    getVinos(),
    getAccesorios(),
    getBodegas(),
  ])

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-8 flex flex-col gap-1">
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
          Panel
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Administrar la tienda
        </h1>
      </div>

      <PanelAdmin vinos={vinos} accesorios={accesorios} bodegas={bodegas} />
    </div>
  )
}
