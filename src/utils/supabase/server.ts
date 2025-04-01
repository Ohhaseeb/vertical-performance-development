import { createClient as supabaseClient } from '@supabase/supabase-js';

export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or key');
  }
  
  return supabaseClient(supabaseUrl, supabaseKey);
}; 