ALTER TABLE "admins" DROP CONSTRAINT "admins_code_unique";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ALTER COLUMN "code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_colleges_code_fk" FOREIGN KEY ("code") REFERENCES "public"."colleges"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";