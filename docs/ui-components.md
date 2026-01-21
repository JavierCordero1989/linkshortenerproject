# Componentes UI con shadcn/ui

## 🎨 Regla Principal

**TODOS los componentes de UI en esta aplicación DEBEN usar shadcn/ui. NO se permite crear componentes personalizados.**

## 📋 Requisitos de Implementación

### Sistema de Componentes
- **Único sistema permitido**: shadcn/ui
- NO crear componentes UI personalizados
- NO usar otras librerías de componentes (MUI, Chakra, etc.)
- Todos los elementos visuales deben provenir de shadcn/ui

### Instalación de Componentes

Antes de usar un componente, instalarlo con:
```bash
npx shadcn@latest add [component-name]
```

### Componentes Disponibles

Usar siempre los componentes oficiales de shadcn/ui:
- `Button`, `Input`, `Card`, `Dialog`, `Dropdown Menu`
- `Form`, `Label`, `Checkbox`, `Radio Group`, `Select`
- `Table`, `Tabs`, `Toast`, `Tooltip`, `Sheet`
- `Alert`, `Badge`, `Avatar`, `Separator`, `Skeleton`
- Y todos los demás disponibles en la documentación oficial

## 💡 Ejemplos de Uso

### Importar Componentes
```typescript
// ✅ CORRECTO
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// ❌ INCORRECTO
import { Button } from "./components/CustomButton"
import MyCard from "./components/MyCard"
```

### Uso de Componentes
```typescript
// ✅ CORRECTO - Usar shadcn/ui
export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <h2>Título</h2>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}

// ❌ INCORRECTO - Componente personalizado
export default function MyPage() {
  return (
    <div className="custom-card">
      <button className="custom-button">Click me</button>
    </div>
  )
}
```

### Composición de Componentes

Si necesitas funcionalidad adicional, compón componentes de shadcn/ui:

```typescript
// ✅ CORRECTO - Componer shadcn/ui
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function ActionButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir</Button>
      </DialogTrigger>
      <DialogContent>
        {/* Contenido */}
      </DialogContent>
    </Dialog>
  )
}
```

## ✅ Checklist de Implementación

- [ ] shadcn/ui configurado en el proyecto
- [ ] `components.json` presente en la raíz
- [ ] Todos los componentes UI son de shadcn/ui
- [ ] NO existen componentes UI personalizados
- [ ] Se usan las variantes de shadcn/ui para personalización
- [ ] Tailwind CSS configurado correctamente

## 🔧 Personalización Permitida

### Variantes de Componentes
```typescript
// ✅ Usar variantes de shadcn/ui
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Estilos con Tailwind
```typescript
// ✅ Añadir clases de Tailwind sobre componentes de shadcn/ui
<Button className="w-full mt-4">Full Width</Button>
<Card className="shadow-lg">Contenido</Card>
```

## 🚫 Prácticas NO Permitidas

- ❌ Crear archivos de componentes UI personalizados
- ❌ Usar otras librerías de componentes (Material-UI, Ant Design, etc.)
- ❌ Crear `<div>` y `<button>` con estilos personalizados en lugar de usar shadcn/ui
- ❌ Reimplementar componentes que ya existen en shadcn/ui
- ❌ Copiar código de componentes en lugar de instalarlos con CLI

## 📚 Recursos

- [Documentación oficial de shadcn/ui](https://ui.shadcn.com)
- [Lista de componentes](https://ui.shadcn.com/docs/components)
- [Temas y personalización](https://ui.shadcn.com/themes)
