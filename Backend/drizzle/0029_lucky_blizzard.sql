ALTER TABLE "staff" DROP CONSTRAINT "staff_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "college_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "institution_id";