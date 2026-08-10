@AGENTS.md

# CLAUDE.md — Hoja de ruta del proyecto (Sebastian Wines)

> Este archivo es leído automáticamente por Claude al iniciar cualquier conversación en este proyecto.
> Contiene el contexto del sistema, las decisiones tomadas y el estado actual del desarrollo.
> **Mantenerlo actualizado es obligatorio** — es la memoria del proyecto entre sesiones.

---

## Proyecto

**Nombre**: Sebastian Wines
**Tipo**: E-commerce a medida
**Cliente**: Sebastian Wines (bodega)
**Inicio**: 6 de agosto de 2026

### Descripción del sistema

**No es una bodega: es una tienda que revende vinos de bodegas particulares**
(aclarado por el usuario el 9/8/2026). Catálogo por tipo y varietal, venta por
botella y por caja de 6, carrito, checkout con Mercado Pago y panel de
administración.

> **Al escribir copy**: nunca hablar en primera persona como productor
> ("nuestra finca", "nuestra cosecha"). Son intermediarios que seleccionan
> etiquetas de terceros. Ya se corrigió un "Selección de la bodega" por eso.

---

## Reglas del proyecto

Este proyecto respeta estrictamente los siguientes documentos. Leerlos antes de hacer cualquier cambio:

* [ai-pmp/rules.txt](ai-pmp/rules.txt) — Stack, arquitectura Server-first y reglas de código
* [ai-pmp/frontend-rules.txt](ai-pmp/frontend-rules.txt) — Server/Client Components, formularios, estado, RBAC, SEO
* [ai-pmp/supabase-rules.txt](ai-pmp/supabase-rules.txt) — @supabase/ssr, RLS, seguridad, queries
* [ai-pmp/ecommerce-rules.txt](ai-pmp/ecommerce-rules.txt) — Catálogo, carrito, checkout, stock, órdenes
* [ai-pmp/payments-rules.txt](ai-pmp/payments-rules.txt) — Integración y seguridad de Mercado Pago
* [ai-pmp/error-handling.txt](ai-pmp/error-handling.txt) — Manejo de errores y estados de carga
* [ai-pmp/naming-rules.txt](ai-pmp/naming-rules.txt) — Convenciones de nombres
* [ai-pmp/git-rules.txt](ai-pmp/git-rules.txt) — Commits y ramas

---

## Stack del proyecto

* Next.js 16.3.0 (App Router) + React 19.2.8 + TypeScript strict
* Turbopack (bundler por defecto)
* Tailwind CSS v4 + shadcn/ui (base `radix`, preset `nova`, baseColor neutral)
* Supabase (auth + base de datos + storage) vía `@supabase/ssr`
* TanStack React Query (solo cliente: carrito, interactividad)
* React Hook Form + Zod
* Mercado Pago (Checkout Pro)

> Nomenclatura de keys de Supabase usada en este proyecto: **anon / service_role**

---

## Comandos

```
npm run dev          → servidor de desarrollo (Turbopack)
npm run build        → build de producción (debe pasar sin errores antes de entregar)
npx tsc --noEmit     → verificación de tipos (correr antes de entregar cualquier cambio)
npm run lint         → linter
```

---

## Módulos del sistema

| Módulo | Estado | Tablas Supabase | Notas |
|--------|--------|-----------------|-------|
| Home | UI lista | — | Hero, 4 tipos, más vendidos, ofertas, destacados |
| Catálogo | UI lista (mock) | productos, categorias | `/productos` con filtro por tipo y búsqueda; detalle en `/productos/[slug]` |
| Auth | Pendiente | user_roles | — |
| Catálogo | Pendiente | productos, categorias | — |
| Bodegas | UI lista (mock) | — | `/bodegas` + ficha por bodega, desplegable en header, filtro en catálogo |
| Admin | UI lista (demo) | — | `/admin`: edita vinos, accesorios, bodegas e imágenes. **Sin persistir y sin login** |
| Carrito | UI lista (demo) | — | Estado de cliente + `localStorage`, sin checkout real |
| Accesorios | UI lista (mock) | — | `/accesorios`: sacacorchos, oxigenador, tapones, etc. |
| Checkout / Pagos | Pendiente | ordenes, items_orden | Mercado Pago |

Estados: `Pendiente` / `En desarrollo` / `UI lista` / `Completo`

---

## Base de datos — Tablas creadas

```
[Ninguna todavía]
```

---

## Roles del sistema

| Rol | Permisos |
|-----|----------|
| admin | Acceso total: productos, órdenes, usuarios |
| gerente | [definir] |
| cliente | Comprar, ver sus propias órdenes |

**Alta de usuarios**: signup abierto crea rol `cliente` (trigger `handle_new_user`). El admin sube roles desde el dashboard / service key.

---

## Checklist de seguridad

- [ ] Tabla `user_roles` con RLS propio: nadie modifica su rol desde el cliente
- [ ] Función `tiene_rol()` con `SECURITY DEFINER`
- [ ] Trigger `handle_new_user` (rol por defecto: `cliente`)
- [ ] Autorización en el DAL con `getUser()` (NUNCA `getSession()`)
- [x] `proxy.ts` usado solo para redirects de UX, no como barrera de seguridad
- [ ] Toda tabla nueva: RLS + `WITH CHECK` en escritura
- [ ] Toda tabla nueva: trigger `updated_at` + constraints SQL
- [ ] Dinero en `numeric(12,2)` — nunca float
- [ ] Total de orden recalculado en el server, nunca del cliente
- [ ] Stock descontado solo tras pago aprobado, de forma atómica
- [ ] Webhook de Mercado Pago: firma validada + re-consulta del pago + idempotente
- [x] Secretos (access token MP, service key) sin prefijo `NEXT_PUBLIC_`
- [ ] Después de cada cambio de schema: correr `get_advisors` del MCP

---

## Decisiones técnicas tomadas

* **Scaffold**: `create-next-app` con `--src-dir`, alias `@/*`, Turbopack. La carpeta
  `KNOW - HOW NextJS Ecommerce/` convive en la raíz; las reglas se copiaron a `ai-pmp/`.
* **shadcn/ui**: CLI nueva (base `radix`, preset `nova`). Los aliases de `components.json`
  apuntan a `@/shared/components/ui`, no al default `@/components/ui`, para respetar
  la estructura del know-how.
* **Fuentes**: Geist Sans mapeada a `--font-sans` (la variable que consume `globals.css`)
  y Geist Mono a `--font-geist-mono`.
* **Estética**: fase de estructura con **neutralidad estricta** — solo tokens semánticos
  de shadcn, cero color hardcodeado. La identidad de la bodega se inyecta después
  editando las variables CSS de `globals.css`.
* **Color de marca — bordó** (6/8/2026): primer color de identidad del sistema.
  Definido como token `--marca` en `globals.css` (claro `oklch(0.32 0.135 16)` =
  `#65001b`; oscuro `oklch(0.58 0.13 18)`, levantado porque sobre fondo negro el
  original se apaga). Se usa con la clase `text-marca`. Contraste sobre blanco:
  13.38:1, pasa WCAG AAA. Por ahora solo lo lleva la **S del logo**.
  **Regla que sigue vigente**: nada de hex sueltos en los componentes — todo
  color nuevo se define como token acá primero.
* **Hero**: `public/hero-vino.png` sola, **sin texto ni botones encima**
  (decisión del usuario, 6/8/2026). Se muestra **entera, sin recorte**: `width`
  y `height` con las medidas reales del archivo (1385x768) + `h-auto w-full`.
  No usar `fill` + `object-cover` acá: recorta la foto. Si se cambia la imagen,
  actualizar `width`/`height` con las medidas nuevas o vuelve el salto de layout.
  Desde el 7/8/2026 va **contenida a `max-w-6xl`**, no a pantalla completa, para
  que entre junto con las 4 tarjetas sin cargar la primera pantalla.
  El `h1` de la página vive acá pero es **`sr-only`**: el hero es solo la foto,
  y Google y los lectores de pantalla igual necesitan el título.
  **Debe haber exactamente un `h1` por página** — las otras secciones usan `h2`.
  **Pendiente**: la botella de la foto es de otra bodega (Tempus Alba); reemplazar
  por una foto de producto propia cuando esté disponible.
* **Logo — imagen, ya no tipografía** (8/8/2026): el usuario entregó el logo real
  (`public/logo-sebastian.png`, la S con swash bordó). Reemplazó al que estaba
  hecho con Cormorant + `skew-x`. Al archivo original se le **recortó el margen
  en blanco** (1392x752 → 960x473) y se le **hizo transparente el fondo**, que
  venía blanco opaco y en modo oscuro habría dibujado un rectángulo.
  `Logo.tsx` recibe el alto por `className` (ej. `h-9`), no `text-*`: el ancho
  sale solo de la proporción. Prop `priority` en `true` solo en el header.
  **No agregarle `style={{ aspectRatio }}`**: con `h-*` + `w-auto` compite con el
  cálculo de `next/image` y el logo se ve deformado (pasó el 9/8/2026, se veía
  "cruzado" en el footer). Con `width`/`height` correctos ya alcanza.
  La fuente Cormorant quedó cargada con **un solo peso** por si vuelve a hacer
  falta para títulos; ningún componente la usa hoy.
* **Header sólido siempre** (7/8/2026): revertido el efecto transparente→sólido
  a pedido del usuario. `SiteHeader` volvió a ser **Server Component** (`sticky`,
  `bg-background`, sin estado) y se borró el hook `useScrolled`. Al ser `sticky`
  ocupa su lugar en el flujo: **no** hay que compensar con `pt-16`/`-mt-16`.
  La nav va en `font-medium` para un trazo más firme.
* **Botón del carrito**: `features/carrito/components/BotonCarrito.tsx`, ícono
  `ShoppingBag` en un círculo con el mismo contorno fino que el buscador.
  Es Server Component; cuando muestre la cantidad de ítems habrá que
  convertirlo en isla Client.
* **Buscador**: `features/catalogo/components/BuscadorProductos.tsx`, Client
  Component (es la única isla interactiva del header, que sigue siendo Server).
  Navega a `/productos?q=...`; esa página todavía no existe.
* **Cormorant Garamond como fuente de títulos** (no solo del logo): los `h1`/`h2`
  van en itálica con `font-logo`. A tamaño display se usa `font-normal`, no bold:
  es una serif de contraste alto y con peso se empasta. Geist queda para cuerpo,
  UI y datos.
* **Tipos de vino**: `features/home/components/TiposDeVino.tsx`, 4 columnas
  (tinto, blanco, rosado, espumante) con **foto cuadrada arriba**, que linkean a
  `/productos?tipo=[slug]`. Las fotos llevan `alt=""` porque el nombre del tipo
  ya está en texto justo debajo. Los datos están hardcodeados en el componente;
  al armar el catálogo conviene moverlos a `features/catalogo/mock-data.ts`
  y luego a Supabase.
* **Hero + 4 tipos entran juntos, recortando en ALTO** (8/8/2026): el usuario
  pidió ver la foto y los 4 tipos sin scroll. La foto entera a ancho completo
  mide ~628px y no dejaba lugar. La solución **no** es angostarla (eso se probó
  el 7/8 y se ve mal, con aire a los lados): se recorta su **alto** con
  `object-cover` dentro de una caja `h-[clamp(220px,52svh,520px)]`, y el
  encuadre `object-[center_58%]` corre la vista hacia abajo para conservar
  botella, copa y uvas — lo que se pierde es fondo vacío arriba y piso abajo.
  Las tarjetas usan `max-w-[clamp(120px,20svh,200px)]`, también atado al alto
  del viewport. Verificado que entra en 1280x720, 1366x768, 1440x800 y 1920x1080.
  **Las medidas van atadas a `svh`, no fijas**: si se vuelve a medidas fijas,
  se rompe en las pantallas bajas.
* **Sección de tipos sin título visible** (7/8/2026): se quitaron "Elegí por
  dónde empezar" y "Comprar por tipo" a pedido del usuario. Queda un `h2`
  `sr-only` con `aria-labelledby` en la lista — sin él, los 4 links quedan sin
  contexto para un lector de pantalla. La foto de cada tarjeta tiene tope fijo
  de 200px (antes 264px).
* **Fotos por tipo — enteras, sin recortar** (9/8/2026): el usuario entregó las
  4 fotos ya con la marca Sebastian (`foto-tipo-vino{tinto,blanco,rosado,espumante}.png`).
  Se convirtieron a `public/tipo-{slug}.jpg` (700x700) con `fit:"contain"` y fondo
  blanco: **entran completas, sin recorte ni zoom**. Las versiones anteriores se
  recortaban para esconder texto de otra marca ("RICHMART"), y eso era lo que
  producía el efecto de zoom que el usuario reportó.
  **Para reemplazarlas**: pisar los 4 `.jpg` manteniendo el nombre.
  **Ojo**: la foto del tinto dice "VINO TINO TINTO" — error de tipeo en el
  original, hay que corregirlo en el archivo, no se puede desde el código.
* **Tarjetas: solo la foto** (9/8/2026): las fotos ya traen el nombre del tipo
  escrito, así que el texto debajo se volvió `sr-only` para no duplicar. Sigue en
  el DOM porque **el link necesita decir a dónde lleva**.
  La foto **llena el ancho de su columna**: el `max-w` que tenía antes era lo que
  dejaba aire a los costados.
* **Hero y tarjetas al MÁXIMO posible** (9/8/2026): tras dos pedidos seguidos de
  "más ancho", quedaron en `max-w-[min(100%,clamp(740px,116svh,1250px))]` (hero y
  grilla) y `max-w-[clamp(118px,21svh,196px)]` (cada tarjeta).
  En 1440x800: hero 768 → 832 → **880px**; tarjeta 136 → 160 → **168px**.
  En 1920x1080: hero 950 → 1102 → **1202px**; tarjeta 150 → 180 → **196px**.
  **NO SE PUEDE AGRANDAR MÁS sin romper la primera pantalla.** Medido en
  navegador real: con el escalón siguiente (`120svh,1320px`) las tarjetas se
  caen fuera de la vista en 1280x720 y 1366x768. La causa es que la foto es
  **apaisada (1385x768)**: cada px de ancho suma 0,55px de alto, y el alto es el
  recurso escaso. Recortar el padding vertical se probó y aporta ~10px, no alcanza.
  Queda ~250px de aire por lado en 1440x800; **ese aire es el precio de que la
  foto entera y los 4 tipos conviivan sin scroll**. Para llenarlo de verdad haría
  falta una foto de hero menos apaisada (más cuadrada), no más CSS.
  **El `min(100%,…)` no es decorativo**: el mínimo del clamp (700px) es más
  ancho que un teléfono, y sin él la grilla se desborda a la derecha.
  Se agregó `mx-auto` a cada foto de tipo: como el `max-w` la deja más angosta
  que su columna, sin eso quedaban pegadas a la izquierda y desparejas.
  La grilla usa el mismo `max-w` y padding que el hero para quedar alineada.
  El `sizes` de `ImagenHero` subió a 1102px acompañando el ancho nuevo; si se
  vuelve a cambiar el `max-w`, **hay que actualizar el `sizes`** o Next sirve una
  imagen más chica de la necesaria y se ve borrosa.
  Medido en navegador real: entra en 1280x720, 1366x768, 1440x800, 1536x864,
  1920x1080 y en móvil (390px), sin desborde horizontal.
* **Hero: `max-w-[clamp(600px,96svh,950px)]`** (9/8/2026, superado por lo de arriba): el ancho está atado
  al **alto** del viewport para que la foto y los 4 tipos entren juntos. En
  monitores altos crece hasta 950px; en pantallas bajas se achica sola.
  **El tamaño se controla con el ancho del contenedor, nunca con `max-h`**: se
  probó `max-h-[52svh]` y dejaba 432px de aire a los lados, porque la imagen se
  achica en las dos dimensiones a la vez.
  Las tarjetas de tipo usan la misma técnica (`max-w-[clamp(90px,17svh,150px)]`).
  Verificado que entra todo en 1280x720, 1366x768, 1440x800 y 1920x1080.
* **Hero: foto ENTERA, nunca recortada** (9/8/2026): el usuario reportó que "se
  ve con mucho zoom" y no se lee arriba. La causa era `object-cover` dentro de
  una caja con alto fijo: **se perdía el 57% de la foto**. Ahora va `h-auto`
  con `width`/`height` reales (1385x768) y **sin `object-cover`**, más un margen
  fino (`px-3 lg:px-6`) para que no quede pegada al borde.
  Consecuencia aceptada por el usuario: la foto entera mide ~780px de alto en
  1440x800, así que **las 4 tarjetas ya no entran en la primera pantalla** —
  asoman abajo y se ven con un scroll corto.
  **No volver a meter `object-cover` + alto fijo acá**: es lo que produce el zoom.
* **Tarjetas de tipo: separadas, con contorno y sin zoom** (9/8/2026): estaban
  pegadas (`gap-px`) y a ancho completo, y se veían apretadas y demasiado grandes.
  Ahora la grilla tiene `max-w-[1200px]` centrado, `gap-4 lg:gap-6`, y cada foto
  lleva un borde fino (`border-border/70`, que se oscurece al pasar el mouse).
  Se quitó el `group-hover:scale` — sumaba a la sensación de "todo agrandado".
* **Las tarjetas de tipo NO pueden ser apaisadas**: se probó `aspect-3/2` como en
  la referencia y **corta "Sebastian" por la mitad** — estas fotos son cuadradas
  y llevan el nombre del tipo escrito abajo. Van `aspect-square` + `object-contain`
  (enteras, sin recorte). Si algún día llegan fotos sin texto quemado, ahí sí se
  puede pasar a apaisado con `object-cover`.
* **Pantalla de bienvenida** (7/8/2026): `shared/components/layout/PantallaDeCarga.tsx`,
  una copa SVG que se llena de bordó (`var(--marca)`) y se desvanece. Client
  Component montado en el layout `(shop)`. Dura **2,5s** + 0,6s de salida.
  Se muestra **una vez por sesión** (`sessionStorage`) y se saltea entera si el
  usuario tiene `prefers-reduced-motion`. Arranca oculta y se activa tras montar:
  si decidiera en el primer render habría desajuste de hidratación.
  **Para volver a verla**: abrir la home con `?bienvenida=1` en la URL — si no,
  parece que "no anda" cuando en realidad ya se mostró en esta sesión.
* **Registro de suscriptores** (8/8/2026): `features/auth/` con `schema.ts` (Zod),
  `actions.ts` (Server Action) y `components/DialogoRegistro.tsx` (RHF + shadcn
  Dialog). El botón "Registrarme" vive arriba a la derecha del header, antes del
  carrito; se oculta en móvil (`hidden sm:block`) para no amontonar.
  Pide **nombre y email**, valida en cliente Y en server (el cliente puede
  saltearse Zod). En modo demo confirma sin persistir: al conectar Supabase hay
  que crear la tabla de suscriptores con RLS + `WITH CHECK`, insertar en el
  `TODO` que está marcado en `actions.ts` y manejar el email duplicado.
  **El formulario no cambia** cuando eso pase.
* **La tienda vende muchos vinos, no uno** (6/8/2026): se quitaron de la home el
  bloque "Bodega familiar / El vino que hace la altura" y la ficha de bodega
  (altura, origen, primera cosecha) — describían una bodega de un solo producto.
  El `h1` pasó a "Elegí por dónde empezar" y el `title`/`description` de la home
  y del layout raíz se reescribieron en clave de tienda.
  **Al escribir copy nuevo, mantener ese registro**: catálogo, no relato de finca.
* **Modo demo — sin Supabase** (6/8/2026): el proyecto corre con datos hardcodeados y
  sin credenciales. `integrations/supabase/config.ts` centraliza el chequeo:
  `isSupabaseConfigurado()` mira si están las env vars y `getSupabaseCredenciales()`
  las devuelve validadas. El `proxy.ts` pasa de largo si faltan; los clientes browser
  y server lanzan un error explícito si alguien los llama.
  **Para salir del modo demo**: crear `.env.local` con las variables de `.env.example`.
  No hay que tocar código — todo revive solo.
* **Datos mock**: van en `features/[dominio]/mock-data.ts`, tipados con los tipos reales
  del dominio y consumidos desde `queries.ts`. Así, al conectar Supabase, solo cambia
  el cuerpo de `queries.ts` y ningún componente se entera.
* **Catálogo de demo — 16 vinos inventados** (9/8/2026): pedido explícito del
  usuario, **solo estético, sin tocar la base**. Viven en
  `features/catalogo/mock-data.ts` (tipados con `types.ts`) y se leen desde
  `queries.ts`: `getVinosMasVendidos`, `getVinosEnOferta`, `getVinosDestacados`,
  `getVinoBySlug`, `buscarVinos`.
  **Ningún vino, bodega ni precio de ahí es real** — al conectar Supabase se borra
  `mock-data.ts` y solo cambia el cuerpo de `queries.ts`.
  Los flags `masVendido` / `destacado` / `precioAnterior` son los que arman cada
  sección de la home; el descuento se calcula desde `precioAnterior`.
  Cada vino tiene su campo `imagen`; los componentes lo leen de ahí.
* **Dos juegos de imágenes distintos — no mezclarlos** (9/8/2026):
  * `public/tipo-*.jpg` → **solo** los 4 cuadrados de tipo de la home. Fotos con
    el nombre del tipo **quemado en la imagen**.
  * `public/producto-*.png` → **solo** tarjetas y ficha de producto. Son las
    5 botellas que entregó el usuario (Valle Profundo, Brisa Marina, Flor de
    Seda, Viñedo Real, Celebración), recortadas de `foto-productos-inventados.png`
    con **fondo transparente**, 500x760.
  Los 16 vinos mock se reparten esas 5 botellas según tipo y varietal — varias
  etiquetas comparten foto, es lo esperable en una demo.
  Hubo un paso intermedio con botellas dibujadas en SVG (`vino-*.svg`), ya
  borradas: las reemplazaron estas fotos reales.
* **Orden del catálogo** (9/8/2026): `/productos` acepta `?orden=` con cuatro
  valores — `precio-asc`, `precio-desc`, `anio-desc`, `anio-asc`. El selector
  (`OrdenarVinos.tsx`) es Client Component porque escribe la URL; **conserva los
  demás parámetros** (`tipo`, `q`) al cambiar, así el orden se combina con los
  filtros y el link es compartible.
  `parseOrden()` vive en `types.ts`, no en el componente: la página es Server y
  no puede importar de un archivo `"use client"`.
* **El sitio va en CLARO** (9/8/2026): se probó modo oscuro fijo (clase `dark`
  en el `<html>`) y el usuario lo revirtió en el momento. La paleta oscura de
  `globals.css` quedó afinada (negro cálido, bordó a `oklch(0.66 0.15 20)`) pero
  **inerte**: solo se activa si alguien vuelve a poner la clase `dark`.
* **Sumar/restar sin entrar al carrito** (9/8/2026): `ControlCantidad.tsx`.
  `BotonAgregar` se transforma solo: si el ítem ya está en el carrito muestra
  −/+ con la cantidad, y al llegar a 0 vuelve a ser el botón "Agregar".
  Funciona igual en tarjetas de vino, de accesorio y en la ficha de producto.
* **Carrito** (9/8/2026): `features/carrito/` con `CarritoProvider.tsx`
  (Context + `localStorage`, clave `sebastian-carrito`), montado en el layout
  `(shop)`. `BotonAgregar` sirve para vinos y accesorios; el `id` del ítem es
  `vino-[slug]-[presentacion]` o `accesorio-[slug]`, así botella y caja del
  mismo vino son líneas distintas.
  El **botón del header muestra una botella dibujada + contador** cuando hay algo
  adentro, y la bolsa cuando está vacío (pedido del usuario).
  Pasó a Client Component por eso.
  **El precio guardado es referencial**: al hacer el checkout real hay que
  recalcular el total en el server desde la base, nunca confiar en el cliente.
  El botón "Finalizar compra" todavía no hace nada.
* **Accesorios** (9/8/2026): `features/accesorios/` con la misma estructura mock
  que catálogo. 6 productos con **fotos reales** (`public/acc-*.png`), recortadas
  de `foto-productosinventados.png` con fondo transparente.
  La foto traía 6 celdas pero una era una botella de vino (no es accesorio) y no
  había decantador, así que **se cambió el catálogo para que coincida con las
  fotos**: el decantador pasó a "Tapón con termómetro" y se agregó "Copa sin
  tallo". Dos productos comparten foto (los de copas), es lo esperable en demo.
  Los `acc-*.svg` dibujados a mano que había antes fueron borrados.
  La sección aparece en la home y **al final del carrito**, como venta cruzada.
* **La pantalla de bienvenida ahora sale en CADA carga** (9/8/2026): antes usaba
  `sessionStorage` para mostrarse una sola vez por sesión, y por eso el usuario
  "no la veía". Se quitó esa lógica y subió a **3 segundos**. Lo único que la
  saltea es `prefers-reduced-motion`.
* **Footer completo** (9/8/2026): 4 columnas — contacto (dirección, teléfono,
  gmail, horario: **todos inventados**), links de ayuda, medios de pago y
  newsletter + redes.
  El newsletter (`FormularioNewsletter.tsx`) reusa el mismo Server Action que el
  diálogo del header: pide solo el email.
  **Los íconos de Instagram y Facebook están dibujados a mano** en el propio
  archivo: `lucide-react` ya no incluye logos de marcas (dejó de exportar
  `Instagram` y `Facebook`). No agregar una dependencia por dos glifos.
  Los links de ayuda (`/envios`, `/reembolsos`, etc.) **dan 404**: las páginas
  todavía no existen.
* **Venta por caja de 6** (9/8/2026): la ficha de producto tiene un selector
  botella / caja x6 (`SelectorPresentacion.tsx`, Client Component porque cambia
  imagen y precio sin recargar). Al elegir caja se muestra la foto de la caja de
  madera y el precio mayorista.
  El precio **no está hardcodeado**: sale de `precioCaja()` en `types.ts`
  (`BOTELLAS_POR_CAJA = 6`, `DESCUENTO_CAJA = 0.15`, redondeo a centena).
  Para cambiar el descuento se toca **una sola constante**.
  Las 5 cajas (`public/caja-*.png`) se recortaron de `foto-cajasinventadas.png`
  con fondo transparente; cada vino usa la caja de su misma marca.
* **Ficha de producto**: `tipo`, `bodega` y `año` van **resaltados** en un bloque
  aparte (decisión del usuario); el resto —notas de cata, maridaje, graduación—
  va debajo en una lista de definición. Mismo criterio en `VinoCard`.
* **Bodegas — somos revendedores, no productores** (9/8/2026): `features/bodegas/`
  con 6 bodegas inventadas (Finca La Ladera, Bodega del Valle, Viñedo Real,
  Brisa Marina, Flor de Seda, Casa Celebración). Cada una con región, año de
  fundación, resumen, descripción y especialidades.
  **Se eliminó "Sebastian Wines" del campo `bodega` de los 16 vinos**: la tienda
  revende etiquetas de terceros, así que figurar como productora era un error de
  fondo. Los vinos se repartieron entre las 6 según varietal y foto.
  **`Vino.bodega` guarda el NOMBRE, no el id ni el slug**. Si se renombra una
  bodega en `bodegas/mock-data.ts` hay que actualizar `catalogo/mock-data.ts` o
  los vinos quedan huérfanos (el editor de bodegas avisa de esto en pantalla).
  Al pasar a Supabase esto se resuelve con una FK por id.
* **Header: "Bodegas" es un desplegable, ya no un link** (9/8/2026): antes
  apuntaba a `/bodega`, que daba 404. Ahora `MenuBodegas.tsx` (isla Client)
  lista las 6 y linkea a `/bodegas/[slug]`. Cierra con clic afuera o Escape.
  `SiteHeader` pasó a `async` para leer el DAL, pero **sigue siendo Server**.
* **Filtro por bodega** (9/8/2026): `/productos?bodega=[nombre]`.
  `FiltrarPorBodega.tsx` sigue el mismo patrón que `OrdenarVinos`: conserva los
  demás parámetros, así se combina con `tipo`, `q` y `orden`.
  **La página valida que la bodega exista**: con un nombre inventado en la URL
  muestra el catálogo completo, no una página vacía.
* **Panel de administración — DEMO, no persiste** (9/8/2026): `/admin`, fuera
  del grupo `(shop)` (sin carrito ni pantalla de bienvenida). Edita vinos
  (nombre, precio, oferta, año, bodega, notas, foto), accesorios, bodegas y las
  imágenes del hero y los 4 tipos.
  **Los cambios viven en `localStorage` (`sebastian-admin`), no en el servidor**:
  se ven solo en ese navegador. Hay un aviso fijo arriba del panel que lo dice y
  que **no debe sacarse** mientras no haya base de datos.
  **La ruta es pública**: no hay login. Al conectar Supabase hay que proteger
  `app/admin/layout.tsx` con `getUser()` + chequeo de rol (nunca `getSession()`,
  nunca desde `proxy.ts`). Lleva `robots: noindex` por eso mismo.
  `precioAnterior: null` significa "el admin sacó la oferta" y `undefined` "no
  tocó el campo" — sin esa distinción no habría forma de quitar una oferta.
* **`VinoCard` y `AccesorioCard` pasaron a Client SOLO por el modo demo**
  (9/8/2026): leen los cambios del panel desde `localStorage`, y eso obliga a
  que sean islas. Ambas aplican la edición recién cuando `listo` es `true`; si
  la aplicaran en el primer render habría desajuste de hidratación.
  **Al conectar Supabase vuelven a ser Server Components**: las queries ya van a
  traer los valores editados y `aplicar-ediciones.ts` se borra.
  El hero y las fotos de tipo **no** se convirtieron enteros: se extrajeron las
  islas mínimas `ImagenHero.tsx` e `ImagenTipo.tsx` para no perder el `priority`
  de la imagen que abre la página.
* **Nav del header**: Bodegas (desplegable) · Tinto · Blanco · Espumante · Rosado · Contacto.
  Los 4 tipos linkean a `/productos?tipo=[slug]`. Con 6 links la nav pasó a
  `xl:flex` — en `lg` no entraba junto al buscador.

---

## Estado actual del desarrollo

**Última sesión**: 6 de agosto de 2026
**Próximo paso**: el usuario desarrolla las demás secciones de la home y las páginas restantes.

**Lo que está funcionando**:
* Scaffold Next 16 + React 19 + TS strict + Tailwind v4 + shadcn/ui
* Estructura de carpetas del know-how (`app/`, `features/`, `shared/`, `lib/`, `data/`, `integrations/`)
* Clientes de Supabase (browser + server) y `proxy.ts` de refresco de sesión,
  inertes mientras no haya credenciales (modo demo)
* Layout raíz con metadata SEO, layout `(shop)` con header y footer
* Home `/` con la sección Hero (Server Component, neutralidad estricta)
* `lib/format-currency.ts` y `.env.example`

**Lo que está pendiente**:
* Resto de secciones de la home
* Todos los módulos: auth, catálogo, carrito, checkout, admin
* Schema de Supabase (ninguna tabla creada aún)
* Foto real del hero

**Problemas conocidos o deuda técnica**:
* La botella del hero (`public/hero-vino.png`) es de otra bodega (Tempus Alba).
  Reemplazar por foto de producto propia.
* `public/tipo-{tinto,blanco,rosado,espumante}.svg` son **placeholders** 3:4.
  Reemplazar por fotos reales manteniendo el nombre, o actualizar el campo
  `imagen` en `TiposDeVino.tsx` si cambia la extensión.
* `/contacto` sigue enlazada desde el header y da 404.
* **El panel `/admin` es público y no persiste**: cualquiera con el link entra, y
  los cambios se pierden al limpiar el navegador. Es intencional en modo demo,
  pero **no puede salir a producción así**.
* Si se renombra una bodega, los vinos siguen apuntando al nombre viejo
  (`Vino.bodega` guarda el nombre, no un id). Se resuelve con una FK en Supabase.
* `.next/` a veces falla el build con `EPERM` porque OneDrive sincroniza la carpeta.
  Solución: `rm -rf .next` y rebuildear.

---

## Instrucciones para la IA

1. **Antes de escribir código**, leer los documentos de `ai-pmp/`.
2. **No empezar módulos nuevos** sin que el usuario lo indique.
3. **Antes de entregar**: correr `npx tsc --noEmit` y verificar imports/errores. Cambios grandes: `npm run build`.
4. **Server-first**: componentes Server por defecto; `"use client"` solo donde hay interactividad real, lo más abajo posible.
5. **Lecturas** vía DAL en Server Components; **mutaciones** vía Server Actions; **React Query** solo para cliente.
6. **Si hay ambigüedad**, preguntar antes de implementar.
7. **No agregar dependencias** fuera del stack sin consultar.
8. **Actualizar la tabla de módulos** al completar uno.
9. **Límite 300 líneas por archivo** — dividir si se supera.
10. **Nunca leer, imprimir ni commitear `.env`** ni secretos (access token MP, service key).
11. **Después de cambios de schema**, correr `get_advisors` del MCP y corregir alertas.
12. **El total de la orden y el stock se manejan en el server**; el webhook valida firma y re-consulta el pago.
13. **Al terminar una sesión**, actualizar "Estado actual del desarrollo".

---

## Cómo actualizar este archivo

* **Al terminar un módulo** → cambiar su estado en la tabla
* **Al crear una tabla** → agregarla en "Base de datos"
* **Al tomar una decisión técnica** → registrarla
* **Al terminar una sesión** → actualizar "Estado actual del desarrollo"
* **Al definir roles** → completar tabla de roles y checklist
