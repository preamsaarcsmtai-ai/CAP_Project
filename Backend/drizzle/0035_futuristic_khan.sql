ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_code_colleges_code_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "college_id";