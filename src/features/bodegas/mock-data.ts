import { type Bodega } from "./types"

/**
 * Bodegas de demostración: nombres, regiones e historias inventadas.
 * Ninguna es real.
 *
 * Son las bodegas de terceros cuyos vinos revendemos — la tienda no produce.
 * El campo `nombre` es el que aparece en `Vino.bodega`: si acá se renombra una,
 * hay que actualizar `catalogo/mock-data.ts` o los vinos quedan huérfanos.
 */
export const BODEGAS_MOCK: readonly Bodega[] = [
  {
    id: "b1",
    slug: "finca-la-ladera",
    nombre: "Finca La Ladera",
    region: "Valle de Uco, Mendoza",
    fundacion: 1998,
    resumen:
      "Viñedos de altura sobre suelo pedregoso. Vinos frescos, de acidez marcada.",
    descripcion:
      "Trabajan catorce hectáreas a 1.240 metros, con cosecha manual y fermentaciones cortas. La amplitud térmica del Valle de Uco les da uvas de piel gruesa y mucha concentración aromática. Es una de las primeras bodegas familiares que sumamos al catálogo.",
    especialidades: ["Pinot Noir", "Sauvignon Blanc", "Viognier"],
  },
  {
    id: "b2",
    slug: "bodega-del-valle",
    nombre: "Bodega del Valle",
    region: "Luján de Cuyo, Mendoza",
    fundacion: 1974,
    resumen:
      "Bodega familiar de tercera generación. Tintos clásicos y de buena relación precio-calidad.",
    descripcion:
      "Tres generaciones trabajando el mismo terreno en Luján de Cuyo. Apuestan por vinos de todos los días, sin demasiada madera, pensados para la mesa antes que para la guarda. Es la bodega de la que más etiquetas vendemos.",
    especialidades: ["Bonarda", "Syrah", "Torrontés"],
  },
  {
    id: "b3",
    slug: "vinedo-real",
    nombre: "Viñedo Real",
    region: "San Rafael, Mendoza",
    fundacion: 1986,
    resumen: "Malbec de guarda y cortes de alta gama, con paso largo por roble.",
    descripcion:
      "Su enólogo trabajó una década en Francia y volvió con una idea clara: cortes complejos, paso largo por roble francés y guarda en botella antes de salir a la venta. Son los vinos más caros del catálogo y también los que más se piden para regalo.",
    especialidades: ["Malbec", "Cabernet Sauvignon", "Petit Verdot"],
  },
  {
    id: "b4",
    slug: "brisa-marina",
    nombre: "Brisa Marina",
    region: "Chapadmalal, Buenos Aires",
    fundacion: 2011,
    resumen:
      "Viñedos costeros. Blancos salinos y de acidez alta, poco habituales en el país.",
    descripcion:
      "Uno de los proyectos atlánticos más jóvenes de Argentina. La cercanía al mar les da vinos salinos, de baja graduación y acidez alta, muy distintos a los de Cuyo. Los sumamos porque no había nada parecido en el catálogo.",
    especialidades: ["Chardonnay", "Albariño", "Sauvignon Blanc"],
  },
  {
    id: "b5",
    slug: "flor-de-seda",
    nombre: "Flor de Seda",
    region: "Cafayate, Salta",
    fundacion: 2004,
    resumen: "Rosados de prensa directa y blancos aromáticos del norte.",
    descripcion:
      "Se especializaron en rosados cuando casi nadie los tomaba en serio acá. Prensa directa, sin maceración larga: buscan color pálido y boca seca, al estilo provenzal. También hacen el Torrontés más floral que probamos.",
    especialidades: ["Malbec Rosé", "Pinot Noir Rosé", "Torrontés"],
  },
  {
    id: "b6",
    slug: "casa-celebracion",
    nombre: "Casa Celebración",
    region: "Tupungato, Mendoza",
    fundacion: 1992,
    resumen:
      "Espumantes por método tradicional, con crianza sobre lías de 24 meses.",
    descripcion:
      "Hacen solo espumantes, y todos por método tradicional: segunda fermentación en botella y un mínimo de veinticuatro meses sobre lías. Esa paciencia se nota en la burbuja, mucho más fina que la de un espumante de tanque.",
    especialidades: ["Brut Nature", "Extra Brut Rosé", "Demi-Sec"],
  },
] as const
