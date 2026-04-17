import { defineConfig } from 'drizzle-kit'
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig()

const databaseUrl =
    config.runningInDocker === "true"
      ? config.databaseUrlDocker : config.databaseUrlLocal

if (!databaseUrl) {
  throw new Error("Missing database url for current environement")
}

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
