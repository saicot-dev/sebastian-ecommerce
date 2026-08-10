import Image from "next/image"

import { cn } from "@/lib/utils"

type LogoProps = {
  /** Alto del logo en clases de Tailwind, ej. "h-8". */
  className?: string
  /** `true` solo en el logo del header, que es visible al cargar. */
  priority?: boolean
}

/**
 * Marca de la tienda. El alto lo fija `className`; el ancho sale solo de la
 * proporción del archivo (960x473).
 *
 * No agregar `style={{ aspectRatio }}`: con `h-*` + `w-auto` compite con el
 * cálculo natural de `next/image` y deforma el logo.
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo-sebastian.png"
      alt="Sebastian Wines"
      width={960}
      height={473}
      priority={priority}
      className={cn("h-8 w-auto object-contain", className)}
    />
  )
}
