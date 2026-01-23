'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { createRegistroGasolina } from '@/data/registrosGasolina';

const createRegistroGasolinaSchema = z.object({
  idEstacionServicio: z.number({ message: 'La estación de servicio es requerida' }).positive({ message: 'ID de estación de servicio inválido' }),
  idTipoVehiculo: z.number({ message: 'El tipo de vehículo es requerido' }).positive({ message: 'ID de tipo de vehículo inválido' }),
  kilometrajeActual: z.number({ message: 'El kilometraje es requerido' }).int().positive({ message: 'El kilometraje debe ser positivo' }),
  litrosCargados: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Los litros cargados deben ser un número positivo',
  }).transform((val) => val),
  montoCargado: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number.isInteger(Number(val)), {
    message: 'El monto cargado debe ser un número entero positivo',
  }).transform((val) => val),
});

type CreateRegistroGasolinaInput = z.infer<typeof createRegistroGasolinaSchema>;

type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createRegistroGasolinaAction(
  input: CreateRegistroGasolinaInput
): Promise<ActionResponse<{ id: number }>> {
  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  // Validar entrada
  const parsed = createRegistroGasolinaSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Calcular el precio por litro en el servidor
    const precioPorLitro = (Number(parsed.data.montoCargado) / Number(parsed.data.litrosCargados)).toFixed(2);

    // Crear el registro de gasolina
    const newRegistro = await createRegistroGasolina({
      idEstacionServicio: parsed.data.idEstacionServicio,
      idTipoVehiculo: parsed.data.idTipoVehiculo,
      kilometrajeActual: parsed.data.kilometrajeActual,
      litrosCargados: parsed.data.litrosCargados,
      montoCargado: parsed.data.montoCargado,
      precioPorLitro: precioPorLitro,
    });

    // Revalidar la página de registros de gasolina
    revalidatePath('/dashboard/registros-gasolina');

    return { 
      success: true, 
      data: { id: newRegistro.id } 
    };
  } catch (error) {
    console.error('Error creating registro gasolina:', error);
    return { 
      success: false, 
      error: 'Error al crear el registro de gasolina. Por favor, intenta de nuevo.' 
    };
  }
}
