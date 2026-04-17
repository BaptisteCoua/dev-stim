import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig()

const databaseUrl =
    config.runningInDocker === 'true'
        ? config.databaseUrlDocker
        : config.databaseUrlLocal

if (!databaseUrl) {
  throw new Error('Missing database URL for current environment')
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
})

export const db = drizzle(pool)