import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empaqueta solo lo necesario para correr en producción: el Dockerfile copia
  // .next/standalone y no necesita node_modules completo. Sin esto la imagen
  // pesa cientos de MB de más.
  output: "standalone",
};

export default nextConfig;
