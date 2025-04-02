import { sql } from 'drizzle-orm';
import {
  integer, jsonb, pgEnum, pgTable, timestamp, uuid,
} from 'drizzle-orm/pg-core';

export const roomTypeEnum = pgEnum('room_type', ['single', 'double', 'suite']);

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  number: integer().notNull(),
  room_type: roomTypeEnum().notNull(),
  features: jsonb(),
  created_at: timestamp().default(sql`now()`).notNull(),
  updated_at: timestamp().default(sql`now()`).notNull(),
});
