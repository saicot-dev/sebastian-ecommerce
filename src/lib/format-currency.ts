const FORMATEADOR_ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
})

/**
 * Formato único de moneda del sistema. Todo precio mostrado en la UI pasa por acá.
 */
export function formatCurrency(monto: number): string {
  return FORMATEADOR_ARS.format(monto)
}
