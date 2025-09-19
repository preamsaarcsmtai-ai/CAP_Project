ALTER TABLE "admins" ALTER COLUMN "college_admin" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "college_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "institution_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;