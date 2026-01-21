import { pgTable, text, timestamp, uuid, uniqueIndex, index, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const links = pgTable(
  'links',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull(),
    originalUrl: text('original_url').notNull(),
    shortCode: text('short_code').notNull(),
    title: text('title'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    expiresAt: timestamp('expires_at'),
  },
  (table) => ({
    shortCodeIdx: uniqueIndex('short_code_idx').on(table.shortCode),
    userIdIdx: index('user_id_idx').on(table.userId),
  })
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
