ALTER TABLE "admins" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "college_id" integer;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "institution_id" integer;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "role" varchar(50) DEFAULT 'college_admin';--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "institution_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "code" varchar(55);--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "college_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "designation" varchar(255);--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "role" varchar(50) DEFAULT 'staff';--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "college_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "roll_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "course" varchar(100);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "role" varchar(50) DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "colleges" ADD CONSTRAINT "colleges_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_college_id_colleges_id_fk" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "colleges" ADD CONSTRAINT "colleges_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_roll_number_unique" UNIQUE("roll_number");