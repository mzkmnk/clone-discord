CREATE TABLE IF NOT EXISTS "dm_messages_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"dm_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_messages_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_messages_table" ADD CONSTRAINT "dm_messages_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_messages_table" ADD CONSTRAINT "dm_messages_table_dm_id_dms_table_id_fk" FOREIGN KEY ("dm_id") REFERENCES "public"."dms_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_messages_table" ADD CONSTRAINT "group_messages_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_messages_table" ADD CONSTRAINT "group_messages_table_group_id_groups_table_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
