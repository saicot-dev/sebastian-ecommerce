import { type Metadata } from "next"
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

/**
 * Serif de títulos (`font-logo`). Desde que el logo es una imagen, ningún
 * componente la usa: queda un solo peso cargado para cuando vuelva a hacer falta.
 */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Sebastian Wines",
    template: "%s | Sebastian Wines",
  },
  description:
    "Tienda de vinos Sebastian Wines: tintos, blancos, rosados y espumantes. Comprá online con envío a todo el país.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
