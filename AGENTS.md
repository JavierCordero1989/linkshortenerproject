# Instrucciones para Agentes LLM

## ⚠️ REGLA CRÍTICA - LEA PRIMERO

**NUNCA genere código sin leer primero la documentación relevante en `/docs`.**

Este es un requisito **OBLIGATORIO** y **NO NEGOCIABLE**:

1. **ANTES** de escribir cualquier línea de código
2. **ANTES** de responder sobre arquitectura o patrones
3. **ANTES** de implementar cualquier funcionalidad

Debe leer los archivos `.md` correspondientes en el directorio `/docs`.

**Ignorar esta regla resultará en código inconsistente con los estándares del proyecto.**

## 🚨 IMPORTANTE: NO usar middleware.ts

**CRÍTICO**: En este proyecto NO se utiliza el archivo `middleware.ts`.

- ✅ **USAR**: `proxy.ts` - Archivo correcto para configurar Clerk middleware
- ❌ **NO USAR**: `middleware.ts` - Obsoleto en este proyecto

**Razón**: En versiones anteriores de Next.js se usaba `middleware.ts`, pero en este proyecto se utiliza `proxy.ts` para el middleware de Clerk. Si necesitas configurar middleware, SIEMPRE modifica `proxy.ts`, nunca crees o modifiques `middleware.ts`.

---

## 📚 Documentación Disponible

Toda la documentación para agentes LLM está organizada en archivos separados en el directorio `/docs`.

## 🚀 Inicio Rápido

**OBLIGATORIO**: Antes de trabajar en este proyecto, lee estos documentos en orden:

1. **Primero**: [docs/project-overview.md](./docs/project-overview.md) para entender el proyecto
2. **Luego**: [docs/coding-standards.md](./docs/coding-standards.md) para conocer las convenciones
3. **Cuando implementes**: [docs/implementation-guide.md](./docs/implementation-guide.md) como referencia

**NO omitas este paso**. La documentación contiene información crítica sobre patrones, convenciones y arquitectura que **DEBES** seguir.

## 🎯 Por Tipo de Tarea

### Implementar Autenticación
→ [docs/authentication.md](./docs/authentication.md)

### Componentes de UI
→ [docs/ui-components.md](./docs/ui-components.md)

---

**Nota**: Esta es la única instrucción en el directorio raíz. Toda la documentación detallada está en `/docs` para mejor organización.
