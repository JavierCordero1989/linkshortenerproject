import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { articulos } from './db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function verificarArticulos() {
  console.log('🔍 Verificando artículos en la base de datos...\n');

  try {
    const allArticulos = await db.select().from(articulos);
    
    console.log(`📊 Total de artículos: ${allArticulos.length}\n`);
    
    allArticulos.forEach((articulo, index) => {
      console.log(`${index + 1}. ${articulo.nombreArticulo}`);
      console.log(`   ID: ${articulo.id}`);
      console.log(`   Fecha Registro: ${articulo.fechaRegistro?.toLocaleString()}`);
      console.log(`   Fecha Cierre: ${articulo.fechaCierre?.toLocaleString() || 'Sin cerrar'}`);
      console.log(`   Total Días: ${articulo.totalDias}`);
      console.log('');
    });

    console.log('✅ Verificación completada');
  } catch (error) {
    console.error('❌ Error al verificar artículos:', error);
    throw error;
  }

  process.exit(0);
}

verificarArticulos().catch((error) => {
  console.error('❌ Error en la verificación:', error);
  process.exit(1);
});
