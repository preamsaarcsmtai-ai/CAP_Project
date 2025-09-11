ALTER TABLE "admins" DROP CONSTRAINT "admins_code_unique";--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_roll_number_unique";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_institution_id_institutions_id_fk";
--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ALTER COLUMN "college_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "department" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "year" integer;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "collegeId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_collegeId_colleges_id_fk" FOREIGN KEY ("collegeId") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "institution_id";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "admins" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "college_id";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "roll_number";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "course";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "created_at";