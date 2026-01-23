'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { createEstacionServicio, updateEstacionServicio, softDeleteEstacionServicio } from '@/data/estacionesServicio';

const createEstacionServicioSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  ubicacion: z.string().min(1, { message: 'La ubicación es requerida' }),
});

type CreateEstacionServicioInput = z.infer<typeof createEstacionServicioSchema>;

type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createEstacionServicioAction(
  input: CreateEstacionServicioInput
): Promise<ActionResponse<{ id: number }>> {
  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  // Validar entrada
  const parsed = createEstacionServicioSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Crear la estación de servicio
    const newEstacionServicio = await createEstacionServicio({
      nombre: parsed.data.nombre,
      ubicacion: parsed.data.ubicacion,
    });

    // Revalidar la página de estaciones de servicio
    revalidatePath('/dashboard/estaciones-servicio');

    return { 
      success: true, 
      data: { id: newEstacionServicio.id } 
    };
  } catch (error) {
    console.error('Error creating estacion servicio:', error);
    return { 
      success: false, 
      error: 'Error al crear la estación de servicio. Por favor, intenta de nuevo.' 
    };
  }
}

const updateEstacionServicioSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  ubicacion: z.string().min(1, { message: 'La ubicación es requerida' }),
});

type UpdateEstacionServicioInput = z.infer<typeof updateEstacionServicioSchema>;

export async function updateEstacionServicioAction(
  input: UpdateEstacionServicioInput
): Promise<ActionResponse<{ id: number }>> {
  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  // Validar entrada
  const parsed = updateEstacionServicioSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Actualizar la estación de servicio
    const updatedEstacionServicio = await updateEstacionServicio(parsed.data.id, {
      nombre: parsed.data.nombre,
      ubicacion: parsed.data.ubicacion,
    });

    // Revalidar la página de estaciones de servicio
    revalidatePath('/dashboard/estaciones-servicio');

    return { 
      success: true, 
      data: { id: updatedEstacionServicio.id } 
    };
  } catch (error) {
    console.error('Error updating estacion servicio:', error);
    return { 
      success: false, 
      error: 'Error al actualizar la estación de servicio. Por favor, intenta de nuevo.' 
    };
  }
}

const deleteEstacionServicioSchema = z.object({
  id: z.number(),
});

type DeleteEstacionServicioInput = z.infer<typeof deleteEstacionServicioSchema>;

export async function deleteEstacionServicioAction(
  input: DeleteEstacionServicioInput
): Promise<ActionResponse<{ id: number }>> {
  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  // Validar entrada
  const parsed = deleteEstacionServicioSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: 'ID de estación de servicio inválido' 
    };
  }

  try {
    // Eliminar (soft delete) la estación de servicio
    const deletedEstacionServicio = await softDeleteEstacionServicio(parsed.data.id);

    // Revalidar la página de estaciones de servicio
    revalidatePath('/dashboard/estaciones-servicio');

    return { 
      success: true, 
      data: { id: deletedEstacionServicio.id } 
    };
  } catch (error) {
    console.error('Error deleting estacion servicio:', error);
    return { 
      success: false, 
      error: 'Error al eliminar la estación de servicio. Por favor, intenta de nuevo.' 
    };
  }
}
