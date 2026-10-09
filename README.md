# sj-alquileres

Gestión de contratos de alquiler, ajustes y cobranzas para inmobiliarias y administradores de San Juan, con foco en alquileres corporativos ligados a la minería.

**Por qué ahora:** Se estiman entre 7.000 y 15.000 viviendas nuevas necesarias por la llegada de trabajadores de los proyectos de cobre, y empresas que necesitan alojar de 100 a 400 personas.

## Estado

| Etapa | Qué hay |
| --- | --- |
| Base (actual) | Estructura estándar, base de datos lista, reglas de negocio en `src/lib/alquileres.ts` con tests (fechas de ajuste, ajuste por índice (ICL/IPC) o porcentaje fijo, y días de atraso). |
| Prototipo funcional (siguiente) | Pantallas de carga y consulta sobre la base. |
| Producción | Login, varias cuentas, deploy. |

## Requisitos

- Node.js 20.9 o superior.
- Nada más para desarrollo: la base es un Postgres embebido (PGlite) en `./.data`.

## Empezar

```bash
npm install
cp .env.example .env.local   # opcional en desarrollo
npm run dev                  # prepara la base y abre http://localhost:3000
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Prepara la base y levanta el servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación de producción |
| `npm test` | Tests de las reglas de negocio (Vitest) |
| `npm run lint` / `npm run typecheck` | Calidad de código |
| `npm run check` | Typecheck + lint + tests juntos |
| `npm run db:generate` | Genera una migración SQL después de cambiar `src/db/schema.ts` |
| `npm run db:setup` | Aplica las migraciones |

## Estructura

```
src/
  app/          Pantallas y acciones del servidor
  db/           Esquema (schema.ts) y conexión (index.ts)
  lib/alquileres.ts  Reglas de negocio + tests
drizzle/        Migraciones SQL
scripts/        Setup de base
```

## Producción

Definí `DATABASE_URL` con un Postgres real (Supabase, Neon…), corré `npm run db:setup` y desplegá (por ejemplo en Vercel).

## Próximos pasos

1. Alta de propiedades, inquilinos y contratos.
2. Calendario de ajustes y avisos de vencimiento a inquilinos.
3. Cobranzas y estado de cuenta; módulo de alquileres corporativos (varias unidades por empresa).

Estructura compartida con `sj-proveedores-mineros`, `sj-factura-simple`, `sj-alquileres` y `sj-reservas-turismo`.
