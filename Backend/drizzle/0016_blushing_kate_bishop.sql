ALTER TABLE "admins" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "colleges" ADD CONSTRAINT "colleges_code_unique" UNIQUE("code");