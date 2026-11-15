-- ============================================================================
-- CELLSPRINT PRODUCTION DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ============================================================================

-- 1. Tabla de Retos Diarios (1 reto oficial por cada fecha YYYY-MM-DD)
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  challenge_date DATE PRIMARY KEY,
  case_number TEXT NOT NULL,
  title_i18n JSONB NOT NULL,
  description_i18n JSONB NOT NULL,
  rules_i18n JSONB NOT NULL,
  initial_cells JSONB NOT NULL,
  targets JSONB NOT NULL,
  audit_mutation JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Tiempos Reales de los Jugadores (para calcular la Campana de Gauss en vivo)
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_date DATE NOT NULL,
  challenge_id TEXT NOT NULL DEFAULT 'daily',
  elapsed_seconds NUMERIC(6,2) NOT NULL CHECK (elapsed_seconds >= 1.0 AND elapsed_seconds <= 3600.0),
  formulas_count INT NOT NULL DEFAULT 3,
  anonymous_player_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_date_id ON public.submissions (challenge_date, challenge_id);

-- 3. Vista en tiempo real para obtener Media (mu), Desviación Estándar (sigma) y Total de Jugadores del día
CREATE OR REPLACE VIEW public.daily_live_stats AS
SELECT
  challenge_date,
  challenge_id,
  COUNT(*)::INT AS total_players,
  ROUND(AVG(elapsed_seconds)::NUMERIC, 2) AS mean_seconds,
  ROUND(COALESCE(STDDEV_POP(elapsed_seconds), 14.0)::NUMERIC, 2) AS stddev_seconds
FROM public.submissions
GROUP BY challenge_date, challenge_id;

-- 4. Políticas RLS (Lectura pública de retos y estadísticas, inserción anónima de tiempos validados)
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read daily_challenges"
  ON public.daily_challenges FOR SELECT USING (true);

CREATE POLICY "Allow public read submissions"
  ON public.submissions FOR SELECT USING (true);

CREATE POLICY "Allow public insert valid submissions"
  ON public.submissions FOR INSERT WITH CHECK (elapsed_seconds >= 1.0 AND elapsed_seconds <= 3600.0);

-- 5. Job automático pg_cron a medianoche UTC (Opcional si se generan retos por semilla determinista)
-- SELECT cron.schedule('rotate-cellsprint-daily', '0 0 * * *', $$ ... $$);
