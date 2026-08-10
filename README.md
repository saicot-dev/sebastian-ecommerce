# Sebastian Wines

Tienda online de vinos. Catálogo por tipo y varietal, venta por botella y por
caja de 6, carrito, bodegas y panel de administración.

> **Sebastian Wines no es una bodega**: es una tienda que revende etiquetas de
> bodegas particulares. Al escribir textos, nunca hablar en primera persona como
> productor ("nuestra finca", "nuestra cosecha").

## Estado: demostración

El proyecto corre **sin base de datos**, con datos de ejemplo escritos a mano.
Los 16 vinos, las 6 bodegas, los precios y los datos de contacto del pie de
página son **inventados**.

Lo que ya funciona:

- Home con foto principal, los 4 tipos de vino, más vendidos, ofertas y destacados
- Catálogo con filtros por tipo y bodega, buscador y cuatro criterios de orden
- Ficha de producto con venta por botella o caja de 6 (con descuento mayorista)
- Carrito con sumar y restar desde las tarjetas, guardado en el navegador
- Accesorios (sacacorchos, oxigenador, tapones) como venta cruzada
- 6 bodegas, cada una con su página, y desplegable en el encabezado
- Panel `/admin` para editar productos, bodegas e imágenes

Lo que falta antes de salir a producción:

- **Checkout y cobro con Mercado Pago** (el botón "Finalizar compra" no hace nada)
- **Proteger `/admin`**: hoy la ruta es pública y los cambios no se guardan en el
  servidor, solo en el navegador de quien edita
- Conectar Supabase y crear las tablas
- Páginas de envíos, devoluciones, términos y contacto (hoy dan 404)

## Arrancar

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Comandos

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npx tsc --noEmit` | Verificar tipos |
| `npm run lint` | Linter |

## Salir del modo demostración

Copiar `.env.example` a `.env.local` y completar las credenciales de Supabase.
El chequeo está centralizado en `src/integrations/supabase/config.ts`: **no hay
que tocar código**, el proyecto detecta las variables y vuelve a usar la base.

Nunca subir el archivo `.env.local` ni las claves de Mercado Pago al repositorio.

## Cómo está organizado

```
src/
  app/              rutas (App Router)
    (shop)/         tienda: home, catálogo, bodegas, carrito, accesorios
    admin/          panel de administración
  features/         cada dominio con sus componentes, tipos y consultas
  shared/           componentes compartidos (encabezado, pie, UI)
  integrations/     clientes de Supabase
  lib/              utilidades
```

Los datos de ejemplo viven en `features/[dominio]/mock-data.ts` y se leen desde
`queries.ts`. Al conectar Supabase solo cambia el contenido de `queries.ts`;
ningún componente se entera.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Supabase · React Hook Form + Zod · Mercado Pago

## Documentación del proyecto

- [CLAUDE.md](CLAUDE.md) — hoja de ruta, decisiones tomadas y estado actual
- [ai-pmp/](ai-pmp/) — reglas de código, arquitectura, seguridad y pagos
