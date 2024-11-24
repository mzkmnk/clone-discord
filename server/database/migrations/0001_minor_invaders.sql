ALTER TABLE "group_messages_table" DROP CONSTRAINT "group_messages_table_group_id_groups_table_id_fk";
--> statement-breakpoint
ALTER TABLE "group_messages_table" ADD COLUMN "groupId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "group_messages_table" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_messages_table" ADD CONSTRAINT "group_messages_table_groupId_groups_table_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groups_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "group_messages_table" DROP COLUMN IF EXISTS "group_id";--> statement-breakpoint
ALTER TABLE "group_messages_table" DROP COLUMN IF EXISTS "created_at";