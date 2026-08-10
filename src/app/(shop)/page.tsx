import { type Metadata } from "next"

import { SeccionAccesorios } from "@/features/accesorios/components/SeccionAccesorios"
import { Hero } from "@/features/home/components/Hero"
import {
  Destacados,
  MasVendidos,
  Ofertas,
} from "@/features/home/components/SeccionesCatalogo"
import { TiposDeVino } from "@/features/home/components/TiposDeVino"

export const metadata: Metadata = {
  // `absolute` evita que el template del layout raíz duplique la marca.
  title: { absolute: "Sebastian Wines — Tienda de vinos online" },
  description:
    "Tintos, blancos, rosados y espumantes seleccionados. Comprá vino online con envío a todo el país.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TiposDeVino />
      <MasVendidos />
      <Ofertas />
      <Destacados />
      <SeccionAccesorios />
    </>
  )
}
