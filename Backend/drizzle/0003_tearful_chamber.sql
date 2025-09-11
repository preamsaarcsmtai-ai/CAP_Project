ALTER TABLE "admins" DROP CONSTRAINT "admins_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "institution_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_college_id_colleges_institution_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("institution_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;