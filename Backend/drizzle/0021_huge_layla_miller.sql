ALTER TABLE "institutions" DROP CONSTRAINT "institutions_code_unique";--> statement-breakpoint
ALTER TABLE "institutions" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "institutions" DROP COLUMN "location";