'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { createLink, checkShortCodeExists, updateLink, deleteLink, getLinkById } from '@/data/links';
import { revalidatePath } from 'next/cache';

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: 'URL inválida' }),
  shortCode: z
    .string()
    .min(3, { message: 'El código debe tener al menos 3 caracteres' })
    .max(20, { message: 'El código no puede tener más de 20 caracteres' })
    .regex(/^[a-zA-Z0-9-_]+$/, { 
      message: 'Solo se permiten letras, números, guiones y guiones bajos' 
    }),
  title: z.string().optional(),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export async function createLinkAction(
  input: CreateLinkInput
): Promise<ActionResponse<{ id: number; shortCode: string }>> {
  // Validar entrada
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  try {
    // Verificar si el código corto ya existe
    const exists = await checkShortCodeExists(parsed.data.shortCode);
    if (exists) {
      return { 
        success: false, 
        error: 'Este código corto ya está en uso' 
      };
    }

    // Crear el enlace
    const newLink = await createLink({
      userId,
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.shortCode,
      title: parsed.data.title || null,
      expiresAt: null,
    });

    // Revalidar la página del dashboard
    revalidatePath('/dashboard');

    return { 
      success: true, 
      data: { 
        id: newLink.id, 
        shortCode: newLink.shortCode 
      } 
    };
  } catch (error) {
    console.error('Error creating link:', error);
    return { 
      success: false, 
      error: 'Error al crear el enlace. Por favor, intenta de nuevo.' 
    };
  }
}

const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url({ message: 'URL inválida' }),
  shortCode: z
    .string()
    .min(3, { message: 'El código debe tener al menos 3 caracteres' })
    .max(20, { message: 'El código no puede tener más de 20 caracteres' })
    .regex(/^[a-zA-Z0-9-_]+$/, { 
      message: 'Solo se permiten letras, números, guiones y guiones bajos' 
    }),
  title: z.string().optional(),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<ActionResponse<{ id: number; shortCode: string }>> {
  // Validar entrada
  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  try {
    // Verificar que el enlace existe y pertenece al usuario
    const existingLink = await getLinkById(parsed.data.id);
    if (!existingLink) {
      return { success: false, error: 'Enlace no encontrado' };
    }
    
    if (existingLink.userId !== userId) {
      return { success: false, error: 'No autorizado' };
    }

    // Verificar si el código corto cambió y si ya existe
    if (parsed.data.shortCode !== existingLink.shortCode) {
      const exists = await checkShortCodeExists(parsed.data.shortCode);
      if (exists) {
        return { 
          success: false, 
          error: 'Este código corto ya está en uso' 
        };
      }
    }

    // Actualizar el enlace
    const updatedLink = await updateLink(parsed.data.id, userId, {
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.shortCode,
      title: parsed.data.title || null,
    });

    // Revalidar la página del dashboard
    revalidatePath('/dashboard');

    return { 
      success: true, 
      data: { 
        id: updatedLink.id, 
        shortCode: updatedLink.shortCode 
      } 
    };
  } catch (error) {
    console.error('Error updating link:', error);
    return { 
      success: false, 
      error: 'Error al actualizar el enlace. Por favor, intenta de nuevo.' 
    };
  }
}

const deleteLinkSchema = z.object({
  id: z.number(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<ActionResponse<{ id: number }>> {
  // Validar entrada
  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0]?.message || 'Datos inválidos' 
    };
  }

  // Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }

  try {
    // Verificar que el enlace existe y pertenece al usuario
    const existingLink = await getLinkById(parsed.data.id);
    if (!existingLink) {
      return { success: false, error: 'Enlace no encontrado' };
    }
    
    if (existingLink.userId !== userId) {
      return { success: false, error: 'No autorizado' };
    }

    // Eliminar el enlace
    await deleteLink(parsed.data.id, userId);

    // Revalidar la página del dashboard
    revalidatePath('/dashboard');

    return { 
      success: true, 
      data: { 
        id: parsed.data.id 
      } 
    };
  } catch (error) {
    console.error('Error deleting link:', error);
    return { 
      success: false, 
      error: 'Error al eliminar el enlace. Por favor, intenta de nuevo.' 
    };
  }
}
