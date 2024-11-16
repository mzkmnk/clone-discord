// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
import {config} from "dotenv";
import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';

config({path:'.env.local'})

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
