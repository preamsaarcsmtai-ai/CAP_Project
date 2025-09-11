ALTER TABLE "admins" DROP CONSTRAINT "admins_college_id_colleges_institution_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;