# CellSprint — Paquete de Producción (Next.js + Supabase + SEO)

Este paquete contiene todo el código fuente listo para publicar **CellSprint** en internet con enlace público, rotación automática de problema diario, base de datos en tiempo real para la campana de Gauss y SEO configurado para aparecer en Google.

## Pasos para publicarlo en 5 minutos

1. **Base de datos en vivo (Supabase):**
   - Crea un proyecto gratuito en [Supabase](https://supabase.com/).
   - Abre el **SQL Editor** y pega el contenido de `supabase/schema.sql` para crear las tablas `daily_challenges`, `submissions` y la vista en vivo `daily_live_stats`.

2. **Despliegue web con enlace público (Vercel):**
   - Sube esta carpeta a un repositorio de GitHub o arrástrala directamente a [Vercel](https://vercel.com/new).
   - Añade las variables de entorno en Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL` = *(URL de tu proyecto Supabase)*
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *(Anon Key de tu proyecto Supabase)*
     - `NEXT_PUBLIC_SITE_URL` = *(Tu dominio final, ej. `https://cellsprint.vercel.app`)*

3. **Aparecer en buscadores (Google Search Console):**
   - El proyecto ya incluye `app/sitemap.js`, `app/robots.js` y metadatos OpenGraph en `app/layout.jsx`.
   - Registra tu URL en [Google Search Console](https://search.google.com/search-console/about) y envía `/sitemap.xml`.
