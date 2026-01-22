'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createContacto, updateContacto, softDeleteContacto } from '@/data/contactos';

const createContactoSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }).max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  numeroTelefono: z.string().max(20, { message: 'El número de teléfono no puede tener más de 20 caracteres' }).optional(),
});

type CreateContactoInput = z.infer<typeof createContactoSchema>;

type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createContactoAction(
  input: CreateContactoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = createContactoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Crear el contacto
    const newContacto = await createContacto({
      nombre: parsed.data.nombre,
      numeroTelefono: parsed.data.numeroTelefono || null,
    });

    // Revalidar la página de contactos
    revalidatePath('/dashboard/contactos');

    return { 
      success: true, 
      data: { id: newContacto.id } 
    };
  } catch (error) {
    console.error('Error creating contacto:', error);
    return { 
      success: false, 
      error: 'Error al crear el contacto. Por favor, intenta de nuevo.' 
    };
  }
}

const updateContactoSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, { message: 'El nombre es requerido' }).max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  numeroTelefono: z.string().max(20, { message: 'El número de teléfono no puede tener más de 20 caracteres' }).optional(),
});

type UpdateContactoInput = z.infer<typeof updateContactoSchema>;

export async function updateContactoAction(
  input: UpdateContactoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = updateContactoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  try {
    // Actualizar el contacto
    const updatedContacto = await updateContacto(parsed.data.id, {
      nombre: parsed.data.nombre,
      numeroTelefono: parsed.data.numeroTelefono || null,
    });

    // Revalidar la página de contactos
    revalidatePath('/dashboard/contactos');

    return { 
      success: true, 
      data: { id: updatedContacto.id } 
    };
  } catch (error) {
    console.error('Error updating contacto:', error);
    return { 
      success: false, 
      error: 'Error al actualizar el contacto. Por favor, intenta de nuevo.' 
    };
  }
}

const deleteContactoSchema = z.object({
  id: z.number(),
});

type DeleteContactoInput = z.infer<typeof deleteContactoSchema>;

export async function deleteContactoAction(
  input: DeleteContactoInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = deleteContactoSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: 'ID de contacto inválido' 
    };
  }

  try {
    // Eliminar (soft delete) el contacto
    const deletedContacto = await softDeleteContacto(parsed.data.id);

    // Revalidar la página de contactos
    revalidatePath('/dashboard/contactos');

    return { 
      success: true, 
      data: { id: deletedContacto.id } 
    };
  } catch (error) {
    console.error('Error deleting contacto:', error);
    return { 
      success: false, 
      error: 'Error al eliminar el contacto. Por favor, intenta de nuevo.' 
    };
  }
}
