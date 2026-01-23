---
description: Leer antes de generar mensajes de commit. Define el estándar de Conventional Commits en español para la generación automática de versiones semánticas.
applyTo: '**/*'
---

# Mensajes de Commit - Conventional Commits en Español

## 🎯 Regla de Oro

**TODOS los mensajes de commit DEBEN seguir Conventional Commits y estar en español. Sin embargo, esto no es bloqueante para la aprobación del PR, pero considere su uso para que, en el futuro, esto sea una REGLA OBLIGATORIA.**

## 📋 Formato Requerido

```
<tipo>(<ámbito>): <descripción>

[cuerpo opcional]

[nota al pie opcional]
```

## 🏷️ Tipos Permitidos

| Tipo | Descripción | Afecta Versión |
|------|-------------|----------------|
| `feat` | Nueva funcionalidad | MINOR (0.X.0) |
| `fix` | Corrección de error | PATCH (0.0.X) |
| `docs` | Solo documentación | - |
| `style` | Formato de código (sin cambios lógicos) | - |
| `refactor` | Refactorización sin cambiar funcionalidad | - |
| `perf` | Mejora de rendimiento | PATCH |
| `test` | Añadir o modificar tests | - |
| `build` | Sistema de build o dependencias | - |
| `ci` | Configuración de CI/CD | - |
| `chore` | Tareas de mantenimiento | - |
| `revert` | Revertir commit anterior | - |

**BREAKING CHANGE**: Añadir `!` después del tipo/ámbito o en el footer → MAJOR (X.0.0)

## ✅ Reglas de Formato

1. **Idioma**: SIEMPRE español
2. **Descripción**: minúsculas, sin punto final, máximo 72 caracteres
3. **Verbo**: tiempo presente imperativo ("añade" no "añadido" ni "añadió")
4. **Ámbito**: opcional, en minúsculas, indica componente/módulo afectado
5. **Breaking changes**: usar `!` o `BREAKING CHANGE:` en el footer

## 📝 Ejemplos

### Commits Básicos
```
feat(sidebar): añade funcionalidad de colapsar menú
fix(auth): corrige redirección después del login
docs(readme): actualiza instrucciones de instalación
style(dashboard): mejora indentación y espaciado
refactor(links): simplifica lógica de validación de URLs
```

### Con Ámbito y Cuerpo
```
feat(api): añade endpoint para eliminar enlaces

Implementa DELETE /api/links/:id con validación
de permisos y soft delete en la base de datos.
```

### Breaking Changes
```
feat(auth)!: cambia flujo de autenticación a OAuth2

BREAKING CHANGE: Se elimina el soporte para autenticación
con usuario y contraseña. Ahora solo se soporta OAuth2.
```

## ❌ Ejemplos Incorrectos

```
❌ Added new feature (inglés)
❌ feat: Añade sidebar (mayúscula inicial)
❌ feat: añade sidebar. (punto final)
❌ feat: Se añadió el sidebar (tiempo pasado)
❌ feat añade sidebar (falta dos puntos)
```

## 💡 Checklist de Validación

- [ ] Tipo de commit es válido según la tabla
- [ ] Descripción en español, minúsculas, sin punto final
- [ ] Verbo en presente imperativo
- [ ] Ámbito apropiado si aplica
- [ ] Breaking change marcado con `!` o en footer si aplica
- [ ] Descripción clara y concisa (≤72 caracteres)
