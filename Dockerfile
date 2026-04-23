# syntax=docker/dockerfile:1
# On commence avec une image légère pour construire l'application
FROM node:20-alpine AS builder

# Installation de pnpm, le gestionnaire de paquets ultra-rapide
RUN npm install -g pnpm

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copie du reste du code et génération de Prisma
COPY . .
RUN npx prisma generate

# Build de l'application Nuxt 3
RUN pnpm run build

FROM node:20-alpine

WORKDIR /app

# copie du fichier nuxt
COPY --from=builder /app/.output ./

# Le port sur lequel tourne l'application à l'intérieur du conteneur
EXPOSE 3000

# Lancement de l'application
CMD ["node", "server/index.mjs"]
