import { pgTable, text, timestamp, uniqueIndex, index, integer, varchar, decimal } from 'drizzle-orm/pg-core';
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

export const articulos = pgTable('articulos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  nombreArticulo: varchar('nombre_articulo', { length: 50 }).notNull(),
  fechaRegistro: timestamp('fecha_registro').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaCierre: timestamp('fecha_cierre'),
  totalDias: integer('total_dias').default(0).notNull(),
});

export type Articulo = typeof articulos.$inferSelect;
export type NewArticulo = typeof articulos.$inferInsert;

export const estacionesServicio = pgTable('estaciones_servicio', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  nombre: text('nombre').notNull(),
  ubicacion: text('ubicacion').notNull(),
  fechaCreacion: timestamp('fecha_creacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaModificacion: timestamp('fecha_modificacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaEliminado: timestamp('fecha_eliminado'),
});

export type EstacionServicio = typeof estacionesServicio.$inferSelect;
export type NewEstacionServicio = typeof estacionesServicio.$inferInsert;

export const tiposVehiculo = pgTable('tipos_vehiculo', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  nombre: text('nombre').notNull(),
  fechaCreacion: timestamp('fecha_creacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaModificacion: timestamp('fecha_modificacion').default(sql`CURRENT_TIMESTAMP`).notNull(),
  fechaEliminado: timestamp('fecha_eliminado'),
});

export type TipoVehiculo = typeof tiposVehiculo.$inferSelect;
export type NewTipoVehiculo = typeof tiposVehiculo.$inferInsert;

export const registrosGasolina = pgTable('registros_gasolina', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  idEstacionServicio: integer('id_estacion_servicio')
    .notNull()
    .references(() => estacionesServicio.id),
  idTipoVehiculo: integer('id_tipo_vehiculo')
    .notNull()
    .references(() => tiposVehiculo.id),
  kilometrajeActual: integer('kilometraje_actual').notNull(),
  litrosCargados: decimal('litros_cargados', { precision: 10, scale: 2 }).notNull(),
  montoCargado: decimal('monto_cargado', { precision: 10, scale: 2 }).notNull(),
  precioPorLitro: decimal('precio_por_litro', { precision: 10, scale: 2 }).notNull(),
  fechaCarga: timestamp('fecha_carga').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type RegistroGasolina = typeof registrosGasolina.$inferSelect;
export type NewRegistroGasolina = typeof registrosGasolina.$inferInsert;
