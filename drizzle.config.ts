import { defineConfig } from 'drizzle-kit'
import {config} from "dotenv";

config({path:'.env.local'})

export default defineConfig({
    dialect: 'postgresql',
    schema: './server/database/schema.ts',
    out: './server/database/migrations',
    dbCredentials:{
        url:process.env.NUXT_POSTGRES_URL!,
    }
})
