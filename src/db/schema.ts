import { sql } from 'drizzle-orm';
import {
  integer, jsonb, pgEnum, pgTable, text, timestamp, uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const roomTypeEnum = pgEnum('room_type', ['single', 'double', 'suite']);

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  number: integer().notNull(),
  room_type: roomTypeEnum().default('single'),
  features: jsonb(),
  created_at: timestamp().default(sql`now()`).notNull(),
  updated_at: timestamp().default(sql`now()`).notNull(),
});

export const userRole = pgEnum('role', ['member', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: userRole().default('member'),
  created_at: timestamp().default(sql`now()`).notNull(),
  updated_at: timestamp().default(sql`now()`).notNull(),
});

export const photos = pgTable('photos', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  url: text().notNull(),
  created_at: timestamp().default(sql`now()`).notNull(),
});

export const reserveStatus = pgEnum('status', ['confirmed', 'pending', 'cancelled']);

export const reserves = pgTable('reserves', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull().references(() => users.id),
  room_id: uuid('room_id').notNull().references(() => rooms.id),
  check_in: timestamp(),
  check_out: timestamp(),
  status: reserveStatus().default('pending'),
  created_at: timestamp().default(sql`now()`).notNull(),
  updated_at: timestamp().default(sql`now()`).notNull(),
});
