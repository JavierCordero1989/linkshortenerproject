---
description: Lea estas instrucciones antes de implementar o modificar acciones del servidor y mutaciones de datos en la aplicación.
---

# Instrucciones para Acciones del Servidor y Mutaciones de Datos

## Reglas Fundamentales

### 1. Mutaciones de Datos

**TODAS** las mutaciones de datos en esta aplicación **DEBEN** hacerse a través de acciones del servidor.

### 2. Ubicación de Archivos

- Los archivos de acción del servidor **DEBEN** llamarse `actions.ts`
- **DEBEN** colocarse en el directorio del componente que llama la acción
- Ejemplo: Si `components/dashboard/LinkForm.tsx` necesita una acción, crear `components/dashboard/actions.ts`

### 3. Llamadas desde Componentes

- Las acciones del servidor deben ser llamadas desde **componentes del cliente**
- Usar directiva `'use client'` en el componente que invoca la acción

### 4. Tipado de Datos

**NO USE** el tipo `FormData` de TypeScript.

**SIEMPRE** defina tipos TypeScript apropiados para los datos:

```typescript
// ✅ CORRECTO
type CreateLinkInput = {
  url: string;
  shortCode?: string;
};

// ❌ INCORRECTO
async function createLink(formData: FormData) { ... }
```

### 5. Validación con Zod

**TODOS** los datos pasados a acciones del servidor **DEBEN** ser validados mediante Zod:

```typescript
'use server';

import { z } from 'zod';

const createLinkSchema = z.object({
  url: z.string().url(),
  shortCode: z.string().optional(),
});

export async function createLink(input: unknown) {
  const parsed = createLinkSchema.safeParse(input);
  
  if (!parsed.success) {
    return { success: false, error: 'Datos inválidos' };
  }
  
  const validatedData = parsed.data;
  // ...
}
```

### 6. Verificación de Autenticación

**TODAS** las acciones del servidor **DEBEN** verificar que el usuario esté logueado **ANTES** de realizar operaciones de base de datos.

**ESTO ES OBLIGATORIO PARA:**
- ✅ Crear registros (INSERT)
- ✅ Modificar registros (UPDATE)
- ✅ Eliminar registros (DELETE)
- ✅ Listar/leer datos (SELECT)

**SIN EXCEPCIONES**: La aplicación **NO** debe permitir realizar **NINGUNA** operación de base de datos sin un usuario autenticado.

```typescript
import { auth } from '@clerk/nextjs/server';

export async function createLink(input: unknown) {
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }
  
  // Continuar con la lógica...
}
```

### 7. Manejo de Errores

**NO** lanzar errores en acciones del servidor usando `throw`.

**SIEMPRE** retornar un objeto que denote éxito o error:

```typescript
// ❌ INCORRECTO
export async function createLink(input: CreateLinkInput) {
  if (!input.url) {
    throw new Error('URL requerida');
  }
}

// ✅ CORRECTO
export async function createLink(input: CreateLinkInput) {
  if (!input.url) {
    return { success: false, error: 'URL requerida' };
  }
  
  // Lógica exitosa
  return { success: true, data: result };
}
```

**Estructura de respuesta recomendada:**

```typescript
// Respuesta de error
type ErrorResponse = {
  success: false;
  error: string;
};

// Respuesta exitosa
type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ActionResponse<T> = SuccessResponse<T> | ErrorResponse;
```

### 8. Operaciones de Base de Datos

**NO** usar queries de Drizzle directamente en acciones del servidor.

**SIEMPRE** usar funciones de ayuda ubicadas en la carpeta `/data`:

```typescript
// ❌ INCORRECTO - En actions.ts
import { db } from '@/db';
import { links } from '@/db/schema';

export async function createLink(input: CreateLinkInput) {
  const result = await db.insert(links).values(...);
}

// ✅ CORRECTO - En actions.ts
import { createLinkInDb } from '@/data/links';

export async function createLink(input: CreateLinkInput) {
  const result = await createLinkInDb(...);
}
```

## Estructura de una Acción del Servidor

```typescript
'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { functionFromDataLayer } from '@/data/resource';

// 1. Definir schema de validación
const inputSchema = z.object({
  // campos...
});

// 2. Definir tipo TypeScript
type Input = z.infer<typeof inputSchema>;

// 3. Definir tipo de respuesta
type ActionResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// 4. Implementar acción
export async function serverAction(input: Input): Promise<ActionResponse<ResultType>> {
  // 5. Validar entrada
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: 'Datos inválidos' };
  }
  
  // 6. Verificar autenticación
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'No autenticado' };
  }
  
  // 7. Manejar operaciones con try-catch
  try {
    // 8. Llamar función de capa de datos
    const result = await functionFromDataLayer(parsed.data);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: 'Error al procesar la solicitud' };
  }
}
```

## Checklist

Antes de crear o modificar una acción del servidor, verifique:

- [ ] El archivo se llama `actions.ts`
- [ ] Está en el directorio del componente que lo usa
- [ ] Tiene directiva `'use server'`
- [ ] Define schemas de validación Zod
- [ ] Usa tipos TypeScript (no `FormData`)
- [ ] Verifica autenticación del usuario
- [ ] Usa funciones de `/data` (no queries directas)
- [ ] Es llamado desde un componente cliente
- [ ] Retorna objeto con `success` y `data`/`error` (no usa `throw`)
- [ ] Maneja errores con try-catch y retorna respuesta apropiada
