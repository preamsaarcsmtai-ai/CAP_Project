CREATE TABLE "super_admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'super_admin',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "super_admins_email_unique" UNIQUE("email")
);
