ALTER TABLE "admins" ALTER COLUMN "college_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ALTER COLUMN "institution_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "colleges" ADD COLUMN "code" varchar(55) NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ADD COLUMN "code" varchar(55) NOT NULL;--> statement-breakpoint
ALTER TABLE "colleges" ADD CONSTRAINT "colleges_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_code_unique" UNIQUE("code");