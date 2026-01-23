import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { registrosGasolina, estacionesServicio, tiposVehiculo } from '@/db/schema';
import type { NewRegistroGasolina } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllRegistrosGasolina() {
  return await db
    .select({
      id: registrosGasolina.id,
      estacionServicio: {
        id: estacionesServicio.id,
        nombre: estacionesServicio.nombre,
        ubicacion: estacionesServicio.ubicacion,
      },
      tipoVehiculo: {
        id: tiposVehiculo.id,
        nombre: tiposVehiculo.nombre,
      },
      kilometrajeActual: registrosGasolina.kilometrajeActual,
      litrosCargados: registrosGasolina.litrosCargados,
      montoCargado: registrosGasolina.montoCargado,
      precioPorLitro: registrosGasolina.precioPorLitro,
      fechaCarga: registrosGasolina.fechaCarga,
    })
    .from(registrosGasolina)
    .innerJoin(estacionesServicio, eq(registrosGasolina.idEstacionServicio, estacionesServicio.id))
    .innerJoin(tiposVehiculo, eq(registrosGasolina.idTipoVehiculo, tiposVehiculo.id))
    .orderBy(desc(registrosGasolina.fechaCarga));
}

export async function createRegistroGasolina(data: NewRegistroGasolina) {
  const [newRegistro] = await db
    .insert(registrosGasolina)
    .values(data)
    .returning();
  
  return newRegistro;
}
