"use client"

import Image from "next/image"

import { useAdmin } from "@/features/admin/AdminProvider"
import { type EdicionSitio } from "@/features/admin/types"

/** Isla Client mínima: solo para que el panel pueda cambiar la foto en demo. */
export function ImagenTipo({
  clave,
  pordefecto,
}: {
  clave: keyof EdicionSitio
  pordefecto: string
}) {
  const { estado, listo } = useAdmin()
  const src = listo ? (estado.sitio[clave] ?? pordefecto) : pordefecto

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(min-width: 1200px) 270px, (min-width: 1024px) 25vw, 45vw"
      className="object-contain"
    />
  )
}
