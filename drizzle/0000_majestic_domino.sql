CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"original_url" text NOT NULL,
	"short_code" text NOT NULL,
	"title" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX "short_code_idx" ON "links" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "links" USING btree ("user_id");