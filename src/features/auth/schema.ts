import { z } from "zod"

/** Alta de suscriptor. Se valida en el cliente (UX) y de nuevo en el server. */
export const registroSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre")
    .max(80, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .min(1, "Ingresá tu email")
    .email("Revisá el email: no parece válido")
    .max(160, "El email es demasiado largo"),
})

export type RegistroInput = z.infer<typeof registroSchema>
