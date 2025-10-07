-- Create function to securely retrieve Gmail credentials
CREATE OR REPLACE FUNCTION public.get_gmail_credentials(p_user_id uuid)
RETURNS TABLE (
  access_token text,
  refresh_token text
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gmail_access_token::text,
    gmail_refresh_token::text
  FROM private.gmail_credentials
  WHERE user_id = p_user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_gmail_credentials(uuid) TO authenticated, service_role;