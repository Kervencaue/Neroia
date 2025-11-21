#!/bin/bash
set -e

echo "🔨 Iniciando build otimizado para Vercel..."

# Aumentar limite de memória
export NODE_OPTIONS="--max-old-space-size=3072"

# Instalar dependências
echo "📦 Instalando dependências..."
pnpm install --frozen-lockfile

# Build do Vite (frontend)
echo "⚙️ Building frontend com Vite..."
pnpm exec vite build --minify=false

# Build do servidor (backend)
echo "⚙️ Building backend com esbuild..."
pnpm exec esbuild server/_core/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --minify=false \
  --external:@aws-sdk/client-s3 \
  --external:@aws-sdk/s3-request-presigner \
  --external:drizzle-orm \
  --external:mysql2

echo "✅ Build concluído com sucesso!"
