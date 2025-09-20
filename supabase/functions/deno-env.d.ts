// Ambient declarations for Deno-based Supabase Edge Functions
// These files run under Deno at runtime. The declarations below silence IDE TypeScript
// module resolution errors in the Node/React workspace.

// Deno global
declare const Deno: any;

// URL imports used by Deno edge functions
declare module "https://deno.land/std@0.168.0/http/server.ts";
declare module "https://esm.sh/@supabase/supabase-js@2";
