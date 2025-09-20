-- Fix user profile creation to ensure both users and user_profiles tables are populated

-- Drop existing triggers to recreate them properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_oauth ON auth.users;

-- Drop existing functions to recreate them
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_oauth_user_signup();

-- Create comprehensive function to handle all user creation scenarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Always create entry in users table
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();

  -- Create entry in user_profiles table
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- If this is an OAuth signup with tokens, store them
  IF NEW.raw_user_meta_data ? 'provider_token' THEN
    UPDATE public.user_profiles 
    SET 
      gmail_access_token = NEW.raw_user_meta_data->>'provider_token',
      gmail_refresh_token = NEW.raw_user_meta_data->>'provider_refresh_token',
      updated_at = now()
    WHERE user_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for all user creation scenarios
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle session-based OAuth token updates
CREATE OR REPLACE FUNCTION public.update_oauth_tokens(
  p_user_id UUID,
  p_access_token TEXT,
  p_refresh_token TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles 
  SET 
    gmail_access_token = p_access_token,
    gmail_refresh_token = p_refresh_token,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- If no row was updated, insert a new one
  IF NOT FOUND THEN
    INSERT INTO public.user_profiles (user_id, gmail_access_token, gmail_refresh_token)
    VALUES (p_user_id, p_access_token, p_refresh_token)
    ON CONFLICT (user_id) DO UPDATE SET
      gmail_access_token = EXCLUDED.gmail_access_token,
      gmail_refresh_token = EXCLUDED.gmail_refresh_token,
      updated_at = now();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
