# Imagen de producción para CapRover.
# Multi-etapa: la imagen final solo lleva el resultado del build, no el código
# fuente ni las dependencias de desarrollo.

# ---- Dependencias ----
FROM node:22-alpine AS deps
WORKDIR /app

# Alpine usa musl: sharp (que optimiza las imágenes) necesita esta librería
# para cargar su binario nativo.
RUN apk add --no-cache libc6-compat

# Solo los manifiestos: si no cambian, Docker reutiliza esta capa y no vuelve
# a instalar en cada deploy.
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Telemetría de Next apagada: no queremos llamadas salientes desde el servidor.
ENV NEXT_TELEMETRY_DISABLED=1

# Ojo: NO poner NODE_ENV=production acá. TypeScript, Tailwind y ESLint son
# devDependencies y el build las necesita; Next ya compila en modo producción.
RUN npm run build

# ---- Producción ----
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuario sin privilegios: si algún día hay una vulnerabilidad, no corre como root.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# `standalone` trae el servidor y solo las dependencias que realmente se usan.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# CapRover enruta al 80 del contenedor.
EXPOSE 80
ENV PORT=80
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
