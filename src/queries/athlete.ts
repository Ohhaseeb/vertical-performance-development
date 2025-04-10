import { SupabaseClient } from '@supabase/supabase-js'

// Interface representing an athlete/user profile in the database
// Contains basic user information and role status
export interface Profile {
  id: string          // Unique identifier for the user
  email: string       // User's email address
  first_name: string  // User's first name
  plan: string        // User's subscription plan
  admin: boolean      // Whether the user has admin privileges
}

/**
 * Fetches a single athlete's profile by their ID
 * @param supabase - Supabase client instance
 * @param id - The unique identifier of the athlete
 * @returns A single Profile object
 * @throws Error if the query fails or athlete not found
 */
export const getAthleteById = async (supabase: SupabaseClient, id: string) => {
  // Query the profiles table for a specific athlete
  const { data, error } = await supabase
    .from('profiles')    // Target the profiles table
    .select('*')         // Select all fields
    .eq('id', id)       // Where id matches the parameter
    .single()           // Expect only one result

  // If there was an error, throw it
  if (error) throw error
  
  // Return the profile data with type assertion
  return data as Profile
}

/**
 * Fetches all athlete profiles, optionally excluding one athlete
 * @param supabase - Supabase client instance
 * @param excludeId - Optional ID to exclude from the results
 * @returns Array of Profile objects
 * @throws Error if the query fails
 */
export const getAllAthletes = async (supabase: SupabaseClient, excludeId?: string) => {
  // Start building the query
  const query = supabase.from('profiles').select('*')
  
  // If an excludeId is provided, add a filter to exclude that profile
  if (excludeId) {
    query.neq('id', excludeId)  // Where id is not equal to excludeId
  }
  
  // Execute the query
  const { data, error } = await query
  
  // If there was an error, throw it
  if (error) throw error
  
  // Return the array of profiles with type assertion
  return data as Profile[]
} 