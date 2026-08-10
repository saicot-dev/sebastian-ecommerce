# CLAUDE.md — Hoja de ruta del proyecto (Next.js E-commerce)

> Este archivo es leído automáticamente por Claude al iniciar cualquier conversación en este proyecto.
> Contiene el contexto del sistema, las decisiones tomadas y el estado actual del desarrollo.
> **Mantenerlo actualizado es obligatorio** — es la memoria del proyecto entre sesiones.
> Al iniciar un proyecto nuevo: completar todos los campos entre [corchetes] antes de la primera sesión.

---

## Proyecto

**Nombre**: [Nombre de la tienda]
**Tipo**: E-commerce a medida
**Cliente**: [Nombre del cliente]
**Desarrollado por**: [Tu empresa]
**Inicio**: [Fecha de inicio]

### Descripción del sistema

[Describir en 2-3 líneas qué vende la tienda, para quién y qué la diferencia]

Ejemplo: *Tienda online para una pinturería. Catálogo de productos por categoría, carrito, checkout con Mercado Pago y panel de administración de productos y órdenes.*

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

* Next.js 16+ (App Router) + React 19 + TypeScript strict
* Turbopack (bundler por defecto)
* Tailwind CSS v4 + shadcn/ui
* Supabase (auth + base de datos + storage) vía `@supabase/ssr`
* TanStack React Query (solo cliente: carrito, interactividad)
* React Hook Form + Zod
* Mercado Pago (Checkout Pro)

> Si este proyecto usa versiones distintas, registrarlo en "Decisiones técnicas".
> Nomenclatura de keys de Supabase usada en este proyecto: [anon/service_role  ó  publishable/secret]

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
| Auth | Pendiente | user_roles | — |
| Catálogo | Pendiente | productos, categorias | — |
| Carrito | Pendiente | — | estado de cliente |
| Checkout / Pagos | Pendiente | ordenes, items_orden | Mercado Pago |
| Admin | Pendiente | — | protegido por rol |

Estados: `Pendiente` / `En desarrollo` / `UI lista` / `Completo`

---

## Base de datos — Tablas creadas

```
[Ninguna todavía]
```

Ejemplo:
```
- user_roles    → roles (admin, gerente, cliente)
- productos     → catálogo (slug, precio, stock)
- categorias    → categorías
- ordenes       → cabecera de orden (estado, total, pago_id)
- items_orden   → detalle (precio_unitario congelado)
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
- [ ] `proxy.ts` usado solo para redirects de UX, no como barrera de seguridad
- [ ] Toda tabla nueva: RLS + `WITH CHECK` en escritura
- [ ] Toda tabla nueva: trigger `updated_at` + constraints SQL
- [ ] Dinero en `numeric(12,2)` — nunca float
- [ ] Total de orden recalculado en el server, nunca del cliente
- [ ] Stock descontado solo tras pago aprobado, de forma atómica
- [ ] Webhook de Mercado Pago: firma validada + re-consulta del pago + idempotente
- [ ] Secretos (access token MP, service key) sin prefijo `NEXT_PUBLIC_`
- [ ] Después de cada cambio de schema: correr `get_advisors` del MCP

---

## Decisiones técnicas tomadas

Registrar aquí lo que se salga del estándar. Ejemplos:
* Carrito persistido en [localStorage / tabla `carritos`]
* Webhook de MP en [Route Handler / Edge Function]
* ISR del catálogo con `revalidate = [N]`

---

## Estado actual del desarrollo

**Última sesión**: [fecha]
**Próximo paso**: [qué hacer en la próxima sesión]

**Lo que está funcionando**:
* [listar]

**Lo que está pendiente**:
* [listar]

**Problemas conocidos o deuda técnica**:
* [listar o "Ninguno"]

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
