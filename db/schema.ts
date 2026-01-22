import { pgTable, text, timestamp, uuid, uniqueIndex, index, integer, varchar } from 'drizzle-orm/pg-core';
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

export const contactos = pgTable('contactos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar('nombre', { length: 50 }).notNull(),
  numeroTelefono: varchar('numero_telefono', { length: 20 }),
  fechaCreacion: timestamp('fecha_creacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaModificacion: timestamp('fecha_modificacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaEliminado: timestamp('fecha_eliminado'),
});

export type Contacto = typeof contactos.$inferSelect;
export type NewContacto = typeof contactos.$inferInsert;
