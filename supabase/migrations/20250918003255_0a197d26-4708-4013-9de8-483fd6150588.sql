-- First, enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Set up cron job to run digest function every hour (checking for users due for digest)
SELECT cron.schedule(
  'run-daily-digest-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT
    net.http_post(
        url:='https://ivasmxvigcojbefxbzfk.supabase.co/functions/v1/run-daily-digest',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YXNteHZpZ2NvamJlZnhiemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzgxNjcsImV4cCI6MjA3MzQxNDE2N30.Piw_wZ29aRN0hcjRwPYEPnNyN3WXu7IEXMjDIHPZNtg"}'::jsonb,
        body:='{"time": "' || now() || '"}'::jsonb
    ) as request_id;
  $$
);

-- Create trigger to automatically create user_profiles when user signs up
CREATE OR REPLACE FUNCTION handle_oauth_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Only insert if the user has OAuth tokens in raw_user_meta_data
  IF NEW.raw_user_meta_data ? 'provider_token' THEN
    INSERT INTO public.user_profiles (
      user_id,
      gmail_access_token,
      gmail_refresh_token
    ) VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'provider_token',
      NEW.raw_user_meta_data->>'provider_refresh_token'
    )
    ON CONFLICT (user_id) DO UPDATE SET
      gmail_access_token = EXCLUDED.gmail_access_token,
      gmail_refresh_token = EXCLUDED.gmail_refresh_token,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created_oauth ON auth.users;
CREATE TRIGGER on_auth_user_created_oauth
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_oauth_user_signup();