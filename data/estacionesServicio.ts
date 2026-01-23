import { drizzle } from 'drizzle-orm/neon-http';
import { desc, isNull, eq } from 'drizzle-orm';
import { estacionesServicio } from '@/db/schema';
import { sql } from 'drizzle-orm';
import type { NewEstacionServicio } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllEstacionesServicio() {
  return await db
    .select()
    .from(estacionesServicio)
    .where(isNull(estacionesServicio.fechaEliminado))
    .orderBy(desc(estacionesServicio.fechaCreacion));
}

export async function createEstacionServicio(data: NewEstacionServicio) {
  const [newEstacionServicio] = await db
    .insert(estacionesServicio)
    .values(data)
    .returning();
  
  return newEstacionServicio;
}

export async function updateEstacionServicio(id: number, data: { nombre: string; ubicacion: string }) {
  const [updated] = await db
    .update(estacionesServicio)
    .set({
      nombre: data.nombre,
      ubicacion: data.ubicacion,
      fechaModificacion: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(estacionesServicio.id, id))
    .returning();
  
  return updated;
}

export async function softDeleteEstacionServicio(id: number) {
  const [deleted] = await db
    .update(estacionesServicio)
    .set({
      fechaEliminado: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(estacionesServicio.id, id))
    .returning();
  
  return deleted;
}
