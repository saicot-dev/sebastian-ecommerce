import { AdminProvider } from "@/features/admin/AdminProvider"
import { CarritoProvider } from "@/features/carrito/CarritoProvider"
import { PantallaDeCarga } from "@/shared/components/layout/PantallaDeCarga"
import { SiteFooter } from "@/shared/components/layout/SiteFooter"
import { SiteHeader } from "@/shared/components/layout/SiteHeader"

export default function ShopLayout({ children }: LayoutProps<"/">) {
  return (
    // `AdminProvider` también acá: es lo que hace que los cambios del panel se
    // vean en la tienda mientras no haya base de datos.
    <AdminProvider>
      <CarritoProvider>
        <PantallaDeCarga />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </CarritoProvider>
    </AdminProvider>
  )
}
