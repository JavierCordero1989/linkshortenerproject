# Instrucciones para Agentes LLM

## ⚠️ REGLA CRÍTICA - LEA PRIMERO

Este es un requisito **OBLIGATORIO** y **NO NEGOCIABLE**:

1. **ANTES** de escribir cualquier línea de código
2. **ANTES** de responder sobre arquitectura o patrones
3. **ANTES** de implementar cualquier funcionalidad

**Ignorar esta regla resultará en código inconsistente con los estándares del proyecto.**

## 🚨 IMPORTANTE: NO usar middleware.ts

**CRÍTICO**: En este proyecto NO se utiliza el archivo `middleware.ts`.

- ✅ **USAR**: `proxy.ts` - Archivo correcto para configurar Clerk middleware
- ❌ **NO USAR**: `middleware.ts` - Obsoleto en este proyecto

**Razón**: En versiones anteriores de Next.js se usaba `middleware.ts`, pero en este proyecto se utiliza `proxy.ts` para el middleware de Clerk. Si necesitas configurar middleware, SIEMPRE modifica `proxy.ts`, nunca crees o modifiques `middleware.ts`.