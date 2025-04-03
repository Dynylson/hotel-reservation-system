import { sql } from 'drizzle-orm';
import {
  integer, jsonb, pgEnum, pgTable, timestamp, uuid,
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
