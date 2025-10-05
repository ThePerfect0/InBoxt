-- Fix critical security issues

-- 1. Create a secure schema for sensitive credentials (only accessible server-side)
CREATE SCHEMA IF NOT EXISTS private;

-- 2. Move OAuth tokens to private schema
CREATE TABLE private.gmail_credentials (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  gmail_access_token TEXT,
  gmail_refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- No RLS needed on private schema tables - they're only accessible server-side

-- 3. Migrate existing tokens to private schema
INSERT INTO private.gmail_credentials (user_id, gmail_access_token, gmail_refresh_token, created_at, updated_at)
SELECT user_id, gmail_access_token, gmail_refresh_token, created_at, updated_at
FROM public.user_profiles
WHERE gmail_access_token IS NOT NULL OR gmail_refresh_token IS NOT NULL;

-- 4. Remove OAuth tokens from public.user_profiles
ALTER TABLE public.user_profiles 
DROP COLUMN IF EXISTS gmail_access_token,
DROP COLUMN IF EXISTS gmail_refresh_token;

-- 5. Add DELETE policy to user_profiles (GDPR compliance)
CREATE POLICY "Users can delete own profile"
ON public.user_profiles
FOR DELETE
USING (auth.uid() = user_id);

-- 6. Fix function search_path for handle_oauth_user_signup
CREATE OR REPLACE FUNCTION public.handle_oauth_user_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $function$
BEGIN
  -- Store OAuth tokens in private schema instead of public user_profiles
  IF NEW.raw_user_meta_data ? 'provider_token' THEN
    INSERT INTO private.gmail_credentials (
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
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 7. Create server-side function to get Gmail credentials (only callable by service role)
CREATE OR REPLACE FUNCTION private.get_gmail_credentials(p_user_id UUID)
RETURNS TABLE (
  access_token TEXT,
  refresh_token TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private
AS $$
BEGIN
  RETURN QUERY
  SELECT gmail_access_token, gmail_refresh_token
  FROM private.gmail_credentials
  WHERE user_id = p_user_id;
END;
$$;

-- 8. Update timestamp trigger function with search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- 9. Add trigger for gmail_credentials updated_at
CREATE TRIGGER update_gmail_credentials_updated_at
BEFORE UPDATE ON private.gmail_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();