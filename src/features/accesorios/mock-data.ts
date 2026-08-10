import { type Accesorio } from "./types"

/** Accesorios de demostración: datos inventados para maquetar la tienda. */
export const ACCESORIOS_MOCK: readonly Accesorio[] = [
  {
    id: "a1",
    slug: "sacacorchos-profesional",
    nombre: "Sacacorchos profesional",
    descripcion: "Doble palanca, espiral antiadherente y cortacápsulas.",
    precio: 9800,
    precioAnterior: 12400,
    imagen: "/acc-sacacorchos.png",
  },
  {
    id: "a2",
    slug: "oxigenador-de-vino",
    nombre: "Oxigenador de vino",
    descripcion: "Airea la copa al servir. Realza aromas al instante.",
    precio: 7500,
    imagen: "/acc-oxigenador.png",
  },
  {
    id: "a3",
    slug: "tapones-hermeticos",
    nombre: "Tapones herméticos x2",
    descripcion: "Cierre al vacío. La botella abierta aguanta hasta 5 días.",
    precio: 5200,
    imagen: "/acc-tapones.png",
  },
  {
    id: "a4",
    slug: "tapon-con-termometro",
    nombre: "Tapón con termómetro",
    descripcion: "Cierra la botella y marca la temperatura de un vistazo.",
    precio: 11400,
    precioAnterior: 14200,
    imagen: "/acc-termometro.png",
  },
  {
    id: "a5",
    slug: "copas-degustacion",
    nombre: "Copas de degustación x6",
    descripcion: "Cristal fino, cáliz alto. Aptas para lavavajillas.",
    precio: 24600,
    imagen: "/acc-copas.png",
  },
  {
    id: "a6",
    slug: "copa-sin-tallo",
    nombre: "Copa sin tallo x2",
    descripcion: "Cristal grueso, cómoda de sostener. Para el uso diario.",
    precio: 9400,
    imagen: "/acc-copas.png",
  },
] as const
