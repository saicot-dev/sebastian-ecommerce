"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"

import { registrarSuscriptor } from "../actions"
import { registroSchema, type RegistroInput } from "../schema"

export function DialogoRegistro() {
  const [abierto, setAbierto] = useState(false)
  const [confirmacion, setConfirmacion] = useState<string | null>(null)
  const [errorServer, setErrorServer] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistroInput>({
    resolver: zodResolver(registroSchema),
    defaultValues: { nombre: "", email: "" },
  })

  async function onSubmit(datos: RegistroInput) {
    setErrorServer(null)
    const resultado = await registrarSuscriptor(datos)

    if (!resultado.ok) {
      setErrorServer(resultado.error)
      return
    }

    setConfirmacion(resultado.mensaje)
    reset()
  }

  function handleOpenChange(siguiente: boolean) {
    setAbierto(siguiente)
    // Al cerrar, vuelve al estado inicial para la próxima apertura.
    if (!siguiente) {
      setConfirmacion(null)
      setErrorServer(null)
      reset()
    }
  }

  return (
    <Dialog open={abierto} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          Registrarme
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {confirmacion ? (
          <>
            <DialogHeader>
              <DialogTitle>Gracias por sumarte</DialogTitle>
              <DialogDescription>{confirmacion}</DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleOpenChange(false)} className="mt-2">
              Cerrar
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Sumate a Sebastian Wines</DialogTitle>
              <DialogDescription>
                Recibí primero las nuevas cosechas y las ediciones limitadas.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-2 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="registro-nombre">Nombre</Label>
                <input
                  id="registro-nombre"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={
                    errors.nombre ? "registro-nombre-error" : undefined
                  }
                  className="border-border/70 focus-visible:border-foreground/40 focus-visible:ring-ring/40 aria-invalid:border-destructive h-10 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <p
                    id="registro-nombre-error"
                    className="text-destructive text-xs"
                  >
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="registro-email">Email</Label>
                <input
                  id="registro-email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@ejemplo.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "registro-email-error" : undefined
                  }
                  className="border-border/70 placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-ring/40 aria-invalid:border-destructive h-10 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px]"
                  {...register("email")}
                />
                {errors.email && (
                  <p
                    id="registro-email-error"
                    className="text-destructive text-xs"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {errorServer && (
                <p role="alert" className="text-destructive text-xs">
                  {errorServer}
                </p>
              )}

              <Button type="submit" disabled={isSubmitting} className="mt-1">
                {isSubmitting ? "Enviando…" : "Registrarme"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
