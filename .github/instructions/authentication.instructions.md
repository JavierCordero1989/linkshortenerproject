---
description: Lea estas instrucciones antes de implementar o modificar autenticación en la aplicación.
---

# Autenticación con Clerk

## 🔐 Regla Principal

**Toda la autenticación en esta aplicación DEBE manejarse exclusivamente con Clerk. NO se permiten otros métodos de autenticación.**

## 📋 Requisitos de Implementación

### Proveedor de Autenticación
- **Único proveedor permitido**: Clerk
- No implementar autenticación personalizada
- No usar NextAuth, Auth0, u otros proveedores

### Rutas Protegidas

#### `/dashboard`
- Ruta protegida que requiere autenticación
- Solo usuarios logueados pueden acceder
- Redirigir a modal de login si no está autenticado

### Redirecciones

#### Página de Inicio (`/`)
- **Si el usuario está logueado**: Redirigir automáticamente a `/dashboard`
- **Si NO está logueado**: Mostrar página de inicio normal

### Modalidad de Login/Registro

**IMPORTANTE**: El inicio de sesión y registro SIEMPRE debe ser mediante modal.

- ✅ Usar componentes de modal de Clerk
- ✅ Abrir modal para `<SignIn />` y `<SignUp />`
- ❌ NO usar páginas dedicadas de login/signup
- ❌ NO redirigir a rutas separadas para autenticación

## 💡 Ejemplo de Implementación

### Proteger Dashboard
```typescript
// app/dashboard/layout.tsx o middleware.ts
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/'); // O mostrar modal de login
  }
  
  return <>{children}</>;
}
```

### Redirección desde Página de Inicio
```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Contenido para usuarios no autenticados
  return <LandingPage />;
}
```

### Modal de Login/Registro
```typescript
// Componente con modal
import { SignIn, SignUp } from '@clerk/nextjs';

// Usar en modales, NO en páginas separadas
<Dialog>
  <SignIn routing="virtual" />
</Dialog>
```

## ✅ Checklist de Implementación

- [ ] Clerk configurado en el proyecto
- [ ] Variables de entorno de Clerk establecidas
- [ ] `/dashboard` protegido (solo acceso con autenticación)
- [ ] Redirección automática de `/` a `/dashboard` si usuario está logueado
- [ ] Login y registro implementados con modales
- [ ] NO existen rutas `/login` o `/signup` dedicadas
- [ ] Middleware configurado si es necesario

## 🚫 Prácticas NO Permitidas

- ❌ Implementar autenticación personalizada con JWT
- ❌ Usar otros proveedores de autenticación
- ❌ Crear páginas de login/signup en lugar de modales
- ❌ Almacenar contraseñas manualmente
- ❌ Implementar sesiones personalizadas
