'use server';

import { z } from 'zod';
import { getArticuloPendienteByNombre, createArticulo, cerrarArticulo } from '@/data/articulos';
import { revalidatePath } from 'next/cache';

const createArticuloSchema = z.object({
  nombreArticulo: z.string().min(1, 'El nombre del artículo es requerido').max(50, 'El nombre no puede exceder 50 caracteres'),
});

type CreateArticuloInput = {
  nombreArticulo: string;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type SuccessResponse = {
  success: true;
  data: {
    id: number;
    nombreArticulo: string;
  };
};

type ActionResponse = SuccessResponse | ErrorResponse;

export async function createArticuloAction(input: CreateArticuloInput): Promise<ActionResponse> {
  const parsed = createArticuloSchema.safeParse(input);
  
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0].message 
    };
  }
  
  const { nombreArticulo } = parsed.data;
  
  try {
    // Verificar si ya existe un artículo pendiente con el mismo nombre
    const existingArticulo = await getArticuloPendienteByNombre(nombreArticulo);
    
    if (existingArticulo) {
      return {
        success: false,
        error: `Ya existe un artículo pendiente con el nombre "${nombreArticulo}"`
      };
    }
    
    // Crear el artículo
    const articulo = await createArticulo(nombreArticulo);
    
    // Revalidar la página para mostrar los cambios
    revalidatePath('/dashboard/articulos');
    
    return {
      success: true,
      data: {
        id: articulo.id,
        nombreArticulo: articulo.nombreArticulo,
      },
    };
  } catch (error) {
    console.error('Error al crear artículo:', error);
    return {
      success: false,
      error: 'Ocurrió un error al crear el artículo',
    };
  }
}

const cerrarArticuloSchema = z.object({
  id: z.number().positive('ID inválido'),
});

type CerrarArticuloInput = {
  id: number;
};

type CerrarArticuloSuccessResponse = {
  success: true;
  data: {
    id: number;
    nombreArticulo: string;
    totalDias: number;
  };
};

type CerrarArticuloResponse = CerrarArticuloSuccessResponse | ErrorResponse;

export async function cerrarArticuloAction(input: CerrarArticuloInput): Promise<CerrarArticuloResponse> {
  const parsed = cerrarArticuloSchema.safeParse(input);
  
  if (!parsed.success) {
    return { 
      success: false, 
      error: parsed.error.issues[0].message 
    };
  }
  
  const { id } = parsed.data;
  
  try {
    // Cerrar el artículo
    const articulo = await cerrarArticulo(id);
    
    // Revalidar las páginas de artículos
    revalidatePath('/dashboard/articulos');
    revalidatePath('/dashboard/articulos/cerrados');
    
    return {
      success: true,
      data: {
        id: articulo.id,
        nombreArticulo: articulo.nombreArticulo,
        totalDias: articulo.totalDias,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ocurrió un error al cerrar el artículo',
    };
  }
}
