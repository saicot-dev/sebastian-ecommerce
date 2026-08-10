import { type Metadata } from "next"

import { SeccionAccesorios } from "@/features/accesorios/components/SeccionAccesorios"
import { DetalleCarrito } from "@/features/carrito/components/DetalleCarrito"

export const metadata: Metadata = {
  title: "Tu carrito",
  description: "Revisá los vinos y accesorios que agregaste antes de comprar.",
}

export default function CarritoPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
        <div className="mb-6 flex flex-col gap-1">
          <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
            Tu pedido
          </p>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Carrito
          </h1>
        </div>

        <DetalleCarrito />
      </div>

      {/* Venta cruzada: último empujón antes del checkout. */}
      <div className="border-t">
        <SeccionAccesorios
          titulo="Sumá un accesorio"
          eyebrow="También te puede servir"
          sinBorde
        />
      </div>
    </>
  )
}
