FROM node:22

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

EXPOSE 3000

CMD ["sh", "-c", "pnpm install && rm -rf prisma/generated/prisma && pnpm prisma generate && pnpm dev --host 0.0.0.0"]
