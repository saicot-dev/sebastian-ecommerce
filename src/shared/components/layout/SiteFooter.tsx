import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { FormularioNewsletter } from "@/features/auth/components/FormularioNewsletter"

import { Logo } from "./Logo"

const ANIO_ACTUAL = 2026

/**
 * Logos de Instagram y Facebook dibujados a mano: lucide-react ya no incluye
 * íconos de marcas, y no vale la pena sumar una dependencia por dos glifos.
 */
function IconoInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.34 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  )
}

function IconoFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

/** Datos de contacto de demostración: inventados, no son reales. */
const CONTACTO = {
  direccion: "Av. San Martín 1450, Godoy Cruz, Mendoza",
  telefono: "+54 261 555-0142",
  email: "contacto.sebastianwines@gmail.com",
  horario: "Lunes a sábados de 9 a 20 h",
} as const

const MEDIOS_DE_PAGO = [
  "Visa",
  "Mastercard",
  "American Express",
  "Mercado Pago",
  "Transferencia",
  "Efectivo",
] as const

const LINKS_AYUDA = [
  { href: "/bodegas", label: "Bodegas" },
  { href: "/envios", label: "Formas de envío" },
  { href: "/formas-de-pago", label: "Formas de pago" },
  { href: "/politica-de-devoluciones", label: "Política de devoluciones" },
  { href: "/reembolsos", label: "Reembolsos" },
  { href: "/terminos", label: "Términos y condiciones" },
] as const

const REDES = [
  {
    href: "https://instagram.com/sebastianwines",
    label: "Instagram",
    Icono: IconoInstagram,
  },
  {
    href: "https://facebook.com/sebastianwines",
    label: "Facebook",
    Icono: IconoFacebook,
  },
] as const

export function SiteFooter() {
  return (
    <footer className="bg-muted/30 mt-auto border-t">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Quiénes somos + contacto */}
          <div className="flex flex-col gap-4">
            <Logo className="h-14" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vendemos vinos seleccionados de bodegas particulares de Mendoza.
              Buscamos etiquetas de productores chicos y las acercamos a tu mesa.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
                <span>{CONTACTO.direccion}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0" />
                <a
                  href={`tel:${CONTACTO.telefono.replace(/[^+\d]/g, "")}`}
                  className="hover:text-foreground transition-colors"
                >
                  {CONTACTO.telefono}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0" />
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="hover:text-foreground break-all transition-colors"
                >
                  {CONTACTO.email}
                </a>
              </li>
            </ul>

            <p className="text-muted-foreground text-xs">{CONTACTO.horario}</p>
          </div>

          {/* Ayuda */}
          <nav aria-labelledby="footer-ayuda" className="flex flex-col gap-3">
            <p id="footer-ayuda" className="text-base font-semibold tracking-tight">
              Ayuda
            </p>
            <ul className="flex flex-col gap-2">
              {LINKS_AYUDA.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Medios de pago */}
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold tracking-tight">Medios de pago</p>
            {/* Sin cajas ni versalitas: los nombres de las tarjetas van
                derechos y en negrita, como los escribe cada marca. */}
            <ul className="flex flex-col gap-1.5">
              {MEDIOS_DE_PAGO.map((medio) => (
                <li key={medio} className="text-sm font-semibold">
                  {medio}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Hasta 6 cuotas sin interés con tarjetas seleccionadas. Envíos a
              todo el país.
            </p>
          </div>

          {/* Newsletter + redes */}
          <div className="flex flex-col gap-5">
            <FormularioNewsletter />

            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold tracking-tight">Seguinos</p>
              <div className="flex gap-2">
                {REDES.map(({ href, label, Icono }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="border-border/70 hover:border-foreground/40 hover:text-foreground text-muted-foreground flex size-9 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icono className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/70 text-muted-foreground mt-10 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {ANIO_ACTUAL} Sebastian Wines. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p>Beber con moderación. Prohibida la venta a menores de 18 años.</p>
            {/* Discreto a propósito. Cuando haya login real, este link solo
                debería aparecer para usuarios con rol de administrador. */}
            <Link href="/admin" className="hover:text-foreground transition-colors">
              Administración
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
