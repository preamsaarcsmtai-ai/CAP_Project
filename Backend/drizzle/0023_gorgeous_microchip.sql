ALTER TABLE "admins" DROP CONSTRAINT "admins_email_unique";--> statement-breakpoint
ALTER TABLE "colleges" DROP CONSTRAINT "colleges_code_unique";--> statement-breakpoint
ALTER TABLE "staff" DROP CONSTRAINT "staff_email_unique";--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_email_unique";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "colleges" DROP CONSTRAINT "colleges_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" DROP CONSTRAINT "staff_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_collegeId_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "college_id";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "colleges" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "college_id";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "designation";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "department";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "year";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "collegeId";