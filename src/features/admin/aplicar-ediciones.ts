import { type Accesorio } from "@/features/accesorios/types"
import { type Vino } from "@/features/catalogo/types"

import { type EstadoAdmin } from "./types"

/**
 * Aplica los cambios del panel sobre los datos del mock.
 *
 * `precioAnterior: null` significa "el admin sacó la oferta"; `undefined`,
 * "no tocó el campo". Sin esa distinción no habría forma de quitar una oferta.
 */
export function aplicarEdicionVino(vino: Vino, estado: EstadoAdmin): Vino {
  const edicion = estado.vinos[vino.id]
  if (!edicion) return vino

  const { precioAnterior, ...resto } = edicion
  const fusionado: Vino = { ...vino, ...resto }

  if (precioAnterior === null) {
    delete fusionado.precioAnterior
  } else if (precioAnterior !== undefined) {
    fusionado.precioAnterior = precioAnterior
  }

  return fusionado
}

export function aplicarEdicionAccesorio(
  accesorio: Accesorio,
  estado: EstadoAdmin
): Accesorio {
  const edicion = estado.accesorios[accesorio.id]
  if (!edicion) return accesorio

  const { precioAnterior, ...resto } = edicion
  const fusionado: Accesorio = { ...accesorio, ...resto }

  if (precioAnterior === null) {
    delete fusionado.precioAnterior
  } else if (precioAnterior !== undefined) {
    fusionado.precioAnterior = precioAnterior
  }

  return fusionado
}
