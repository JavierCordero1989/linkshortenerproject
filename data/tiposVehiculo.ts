import { drizzle } from 'drizzle-orm/neon-http';
import { desc, isNull, eq } from 'drizzle-orm';
import { tiposVehiculo } from '@/db/schema';
import { sql } from 'drizzle-orm';
import type { NewTipoVehiculo } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllTiposVehiculo() {
  return await db
    .select()
    .from(tiposVehiculo)
    .where(isNull(tiposVehiculo.fechaEliminado))
    .orderBy(desc(tiposVehiculo.fechaCreacion));
}

export async function createTipoVehiculo(data: NewTipoVehiculo) {
  const [newTipoVehiculo] = await db
    .insert(tiposVehiculo)
    .values(data)
    .returning();
  
  return newTipoVehiculo;
}

export async function updateTipoVehiculo(id: number, data: { nombre: string }) {
  const [updated] = await db
    .update(tiposVehiculo)
    .set({
      nombre: data.nombre,
      fechaModificacion: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(tiposVehiculo.id, id))
    .returning();
  
  return updated;
}

export async function softDeleteTipoVehiculo(id: number) {
  const [deleted] = await db
    .update(tiposVehiculo)
    .set({
      fechaEliminado: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(tiposVehiculo.id, id))
    .returning();
  
  return deleted;
}
