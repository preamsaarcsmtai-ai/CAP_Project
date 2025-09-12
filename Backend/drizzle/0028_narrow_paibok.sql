ALTER TABLE "staff" DROP CONSTRAINT "staff_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "institution_id" integer;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "college_id";