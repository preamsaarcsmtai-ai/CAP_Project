CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"college_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"designation" varchar(255),
	"role" varchar(50) DEFAULT 'staff',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "staff_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"college_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"roll_number" varchar(50) NOT NULL,
	"course" varchar(100),
	"role" varchar(50) DEFAULT 'student',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_roll_number_unique" UNIQUE("roll_number")
);
--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_college_id_colleges_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_college_id_colleges_institution_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("institution_id") ON DELETE no action ON UPDATE no action;