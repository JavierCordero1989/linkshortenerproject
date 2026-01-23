'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createTipoVehiculo, updateTipoVehiculo, softDeleteTipoVehiculo } from '@/data/tiposVehiculo';

const createTipoVehiculoSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
});

type CreateTipoVehiculoInput = z.infer<typeof createTipoVehiculoSchema>;

type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createTipoVehiculoAction(
  input: CreateTipoVehiculoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = createTipoVehiculoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Crear el tipo de vehículo
    const newTipoVehiculo = await createTipoVehiculo({
      nombre: parsed.data.nombre,
    });

    // Revalidar la página de tipos de vehículo
    revalidatePath('/dashboard/tipos-vehiculo');

    return { 
      success: true, 
      data: { id: newTipoVehiculo.id } 
    };
  } catch (error) {
    console.error('Error creating tipo vehiculo:', error);
    return { 
      success: false, 
      error: 'Error al crear el tipo de vehículo. Por favor, intenta de nuevo.' 
    };
  }
}

const updateTipoVehiculoSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
});

type UpdateTipoVehiculoInput = z.infer<typeof updateTipoVehiculoSchema>;

export async function updateTipoVehiculoAction(
  input: UpdateTipoVehiculoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = updateTipoVehiculoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Actualizar el tipo de vehículo
    const updatedTipoVehiculo = await updateTipoVehiculo(parsed.data.id, {
      nombre: parsed.data.nombre,
    });

    // Revalidar la página de tipos de vehículo
    revalidatePath('/dashboard/tipos-vehiculo');

    return { 
      success: true, 
      data: { id: updatedTipoVehiculo.id } 
    };
  } catch (error) {
    console.error('Error updating tipo vehiculo:', error);
    return { 
      success: false, 
      error: 'Error al actualizar el tipo de vehículo. Por favor, intenta de nuevo.' 
    };
  }
}

const deleteTipoVehiculoSchema = z.object({
  id: z.number(),
});

type DeleteTipoVehiculoInput = z.infer<typeof deleteTipoVehiculoSchema>;

export async function deleteTipoVehiculoAction(
  input: DeleteTipoVehiculoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = deleteTipoVehiculoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: 'ID de tipo de vehículo inválido' 
    };
  }

  try {
    // Eliminar (soft delete) el tipo de vehículo
    const deletedTipoVehiculo = await softDeleteTipoVehiculo(parsed.data.id);

    // Revalidar la página de tipos de vehículo
    revalidatePath('/dashboard/tipos-vehiculo');

    return { 
      success: true, 
      data: { id: deletedTipoVehiculo.id } 
    };
  } catch (error) {
    console.error('Error deleting tipo vehiculo:', error);
    return { 
      success: false, 
      error: 'Error al eliminar el tipo de vehículo. Por favor, intenta de nuevo.' 
    };
  }
}
