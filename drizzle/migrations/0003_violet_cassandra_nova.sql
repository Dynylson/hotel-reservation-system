CREATE TYPE "public"."status" AS ENUM('confirmed', 'pending', 'cancelled');--> statement-breakpoint
CREATE TABLE "reserves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"check_in" timestamp,
	"check_out" timestamp,
	"status" "status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reserves" ADD CONSTRAINT "reserves_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reserves" ADD CONSTRAINT "reserves_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;