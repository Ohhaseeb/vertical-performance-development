import { createClientClient } from "@/utils/supabase/client"

// Create a single instance of the Supabase client
const supabase = createClientClient()

export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    return { user, error: null };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { user: null, error };
  }
} 