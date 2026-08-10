import { VinoCard } from "./VinoCard"
import { type Vino } from "../types"

type GrillaVinosProps = {
  vinos: readonly Vino[]
  /** Columnas en desktop. Por defecto 4. */
  columnas?: 3 | 4
}

const CLASES_COLUMNAS = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function GrillaVinos({ vinos, columnas = 4 }: GrillaVinosProps) {
  return (
    <ul className={`grid grid-cols-2 gap-4 ${CLASES_COLUMNAS[columnas]}`}>
      {vinos.map((vino) => (
        <li key={vino.id}>
          <VinoCard vino={vino} />
        </li>
      ))}
    </ul>
  )
}
