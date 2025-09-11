ALTER TABLE "admins" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_unique" UNIQUE("code");