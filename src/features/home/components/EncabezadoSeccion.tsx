import Link from "next/link"

type EncabezadoSeccionProps = {
  eyebrow: string
  titulo: string
  /** Link opcional a la derecha, ej. ver todos. */
  href?: string
  hrefLabel?: string
}

export function EncabezadoSeccion({
  eyebrow,
  titulo,
  href,
  hrefLabel = "Ver todos",
}: EncabezadoSeccionProps) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
          {titulo}
        </h2>
      </div>

      {href && (
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground text-sm font-medium whitespace-nowrap transition-colors"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  )
}
