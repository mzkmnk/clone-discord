import {pgTable, primaryKey, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

/** ユーザテーブル */
export const usersTable = pgTable('users_table', {
    id: uuid('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    fullName: text('fullName').notNull(),
    iconUrl:varchar('icon_url',{length:512}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/** グループテーブル */
export const groupsTable = pgTable('groups_table', {
    id: uuid('id').primaryKey(),
    name: varchar('name',{length:256}).notNull(),
    description: text('description'),
    bucket:text('bucket'),
    iconUrl:varchar('icon_url',{length:512}),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

/** dmテーブル */
export const dmTable = pgTable('dms_table', {
    id: uuid('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

/** ユーザとグループを結ぶ関係テーブル */
export const groupMembersTable = pgTable('group_members_table', {
    userId:uuid('user_id').notNull().references(() => usersTable.id),
    groupId:uuid('group_id').notNull().references(() => groupsTable.id),
    joinedAt:timestamp('created_at').notNull().defaultNow(),
    role:varchar('role',{length:256}).notNull(),
},(groupMembers) =>
    [primaryKey({columns:[groupMembers.groupId,groupMembers.userId]})],
);

/** ユーザとdmを結ぶ関係テーブル */
export const dmMembersTable = pgTable('dm_members_table', {
    userId:uuid('user_id').notNull().references(() => usersTable.id),
    dmId:uuid('dm_id').notNull().references(() => dmTable.id),
    joinedAt:timestamp('created_at').notNull().defaultNow(),
},(dmMembers) => ({
    pk:primaryKey({columns:[dmMembers.userId,dmMembers.dmId]})
}))

/** グループのメッセージテーブル */
export const groupMessagesTable = pgTable('group_messages_table', {
    id:uuid('id').primaryKey(),
    userId:uuid('userId').notNull().references(() => usersTable.id),
    groupId:uuid('groupId').notNull().references(() => groupsTable.id),
    content:text('content').notNull(),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
})

/** dmのメッセージテーブル */
export const dmMessagesTable = pgTable('dm_messages_table', {
    id:uuid('id').primaryKey(),
    userId:uuid('userId').notNull().references(() => usersTable.id),
    dmId:uuid('dm_id').notNull().references(() => dmTable.id),
    content:text('content').notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
})
