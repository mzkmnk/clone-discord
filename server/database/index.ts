// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
import {config} from "dotenv";
import postgres from "postgres";
import {drizzle} from 'drizzle-orm/postgres-js';
import * as schema from "~/server/database/schema";
import {dmTable, groupMessagesTable, groupsTable, usersTable} from "~/server/database/schema";
import {InferSelectModel} from "drizzle-orm";

config({path:'.env.local'})

const client = postgres(process.env.NUXT_POSTGRES_URL!);
export const db = drizzle({ client,schema });

export type TUserTable =  InferSelectModel<typeof usersTable>;
export type TGroupsTable =  InferSelectModel<typeof groupsTable>;
export type TDmTable = InferSelectModel<typeof dmTable>;
export type TGroupMessagesTable = InferSelectModel<typeof groupMessagesTable>
