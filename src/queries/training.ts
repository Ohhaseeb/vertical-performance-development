import { SupabaseClient } from '@supabase/supabase-js'
import { Exercise } from './exercises'

// Interface representing a single exercise within a training plan
// Contains all the details about sets, reps, and exercise information
export interface TrainingPlanExercise {
  id?: string                // Unique identifier for this specific exercise instance
  exercise_id: string        // Reference to the exercise in the exercises table
  sets: number              // Number of sets for this exercise
  reps: number             // Number of reps per set
  notes: string            // Additional notes or instructions
  exercise_name?: string    // Name of the exercise (optional, can be fetched from exercises table)
  exercises?: Exercise      // Reference to the full exercise object
}

// Interface representing a complete training plan
// Contains metadata about the plan and an array of exercises
export interface TrainingPlan {
  id: string                         // Unique identifier for the training plan
  athlete_id: string                 // ID of the athlete this plan belongs to
  date: string                       // Date for which this plan is scheduled
  exercises_data: TrainingPlanExercise[] // Array of exercises in this plan
  created_at: string                 // Timestamp when the plan was created
}

/**
 * Fetches a training plan for a specific athlete on a specific date
 * @param supabase - Supabase client instance
 * @param athleteId - ID of the athlete
 * @param date - Date to fetch the plan for
 * @returns TrainingPlan object or null if no plan exists
 */
export const getTrainingPlanByDate = async (
  supabase: SupabaseClient,
  athleteId: string,
  date: string
) => {
  // Query the database for the training plan
  const { data, error } = await supabase
    .from('new_training_plans')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('date', date)
    .single()

  // Handle errors - return null if no plan found, throw other errors
  if (error) {
    if (error.code === 'PGRST116') return null // No data found
    throw error
  }

  // Transform the raw database data into our TrainingPlan format
  return {
    id: data.id,
    athlete_id: athleteId,
    date: date,
    exercises_data: Array.isArray(data.exercises_data)
      ? data.exercises_data.map((exercise: any) => ({
          // Ensure each exercise has a unique ID by trying multiple fallbacks
          id: exercise.id || exercise.exercise_id || crypto.randomUUID(),
          exercise_id: exercise.exercise_id,
          sets: exercise.sets,
          reps: exercise.reps,
          notes: exercise.notes,
          exercise_name: exercise.exercise_name,
          exercises: {
            id: exercise.exercise_id,
            name: exercise.exercise_name
          }
        }))
      : [], // If no exercises_data, return empty array
    created_at: data.created_at
  } as TrainingPlan
}

/**
 * Creates a new training plan for an athlete
 * @param supabase - Supabase client instance
 * @param athleteId - ID of the athlete
 * @param date - Date for the training plan
 * @param exercises - Array of exercises to include in the plan
 * @returns The created TrainingPlan object
 */
export const createTrainingPlan = async (
  supabase: SupabaseClient,
  athleteId: string,
  date: string,
  exercises: TrainingPlanExercise[]
) => {
  // Insert the new training plan into the database
  const { data, error } = await supabase
    .from('new_training_plans')
    .insert({
      athlete_id: athleteId,
      date: date,
      exercises_data: exercises.map(exercise => ({
        id: exercise.id,          // Preserve the original exercise ID
        exercise_id: exercise.exercise_id,
        sets: exercise.sets,
        reps: exercise.reps,
        notes: exercise.notes,
        exercise_name: exercise.exercises?.name || exercise.exercise_name
      }))
    })
    .select() // Return the inserted data

  if (error) throw error

  // Transform the returned data to ensure consistent format with our interfaces
  return {
    ...data[0],
    exercises_data: data[0].exercises_data.map((exercise: any) => ({
      // Ensure each exercise has a unique ID using the same fallback pattern
      id: exercise.id || exercise.exercise_id || crypto.randomUUID(),
      exercise_id: exercise.exercise_id,
      sets: exercise.sets,
      reps: exercise.reps,
      notes: exercise.notes,
      exercise_name: exercise.exercise_name,
      exercises: {
        id: exercise.exercise_id,
        name: exercise.exercise_name
      }
    }))
  } as TrainingPlan
}

/**
 * Fetches all training plans for a specific athlete within a date range
 * @param supabase - Supabase client instance
 * @param athleteId - ID of the athlete
 * @param startDate - Start date of the range (inclusive)
 * @param endDate - End date of the range (inclusive)
 * @returns Array of TrainingPlan objects
 */
export const getWeeklyTrainingPlans = async (
  supabase: SupabaseClient,
  athleteId: string,
  startDate: string,
  endDate: string
) => {
  // Query the database for training plans within the date range
  const { data, error } = await supabase
    .from('new_training_plans')
    .select('*')
    .eq('athlete_id', athleteId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })

  if (error) throw error

  // Return empty array if no data
  if (!data || data.length === 0) return []

  // Transform the raw database data into our TrainingPlan format
  return data.map(plan => ({
    id: plan.id,
    athlete_id: athleteId,
    date: plan.date,
    exercises_data: Array.isArray(plan.exercises_data)
      ? plan.exercises_data.map((exercise: any) => ({
          id: exercise.id || exercise.exercise_id || crypto.randomUUID(),
          exercise_id: exercise.exercise_id,
          sets: exercise.sets,
          reps: exercise.reps,
          notes: exercise.notes,
          exercise_name: exercise.exercise_name,
          exercises: {
            id: exercise.exercise_id,
            name: exercise.exercise_name
          }
        }))
      : [],
    created_at: plan.created_at
  })) as TrainingPlan[]
} 