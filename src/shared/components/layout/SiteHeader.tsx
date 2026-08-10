import Link from "next/link"

import { DialogoRegistro } from "@/features/auth/components/DialogoRegistro"
import { MenuBodegas } from "@/features/bodegas/components/MenuBodegas"
import { getBodegas } from "@/features/bodegas/queries"
import { BotonCarrito } from "@/features/carrito/components/BotonCarrito"
import { BuscadorProductos } from "@/features/catalogo/components/BuscadorProductos"

import { Logo } from "./Logo"

const NAV_LINKS = [
  { href: "/productos?tipo=tinto", label: "Tinto" },
  { href: "/productos?tipo=blanco", label: "Blanco" },
  { href: "/productos?tipo=espumante", label: "Espumante" },
  { href: "/productos?tipo=rosado", label: "Rosado" },
  { href: "/accesorios", label: "Accesorios" },
  { href: "/contacto", label: "Contacto" },
] as const

export async function SiteHeader() {
  const bodegas = await getBodegas()

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 lg:h-20 lg:gap-10">
        <Link href="/" className="flex items-center">
          <Logo className="h-11 lg:h-14" priority />
        </Link>

        <div className="flex justify-center">
          <BuscadorProductos className="hidden max-w-md sm:block" />
        </div>

        <div className="flex items-center gap-6 lg:gap-8">
          <nav aria-label="Principal" className="hidden items-center gap-5 xl:flex">
            <MenuBodegas bodegas={bodegas} />

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <DialogoRegistro />
          </div>

          <BotonCarrito />
        </div>
      </div>
    </header>
  )
}
