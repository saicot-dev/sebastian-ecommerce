import Link from "next/link"

import { AdminProvider } from "@/features/admin/AdminProvider"
import { Logo } from "@/shared/components/layout/Logo"

/**
 * Layout del panel. Fuera del grupo `(shop)` a propósito: sin header de tienda,
 * sin carrito y sin pantalla de bienvenida.
 *
 * PENDIENTE al conectar Supabase: proteger este layout verificando el rol con
 * `getUser()` en el DAL (nunca `getSession()`, y nunca desde `proxy.ts`, que es
 * solo para redirects de UX). Hoy la ruta es pública.
 */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminProvider>
      <header className="bg-background sticky top-0 z-50 border-b">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center">
              <Logo className="h-9" priority />
            </Link>
            <span className="border-border/70 text-muted-foreground border-l pl-3 text-sm font-medium">
              Administración
            </span>
          </div>

          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Ver la tienda →
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </AdminProvider>
  )
}
