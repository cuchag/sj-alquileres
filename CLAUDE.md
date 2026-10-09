# Instrucciones para Claude y otros agentes

@AGENTS.md

## Producto

Gestión de contratos de alquiler, ajustes y cobranzas para inmobiliarias y administradores de San Juan, con foco en alquileres corporativos ligados a la minería. Idioma de la interfaz: español rioplatense.

## Stack

Next.js (App Router, Cache Components) · TypeScript · Drizzle ORM sobre Postgres (PGlite en desarrollo) · Zod · Vitest. Misma estructura que los otros repos `sj-*`; `sj-proveedores-mineros` es la referencia más avanzada.

Esta versión de Next.js trae cambios respecto de lo conocido: antes de usar una API de Next, leé la guía en `node_modules/next/dist/docs/`. En particular:
- Los datos dinámicos van en componentes dentro de `<Suspense>` y llaman a `connection()`.
- Las acciones del servidor llaman a `refresh()` de `next/cache` para actualizar la pantalla.

## Comandos

- `npm run check` antes de cada commit (typecheck + lint + tests).
- `npm run build` para confirmar que compila.
- Cambios de base: editar `src/db/schema.ts`, `npm run db:generate`, revisar el SQL en `drizzle/`, `npm run db:setup`.

## Reglas del dominio

- Toda regla de contratos vive en `src/lib/alquileres.ts`, con su test.
- Montos en centavos. Fechas como AAAA-MM-DD, mostradas DD/MM/AAAA.
- Los índices (ICL/IPC) se cargan con fecha y fuente; nunca se inventan valores.

## Convenciones

- Validar toda entrada del usuario con Zod en las acciones del servidor.
- Toda consulta filtra por `organizationId`.
- Mensajes al usuario en español, cortos y concretos.
- Commits en español, en imperativo ("Agregar…", "Corregir…").
