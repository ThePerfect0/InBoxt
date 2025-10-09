-- Add composite indexes for improved query performance

-- Index for digests queries (user_id, date lookups)
CREATE INDEX IF NOT EXISTS idx_digests_user_date ON public.digests(user_id, date DESC);

-- Index for tasks queries (user_id, status lookups)
CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON public.tasks(user_id, status);

-- Index for tasks deadline queries (for sorting and filtering by deadline)
CREATE INDEX IF NOT EXISTS idx_tasks_user_deadline ON public.tasks(user_id, deadline) WHERE deadline IS NOT NULL;

-- Add prefs_digest_frequency column to users table to persist the digest frequency setting
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prefs_digest_frequency text DEFAULT 'once';

-- Add prefs_digest_times column to store multiple digest times as JSON array
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prefs_digest_times jsonb DEFAULT '["08:00"]'::jsonb;