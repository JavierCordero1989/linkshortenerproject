import { drizzle } from 'drizzle-orm/neon-http';
import { desc, isNull, isNotNull, and, eq } from 'drizzle-orm';
import { articulos } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getArticulosPendientes() {
  return await db
    .select()
    .from(articulos)
    .where(isNull(articulos.fechaCierre))
    .orderBy(desc(articulos.fechaRegistro));
}

export async function getArticulosCerrados() {
  return await db
    .select()
    .from(articulos)
    .where(isNotNull(articulos.fechaCierre))
    .orderBy(desc(articulos.fechaRegistro));
}

export async function getArticuloPendienteByNombre(nombre: string) {
  const result = await db
    .select()
    .from(articulos)
    .where(and(
      eq(articulos.nombreArticulo, nombre),
      isNull(articulos.fechaCierre)
    ))
    .limit(1);
  
  return result[0] || null;
}

export async function createArticulo(nombre: string) {
  const result = await db
    .insert(articulos)
    .values({
      nombreArticulo: nombre,
      fechaCierre: null,
      totalDias: 0,
    })
    .returning();
  
  return result[0];
}

export async function cerrarArticulo(id: number) {
  const fechaCierre = new Date();
  
  // Obtener el artículo para calcular los días
  const articulosResult = await db
    .select()
    .from(articulos)
    .where(eq(articulos.id, id))
    .limit(1);
  
  if (articulosResult.length === 0) {
    throw new Error('Artículo no encontrado');
  }
  
  const articulo = articulosResult[0];
  
  // Validar que la fecha de registro no sea hoy
  const fechaRegistro = new Date(articulo.fechaRegistro);
  const hoy = new Date();
  
  // Comparar solo las fechas (sin horas)
  const esMismaFecha = 
    fechaRegistro.getFullYear() === hoy.getFullYear() &&
    fechaRegistro.getMonth() === hoy.getMonth() &&
    fechaRegistro.getDate() === hoy.getDate();
  
  if (esMismaFecha) {
    throw new Error('No se puede cerrar un artículo el mismo día de su registro');
  }
  
  // Calcular la diferencia en días
  const diffTime = Math.abs(fechaCierre.getTime() - fechaRegistro.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Actualizar el artículo
  const result = await db
    .update(articulos)
    .set({
      fechaCierre: fechaCierre,
      totalDias: diffDays,
    })
    .where(eq(articulos.id, id))
    .returning();
  
  return result[0];
}
