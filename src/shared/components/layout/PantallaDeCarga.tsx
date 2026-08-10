"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const DURACION_LLENADO_MS = 3000
const DURACION_SALIDA_MS = 600

/**
 * Se evalúa solo en el cliente, tras montar: evita desajustes de hidratación.
 * Se muestra en **cada carga de la página** (decisión del usuario, 9/8/2026);
 * lo único que la saltea es `prefers-reduced-motion`.
 */
function debeMostrarse(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Cortina de bienvenida: una copa que se llena de bordó y luego se desvanece.
 * Se muestra una sola vez por sesión y respeta `prefers-reduced-motion`.
 */
export function PantallaDeCarga() {
  // Arranca oculta para que el HTML del server y el primer render coincidan.
  const [visible, setVisible] = useState(false)
  const [saliendo, setSaliendo] = useState(false)

  useEffect(() => {
    if (!debeMostrarse()) return

    // Fuera del cuerpo del efecto: evita el render en cascada.
    const aMostrar = requestAnimationFrame(() => setVisible(true))
    const aSalir = setTimeout(() => setSaliendo(true), DURACION_LLENADO_MS)
    const aOcultar = setTimeout(
      () => setVisible(false),
      DURACION_LLENADO_MS + DURACION_SALIDA_MS
    )

    return () => {
      cancelAnimationFrame(aMostrar)
      clearTimeout(aSalir)
      clearTimeout(aOcultar)
    }
  }, [])

  useEffect(() => {
    // Mientras la cortina está arriba, la página no debe scrollear.
    document.body.style.overflow = visible ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className={cn(
        "bg-background fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-600",
        saliendo ? "opacity-0" : "opacity-100"
      )}
    >
      <CopaLlenandose />
    </div>
  )
}

function CopaLlenandose() {
  return (
    <svg
      width="96"
      height="132"
      viewBox="0 0 96 132"
      fill="none"
      className="text-foreground/25"
    >
      <defs>
        {/* El vino se revela subiendo dentro de la silueta de la copa. */}
        <clipPath id="copa-interior">
          <path d="M22 14 h52 v22 a26 26 0 0 1 -52 0 z" />
        </clipPath>
      </defs>

      <g clipPath="url(#copa-interior)">
        <rect
          x="16"
          y="14"
          width="64"
          height="52"
          fill="var(--marca)"
          style={{
            transformOrigin: "center bottom",
            animation: `subir-vino ${DURACION_LLENADO_MS}ms cubic-bezier(0.33, 0, 0.2, 1) forwards`,
          }}
        />
      </g>

      {/* Silueta: cáliz, tallo y base. */}
      <path
        d="M22 14 h52 v22 a26 26 0 0 1 -52 0 z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M48 62 v42" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M30 118 h36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <style>{`
        @keyframes subir-vino {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </svg>
  )
}
