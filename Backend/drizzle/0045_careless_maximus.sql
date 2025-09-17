ALTER TABLE "staff" DROP CONSTRAINT "staff_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "college_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_code_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("code") ON DELETE no action ON UPDATE no action;