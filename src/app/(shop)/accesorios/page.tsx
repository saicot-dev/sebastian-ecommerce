import { type Metadata } from "next"

import { AccesorioCard } from "@/features/accesorios/components/AccesorioCard"
import { getAccesorios } from "@/features/accesorios/queries"

export const metadata: Metadata = {
  title: "Accesorios",
  description:
    "Sacacorchos, oxigenadores, tapones, decantadores y copas para servir mejor tu vino.",
}

export default async function AccesoriosPage() {
  const accesorios = await getAccesorios()

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-6 flex flex-col gap-1">
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
          Accesorios
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Para tomarlo mejor
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {accesorios.length} productos
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {accesorios.map((accesorio) => (
          <li key={accesorio.id}>
            <AccesorioCard accesorio={accesorio} />
          </li>
        ))}
      </ul>
    </div>
  )
}
