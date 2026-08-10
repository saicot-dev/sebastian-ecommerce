import { ACCESORIOS_MOCK } from "./mock-data"
import { type Accesorio } from "./types"

/** DAL de accesorios. Hoy lee de `mock-data.ts` (modo demo). */

export async function getAccesorios(): Promise<Accesorio[]> {
  return [...ACCESORIOS_MOCK]
}

export async function getAccesoriosDestacados(
  limite = 4
): Promise<Accesorio[]> {
  return ACCESORIOS_MOCK.slice(0, limite)
}
