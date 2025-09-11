ALTER TABLE "staff" DROP CONSTRAINT "staff_collegeId_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_collegeId_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ALTER COLUMN "college_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ALTER COLUMN "designation" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "institution_id" integer;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "institutions" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "institutions" ADD COLUMN "location" varchar(255);--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "college_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "role" varchar(50) DEFAULT 'staff';--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "college_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "roll_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "course" varchar(100);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "role" varchar(50) DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" DROP COLUMN "collegeId";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "department";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "year";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "collegeId";--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "colleges" ADD CONSTRAINT "colleges_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_roll_number_unique" UNIQUE("roll_number");