ALTER TABLE "admins" DROP CONSTRAINT "admins_code_unique";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "code";