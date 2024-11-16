import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    fullName: text('fullName').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
