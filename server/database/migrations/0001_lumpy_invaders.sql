CREATE TABLE IF NOT EXISTS "dm_members_table" (
	"user_id" uuid NOT NULL,
	"dm_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "dm_members_table_user_id_dm_id_pk" PRIMARY KEY("user_id","dm_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_members_table" ADD CONSTRAINT "dm_members_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dm_members_table" ADD CONSTRAINT "dm_members_table_dm_id_dms_table_id_fk" FOREIGN KEY ("dm_id") REFERENCES "public"."dms_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
