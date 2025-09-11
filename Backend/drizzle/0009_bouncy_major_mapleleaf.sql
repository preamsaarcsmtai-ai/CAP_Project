ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "colleges" DROP CONSTRAINT "colleges_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "colleges" ALTER COLUMN "code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ALTER COLUMN "code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_unique" UNIQUE("code");