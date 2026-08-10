import { EncabezadoSeccion } from "@/features/home/components/EncabezadoSeccion"

import { AccesorioCard } from "./AccesorioCard"
import { getAccesoriosDestacados } from "../queries"

type SeccionAccesoriosProps = {
  limite?: number
  titulo?: string
  eyebrow?: string
  /** `true` cuando va dentro de otra página que ya tiene su contenedor. */
  sinBorde?: boolean
}

export async function SeccionAccesorios({
  limite = 4,
  titulo = "Para tomarlo mejor",
  eyebrow = "Accesorios",
  sinBorde = false,
}: SeccionAccesoriosProps) {
  const accesorios = await getAccesoriosDestacados(limite)

  return (
    <section className={sinBorde ? "" : "border-b"}>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
        <EncabezadoSeccion
          eyebrow={eyebrow}
          titulo={titulo}
          href="/accesorios"
        />

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {accesorios.map((accesorio) => (
            <li key={accesorio.id}>
              <AccesorioCard accesorio={accesorio} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
