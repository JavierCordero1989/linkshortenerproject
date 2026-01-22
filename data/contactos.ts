import { drizzle } from 'drizzle-orm/neon-http';
import { desc, isNull, eq } from 'drizzle-orm';
import { contactos } from '@/db/schema';
import { sql } from 'drizzle-orm';
import type { NewContacto } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllContactos() {
  return await db
    .select()
    .from(contactos)
    .where(isNull(contactos.fechaEliminado))
    .orderBy(desc(contactos.fechaCreacion));
}

export async function createContacto(data: NewContacto) {
  const [newContacto] = await db
    .insert(contactos)
    .values(data)
    .returning();
  
  return newContacto;
}

export async function updateContacto(id: number, data: { nombre: string; numeroTelefono: string | null }) {
  const [updated] = await db
    .update(contactos)
    .set({
      nombre: data.nombre,
      numeroTelefono: data.numeroTelefono,
      fechaModificacion: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(contactos.id, id))
    .returning();
  
  return updated;
}

export async function softDeleteContacto(id: number) {
  const [deleted] = await db
    .update(contactos)
    .set({
      fechaEliminado: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(contactos.id, id))
    .returning();
  
  return deleted;
}
