ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";