import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { contactos } from './db/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle({ client: pool });

async function seedContactos() {
  console.log('Poblando tabla contactos con datos de prueba...');

  const datosContactos = [
    { nombre: 'Juan Pérez', numeroTelefono: '+34 612 345 678' },
    { nombre: 'María García', numeroTelefono: '+34 623 456 789' },
    { nombre: 'Carlos López', numeroTelefono: '+34 634 567 890' },
    { nombre: 'Ana Martínez', numeroTelefono: '+34 645 678 901' },
    { nombre: 'Luis Rodríguez', numeroTelefono: '+34 656 789 012' },
    { nombre: 'Elena Sánchez', numeroTelefono: '+34 667 890 123' },
    { nombre: 'Pedro Gómez', numeroTelefono: '+34 678 901 234' },
    { nombre: 'Laura Fernández', numeroTelefono: '+34 689 012 345' },
    { nombre: 'Miguel Torres', numeroTelefono: '+34 690 123 456' },
    { nombre: 'Isabel Ruiz', numeroTelefono: '+34 601 234 567' },
  ];

  try {
    await db.insert(contactos).values(datosContactos);
    console.log('✓ Se insertaron 10 contactos exitosamente');
  } catch (error) {
    console.error('Error al poblar la tabla:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedContactos();
