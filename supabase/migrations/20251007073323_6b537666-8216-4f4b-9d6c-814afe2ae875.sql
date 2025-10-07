-- Create function to securely update Gmail access token
CREATE OR REPLACE FUNCTION public.update_gmail_access_token(
  p_user_id uuid,
  p_access_token text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  UPDATE private.gmail_credentials
  SET gmail_access_token = p_access_token,
      updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.update_gmail_access_token(uuid, text) TO authenticated, service_role;