"use client"

import Image from "next/image"

import { useAdmin } from "@/features/admin/AdminProvider"

/**
 * Isla Client mínima dentro del Hero, que sigue siendo Server: solo existe para
 * que el panel de admin pueda cambiar la foto en modo demo. Mantiene `priority`
 * porque es la imagen que abre la página.
 */
export function ImagenHero() {
  const { estado, listo } = useAdmin()
  const src = listo ? (estado.sitio.hero ?? "/hero-vino.png") : "/hero-vino.png"

  return (
    <Image
      src={src}
      alt="Botella y copa de vino tinto de Sebastian Wines junto a un racimo de uvas"
      width={1385}
      height={768}
      priority
      sizes="(min-width: 1250px) 1202px, 100vw"
      className="h-auto w-full"
    />
  )
}
