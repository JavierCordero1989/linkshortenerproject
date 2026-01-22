---
description: Leer este archivo para entendeer cómo se manejan las operaciones de obtención de datos en el proyecto.
---
# Instrucciones para la Obtención de Datos
Este archivo proporciona las mejores prácticas e instrucciones para obtener datos en esta aplicación con Next JS. Adherirse a estas instrucciones garantizará un código consistente, eficiente, y fácil de mantener.

## 1. Uso de componentes para la obtención de datos

En Next JS se debe usar SIEMPRE componentes de servidor (Server Components) para la obtención de datos. Esto permite obtener mejor rendimiento y una experiencia de usuario más fluida. NUNCA se debe usar componentes de cliente para obtener datos.

## 2. Métodos recomendados para obtener datos

SIEMPRE use funciones de ayuda en la carpeta /data para encapsular la lógica de obtención de datos. NUNCA cargue datos directamente en los componentes.

TODAS las funciones de ayuda en la carpeta /data deben usar Drizzle ORM para interactuar con la base de datos. Esto asegura consistencia y seguridad en las consultas.