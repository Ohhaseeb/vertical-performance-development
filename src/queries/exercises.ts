import { SupabaseClient } from '@supabase/supabase-js'

// Interface representing an exercise in the database
// Contains basic exercise information
export interface Exercise {
  id: string    // Unique identifier for the exercise
  name: string  // Name/title of the exercise
}

/**
 * Fetches all exercises from the database, ordered alphabetically by name
 * @param supabase - Supabase client instance
 * @returns Array of Exercise objects
 * @throws Error if the query fails
 */
export const getAllExercises = async (supabase: SupabaseClient) => {
  // Query the exercises table for all exercises
  const { data, error } = await supabase
    .from('exercises')   // Target the exercises table
    .select('*')        // Select all fields
    .order('name')      // Order alphabetically by name

  // If there was an error, throw it
  if (error) throw error
  
  // Return the array of exercises with type assertion
  return data as Exercise[]
}

/**
 * Adds a new exercise to the database
 * @param supabase - Supabase client instance
 * @param name - The name of the exercise to add
 * @returns The newly created Exercise object
 * @throws Error if the insertion fails
 */
export const addExercise = async (supabase: SupabaseClient, name: string) => {
  // Insert a new exercise into the database
  const { data, error } = await supabase
    .from('exercises')              // Target the exercises table
    .insert([{ name: name.trim() }]) // Insert new exercise, trimming whitespace
    .select()                       // Return the inserted record

  // If there was an error, throw it
  if (error) throw error
  
  // Return the newly created exercise with type assertion
  return data[0] as Exercise
} 