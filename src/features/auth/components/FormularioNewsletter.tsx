"use client"

import { useState } from "react"

import { Button } from "@/shared/components/ui/button"

import { registrarSuscriptor } from "../actions"

/**
 * Alta al newsletter desde el footer. Pide solo el email; el nombre lo
 * completa el Server Action con un valor por defecto.
 */
export function FormularioNewsletter() {
  const [email, setEmail] = useState("")
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">(
    "idle"
  )
  const [mensaje, setMensaje] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEstado("enviando")

    const resultado = await registrarSuscriptor({
      nombre: "Suscriptor",
      email: email.trim(),
    })

    if (resultado.ok) {
      setEstado("ok")
      setMensaje("Listo, te vamos a escribir.")
      setEmail("")
    } else {
      setEstado("error")
      setMensaje(resultado.error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-foreground text-base font-semibold tracking-tight">
        Newsletter
      </p>
      <p className="text-muted-foreground text-sm">
        Nuevas etiquetas, ofertas y recomendaciones. Sin spam.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Tu email
        </label>
        <div className="flex gap-2">
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (estado !== "idle") setEstado("idle")
            }}
            placeholder="tu@email.com"
            aria-invalid={estado === "error"}
            className="border-border/70 placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-ring/40 aria-invalid:border-destructive h-10 min-w-0 flex-1 rounded-full border bg-transparent px-4 text-sm outline-none focus-visible:ring-[3px]"
          />
          <Button
            type="submit"
            size="sm"
            disabled={estado === "enviando"}
            className="rounded-full"
          >
            {estado === "enviando" ? "…" : "Suscribirme"}
          </Button>
        </div>

        {estado === "ok" && (
          <p role="status" className="text-xs text-green-700 dark:text-green-500">
            {mensaje}
          </p>
        )}
        {estado === "error" && (
          <p role="alert" className="text-destructive text-xs">
            {mensaje}
          </p>
        )}
      </form>
    </div>
  )
}
