---
description: LEER OBLIGATORIAMENTE al revisar Pull Requests. Define las validaciones críticas de seguridad, calidad de código y buenas prácticas que DEBEN cumplirse antes de aprobar cambios.
applyTo: '**/*'
---

# Revisión de Pull Requests

## 🚨 REGLA CRÍTICA

Este archivo **DEBE** leerse y aplicarse al revisar **CUALQUIER** Pull Request antes de su aprobación.

## 🛡️ Prioridad de Seguridad

La **seguridad** debe ser la prioridad principal en la revisión de cualquier Pull Request. Ningún cambio que comprometa la seguridad será aceptado, aunque cumpla otros estándares.

## ❌ VALIDACIONES OBLIGATORIAS - RECHAZO AUTOMÁTICO

Las siguientes condiciones **NUNCA** deben permitirse. Si se detectan, el PR **DEBE** ser rechazado:

### 1. Bloques try-catch Vacíos

**PROHIBIDO**: Bloques try-catch con catch vacío o sin manejo de errores.

```typescript
// ❌ PROHIBIDO - Catch vacío
try {
  await someOperation();
} catch (error) {
  // Sin manejo
}

// ❌ PROHIBIDO - Catch con solo comentario
try {
  await someOperation();
} catch (error) {
  // TODO: manejar esto después
}

// ✅ PERMITIDO - Manejo explícito del error
try {
  await someOperation();
} catch (error) {
  console.error('Error en operación:', error);
  return { success: false, error: 'Error al procesar' };
}

// ✅ PERMITIDO - Ignorar error intencionalmente con justificación
try {
  await optionalOperation();
} catch (error) {
  // Ignoramos intencionalmente: esta operación es opcional y no afecta el flujo principal
}
```

**Acción requerida**: Solicitar que se añada manejo apropiado del error o justificación explícita.

### 2. Código Comentado

**PROHIBIDO**: Código comentado en los archivos.

```typescript
// ❌ PROHIBIDO - Código comentado
export function createLink() {
  // const oldImplementation = () => {
  //   return db.query.links.findFirst();
  // };
  
  return newImplementation();
}

// ❌ PROHIBIDO - Bloque grande de código comentado
// async function deprecatedFunction() {
//   const result = await fetch('/api/old-endpoint');
//   return result.json();
// }

// ✅ PERMITIDO - Comentarios explicativos
export function createLink() {
  // Validamos el formato de la URL antes de guardar
  if (!isValidUrl(url)) {
    return { error: 'URL inválida' };
  }
  
  return newImplementation();
}
```

**Acción requerida**: Solicitar que se elimine todo el código comentado. Si se necesita historial, usar Git.

### 3. Variables de Ambiente y Datos Sensibles

**PROHIBIDO**: Archivos con variables de ambiente, credenciales o datos sensibles.

```bash
# ❌ PROHIBIDO - Archivo .env en el repositorio
.env
.env.local
.env.production

# ❌ PROHIBIDO - Archivos con credenciales
config/credentials.json
secrets.yaml
api-keys.txt
```

```typescript
// ❌ PROHIBIDO - Credenciales hardcodeadas
const API_KEY = "[API_KEY_REDACTADA]";
const DATABASE_URL = "postgresql://user:pass@host:5432/db";

// ❌ PROHIBIDO - Datos sensibles en el código
const employee = {
  email: "jgarcia@empresa.com",
  ssn: "123-45-6789"
};

// ✅ PERMITIDO - Usar variables de ambiente
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// ✅ PERMITIDO - Datos de prueba ficticios
const testEmployee = {
  email: "usuario@ejemplo.com",
  ssn: "000-00-0000"
};
```

**Archivos que NUNCA deben estar en el repo**:
- `.env`, `.env.local`, `.env.production`, `.env.development`
- Archivos con extensiones: `.pem`, `.key`, `.p12`, `.pfx`
- `secrets.json`, `credentials.json`, `api-keys.txt`

**Acción requerida**: 
1. Solicitar eliminación inmediata del archivo/código
2. Rotar credenciales expuestas
3. Verificar que esté en `.gitignore`

## ✅ BUENAS PRÁCTICAS A VALIDAR

### 4. Consistencia con Estándares del Proyecto

Verificar que el código cumple con:

- **Conventional Commits**: Mensajes de commit en español siguiendo el formato establecido
- **Nota**: Si algún commit no cumple el estándar, debe informarse en la revisión, pero esto **no es bloqueante** para aprobar el PR.
- **Autenticación**: Solo usar Clerk, nunca autenticación personalizada
- **Componentes UI**: Solo shadcn/ui, no componentes personalizados
- **Server Actions**: 
  - Archivo llamado `actions.ts` en el directorio apropiado
  - Validación con Zod
  - No usar `FormData` nativo
  - Retornar objetos `{ success, data/error }`, no usar `throw`
- **Data Fetching**: Usar funciones de `/data`, no queries directas en componentes

### 5. Calidad de Código

- [ ] **Nombres descriptivos**: Variables y funciones con nombres claros
- [ ] **Funciones pequeñas**: Funciones no superiores a 50 líneas (idealmente <30)
- [ ] **DRY (Don't Repeat Yourself)**: No hay código duplicado
- [ ] **Tipado correcto**: TypeScript sin uso de `any` (salvo justificado)
- [ ] **Imports organizados**: Sin imports no usados
- [ ] **Console.log removidos**: No hay console.log de debug (salvo logging intencional)
- [ ] **TODOs justificados**: Si hay TODOs, deben tener contexto y issue asociado

### 6. Seguridad

- [ ] **Validación de entrada**: Todo input del usuario está validado
- [ ] **Autenticación verificada**: Server actions verifican `auth()` antes de operaciones
- [ ] **SQL Injection**: Se usa ORM (Drizzle), no queries crudas con concatenación
- [ ] **XSS Prevention**: No hay `dangerouslySetInnerHTML` sin sanitización

### 7. Performance

- [ ] **Componentes de servidor**: Se usan Server Components cuando es posible
- [ ] **Optimización de imágenes**: Uso de `next/image` para imágenes
- [ ] **Lazy loading**: Componentes pesados cargados dinámicamente si aplica
- [ ] **Memoización apropiada**: Uso correcto de `useMemo`/`useCallback` si es necesario

### 8. Testing (Si Aplica)

- [ ] **Tests actualizados**: Si se modificó lógica, tests correspondientes actualizados
- [ ] **Tests pasan**: Todos los tests existentes pasan
- [ ] **Cobertura**: Código crítico tiene tests

## 🔍 Checklist Completa de Revisión

Antes de aprobar un PR, verificar:

### Seguridad Crítica
- [ ] ❌ NO hay bloques try-catch vacíos
- [ ] ❌ NO hay código comentado
- [ ] ❌ NO hay archivos .env o variables sensibles
- [ ] ✅ Variables de ambiente correctamente usadas
- [ ] ✅ Datos sensibles reemplazados por placeholders en ejemplos

### Estándares del Proyecto
- [ ] ✅ Sigue las instrucciones de `.github/instructions/`
- [ ] ✅ Commits siguen Conventional Commits en español
- [ ] ✅ Componentes UI usan shadcn/ui
- [ ] ✅ Server actions siguen el patrón establecido
- [ ] ✅ Data fetching usa funciones de `/data`

### Calidad de Código
- [ ] ✅ Nombres descriptivos y claros
- [ ] ✅ Funciones pequeñas y enfocadas
- [ ] ✅ Sin código duplicado
- [ ] ✅ TypeScript correctamente tipado
- [ ] ✅ Sin imports no usados
- [ ] ✅ Sin console.log de debug

### Funcionalidad
- [ ] ✅ El código hace lo que describe el PR
- [ ] ✅ No hay regresiones o bugs introducidos
- [ ] ✅ Funcionalidad probada manualmente

## 📝 Feedback al Desarrollador

Cuando solicites cambios, sé específico y constructivo:

**Recomendación:** Al proponer cambios, indica de manera resumida el cambio solicitado y explica brevemente el porqué. Esto facilita la comprensión y agiliza la revisión.

### ❌ Feedback Vago
```
"Mejorar el código"
"No cumple estándares"
```

### ✅ Feedback Específico
```
"Por favor, elimina el código comentado en las líneas 45-52 de `actions.ts`. 
Si necesitas referencia histórica, puedes encontrarlo en el historial de Git."

"El bloque try-catch en la línea 78 tiene el catch vacío. 
Por favor, añade manejo del error retornando un objeto con 
{ success: false, error: 'mensaje descriptivo' }."

"Detecté la variable API_KEY hardcodeada en la línea 23. 
Por favor, usa process.env.API_KEY y asegúrate de que la 
clave real no esté en el repositorio."
```

## 🚀 Aprobación del PR

Un PR solo puede aprobarse cuando:

1. ✅ Todas las validaciones obligatorias pasan
2. ✅ No hay código comentado ni try-catch vacíos
3. ✅ No hay datos sensibles expuestos
4. ✅ Cumple con los estándares del proyecto
5. ✅ El código es de calidad y está bien estructurado
6. ✅ La funcionalidad fue probada

**RECUERDA**: Es mejor solicitar cambios que aprobar código que no cumpla con los estándares. La calidad y seguridad del código es responsabilidad de todos.
