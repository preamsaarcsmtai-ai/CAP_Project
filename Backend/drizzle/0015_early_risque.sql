ALTER TABLE "admins" DROP CONSTRAINT "admins_code_unique";--> statement-breakpoint
ALTER TABLE "colleges" DROP CONSTRAINT "colleges_code_unique";--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "college_id" integer;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "code";