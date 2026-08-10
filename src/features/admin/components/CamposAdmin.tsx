"use client"

/**
 * Campos de formulario del panel. Comparten estilo con el resto del sitio
 * (contorno fino, tokens del sistema) para que el admin no parezca otra app.
 */

const CLASES_BASE =
  "border-border/70 focus-visible:border-foreground/40 focus-visible:ring-ring/40 w-full rounded-sm border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"

type CampoTextoProps = {
  label: string
  value: string
  onChange: (valor: string) => void
  placeholder?: string
  /** Texto de ayuda debajo del campo. */
  ayuda?: string
}

export function CampoTexto({
  label,
  value,
  onChange,
  placeholder,
  ayuda,
}: CampoTextoProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={CLASES_BASE}
      />
      {ayuda && <span className="text-muted-foreground text-xs">{ayuda}</span>}
    </label>
  )
}

type CampoNumeroProps = {
  label: string
  value: number | undefined
  onChange: (valor: number | undefined) => void
  /** Permite dejarlo vacío (por ejemplo, sacar el precio anterior). */
  opcional?: boolean
  ayuda?: string
}

export function CampoNumero({
  label,
  value,
  onChange,
  opcional,
  ayuda,
}: CampoNumeroProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </span>
      <input
        type="number"
        min={0}
        value={value ?? ""}
        placeholder={opcional ? "Sin oferta" : undefined}
        onChange={(e) => {
          const crudo = e.target.value
          if (crudo === "") {
            onChange(undefined)
            return
          }
          const numero = Number(crudo)
          // Un NaN acá dejaría el precio en blanco en toda la tienda.
          if (!Number.isNaN(numero)) onChange(numero)
        }}
        className={CLASES_BASE}
      />
      {ayuda && <span className="text-muted-foreground text-xs">{ayuda}</span>}
    </label>
  )
}

type CampoAreaProps = {
  label: string
  value: string
  onChange: (valor: string) => void
  filas?: number
}

export function CampoArea({ label, value, onChange, filas = 3 }: CampoAreaProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-muted-foreground text-xs tracking-wide uppercase">
        {label}
      </span>
      <textarea
        value={value}
        rows={filas}
        onChange={(e) => onChange(e.target.value)}
        className={`${CLASES_BASE} resize-y leading-relaxed`}
      />
    </label>
  )
}
