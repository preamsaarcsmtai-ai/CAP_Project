ALTER TABLE "staff" DROP CONSTRAINT "staff_college_id_colleges_code_fk";
--> statement-breakpoint
ALTER TABLE "colleges" ALTER COLUMN "code" SET DATA TYPE varchar(55);--> statement-breakpoint
ALTER TABLE "institutions" ALTER COLUMN "code" SET DATA TYPE varchar(55);--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "code";