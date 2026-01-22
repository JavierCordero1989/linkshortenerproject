import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { articulos } from './db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seedArticulos() {
  console.log('🌱 Insertando artículos en la base de datos...');

  const articulosData = [
    {
      nombreArticulo: 'Laptop Dell XPS 15',
      fechaRegistro: new Date('2026-01-10T09:30:00'),
      fechaCierre: new Date('2026-01-20T17:00:00'),
      totalDias: 10,
    },
    {
      nombreArticulo: 'Monitor Samsung 27"',
      fechaRegistro: new Date('2026-01-15T14:20:00'),
      fechaCierre: null,
      totalDias: 0,
    },
    {
      nombreArticulo: 'Teclado Mecánico RGB',
      fechaRegistro: new Date('2026-01-12T11:45:00'),
      fechaCierre: new Date('2026-01-19T16:30:00'),
      totalDias: 7,
    },
    {
      nombreArticulo: 'Mouse Inalámbrico Logitech',
      fechaRegistro: new Date('2026-01-18T10:15:00'),
      fechaCierre: null,
      totalDias: 0,
    },
    {
      nombreArticulo: 'Webcam HD 1080p',
      fechaRegistro: new Date('2026-01-08T08:00:00'),
      fechaCierre: new Date('2026-01-22T12:00:00'),
      totalDias: 14,
    },
  ];

  try {
    const insertedArticulos = await db.insert(articulos).values(articulosData).returning();
    console.log(`✅ ${insertedArticulos.length} artículos insertados correctamente`);
    
    insertedArticulos.forEach((articulo) => {
      console.log(`  - ${articulo.nombreArticulo} (ID: ${articulo.id})`);
    });
  } catch (error) {
    console.error('❌ Error al insertar artículos:', error);
    throw error;
  }

  process.exit(0);
}

seedArticulos().catch((error) => {
  console.error('❌ Error en el proceso de seed:', error);
  process.exit(1);
});
