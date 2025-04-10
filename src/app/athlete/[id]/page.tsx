"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/utils/supabase/client"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Copy } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Profile {
  id: string;
  email: string;
  first_name: string;
  plan: string;
  admin: boolean;
}

interface Exercise {
  id: string;
  name: string;
}

interface TrainingPlanExercise {
  id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  notes: string;
  exercises: Exercise;
}

interface TrainingPlan {
  id: string;
  athlete_id: string;
  date: string;
  training_plan_exercises: TrainingPlanExercise[];
  created_at: string;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const supabase = createClientClient()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [athlete, setAthlete] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([])
  const [isAddingPlan, setIsAddingPlan] = useState(false)
  const [newPlan, setNewPlan] = useState({
    warmup: "",
    main_workout: "",
    cooldown: ""
  })
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isAddingExercise, setIsAddingExercise] = useState(false)
  const [newExercise, setNewExercise] = useState("")
  const [currentExercise, setCurrentExercise] = useState<{
    exercise_id: string;
    sets: string;
    reps: string;
    notes: string;
  }>({
    exercise_id: "",
    sets: "",
    reps: "",
    notes: ""
  })
  const [planExercises, setPlanExercises] = useState<TrainingPlanExercise[]>([])
  const [athletes, setAthletes] = useState<Profile[]>([])
  const [isCopyingPlan, setIsCopyingPlan] = useState(false)
  const [selectedAthleteId, setSelectedAthleteId] = useState("")

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          console.error('Error fetching athlete:', error)
          return
        }

        setAthlete(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAthlete()
  }, [id])

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('training_plans')
          .select(`
            *,
            training_plan_exercises (
              id,
              exercise_id,
              sets,
              reps,
              notes,
              exercises (
                id,
                name
              )
            )
          `)
          .eq('athlete_id', id)
        
        if (error) {
          console.error('Error fetching training plans:', error)
          return
        }

        if (data) {
          console.log('Fetched training plans:', data)
          setTrainingPlans(data)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchTrainingPlans()
  }, [id])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name')
        
        if (error) {
          console.error('Error fetching exercises:', error)
          return
        }

        if (data) {
          setExercises(data)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchExercises()
  }, [])

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', id) // Exclude current athlete
        
        if (error) {
          console.error('Error fetching athletes:', error)
          return
        }

        if (data) {
          setAthletes(data)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchAthletes()
  }, [id])

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const handleAddTrainingPlan = async () => {
    if (!selectedDate) return

    try {
      const { data, error } = await supabase
        .from('training_plans')
        .insert([
          {
            athlete_id: id,
            date: format(selectedDate, 'yyyy-MM-dd'),
            warmup: newPlan.warmup,
            main_workout: newPlan.main_workout,
            cooldown: newPlan.cooldown
          }
        ])
        .select()

      if (error) {
        console.error('Error adding training plan:', error)
        return
      }

      if (data) {
        setTrainingPlans([...trainingPlans, ...data])
        setNewPlan({ warmup: "", main_workout: "", cooldown: "" })
        setIsAddingPlan(false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getTrainingPlanForDate = (date: Date) => {
    const plan = trainingPlans.find(plan => 
      plan.date === format(date, 'yyyy-MM-dd')
    )
    
    return plan
  }

  const handleAddNewExercise = async () => {
    if (!newExercise.trim()) return

    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([{ name: newExercise.trim() }])
        .select()

      if (error) {
        console.error('Error adding exercise:', error)
        return
      }

      if (data) {
        setExercises([...exercises, ...data])
        setNewExercise("")
        setIsAddingExercise(false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddExerciseToPlan = () => {
    if (!currentExercise.exercise_id || !currentExercise.sets || !currentExercise.reps) return

    const exercise = exercises.find(e => e.id === currentExercise.exercise_id)
    if (!exercise) return

    const newPlanExercise: TrainingPlanExercise = {
      id: crypto.randomUUID(),
      exercise_id: currentExercise.exercise_id,
      sets: parseInt(currentExercise.sets),
      reps: parseInt(currentExercise.reps),
      notes: currentExercise.notes,
      exercises: exercise
    }

    setPlanExercises([...planExercises, newPlanExercise])
    setCurrentExercise({
      exercise_id: "",
      sets: "",
      reps: "",
      notes: ""
    })
  }

  const handleSaveTrainingPlan = async () => {
    if (!selectedDate || planExercises.length === 0) return

    try {
      // First create the training plan
      const { data: planData, error: planError } = await supabase
        .from('training_plans')
        .insert([{
          athlete_id: id,
          date: format(selectedDate, 'yyyy-MM-dd')
        }])
        .select()

      if (planError || !planData) {
        console.error('Error creating training plan:', planError)
        return
      }

      // Then add all exercises
      const { error: exercisesError } = await supabase
        .from('training_plan_exercises')
        .insert(
          planExercises.map(exercise => ({
            training_plan_id: planData[0].id,
            exercise_id: exercise.exercise_id,
            sets: exercise.sets,
            reps: exercise.reps,
            notes: exercise.notes
          }))
        )

      if (exercisesError) {
        console.error('Error adding exercises to plan:', exercisesError)
        return
      }

      // Reset and close dialog
      setPlanExercises([])
      setIsAddingPlan(false)
      
      // Refresh training plans
      const { data: updatedPlan } = await supabase
        .from('training_plans')
        .select(`
          *,
          training_plan_exercises (
            id,
            exercise_id,
            sets,
            reps,
            notes,
            exercises (
              name
            )
          )
        `)
        .eq('id', planData[0].id)
        .single()

      if (updatedPlan) {
        setTrainingPlans([...trainingPlans, updatedPlan])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCopyTrainingPlan = async (sourcePlan: TrainingPlan) => {
    if (!selectedAthleteId) return

    try {
      // First create the new training plan
      const { data: planData, error: planError } = await supabase
        .from('training_plans')
        .insert([{
          athlete_id: selectedAthleteId,
          date: sourcePlan.date
        }])
        .select()

      if (planError || !planData) {
        console.error('Error creating training plan:', planError)
        return
      }

      // Then copy all exercises
      const { error: exercisesError } = await supabase
        .from('training_plan_exercises')
        .insert(
          sourcePlan.training_plan_exercises.map(exercise => ({
            training_plan_id: planData[0].id,
            exercise_id: exercise.exercise_id,
            sets: exercise.sets,
            reps: exercise.reps,
            notes: exercise.notes
          }))
        )

      if (exercisesError) {
        console.error('Error copying exercises:', exercisesError)
        return
      }

      setIsCopyingPlan(false)
      setSelectedAthleteId("")
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Button
            onClick={() => router.push('/coach-dashboard')}
            className="bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
          >
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-white">
            {athlete?.first_name}'s Training Calendar
          </h1>
        </div>

        <Card className="bg-neutral-950 border border-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">
                {format(currentDate, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={previousMonth}
                  className="bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={nextMonth}
                  className="bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                return (
                  <Button
                    key={day.toString()}
                    variant="outline"
                    className={cn(
                      "h-12 w-full bg-neutral-900 border-neutral-800 text-gray-300 hover:bg-blue-900/20 hover:text-white hover:border-blue-500 transition-all",
                      !isSameMonth(day, currentDate) && "opacity-30 hover:opacity-50",
                      isSelected && "bg-blue-900/30 border-blue-500 text-white hover:bg-blue-900/40",
                      isToday(day) && "border-blue-500 text-blue-400 font-semibold",
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')} className={cn(
                      "inline-block w-full text-center",
                      isSelected && "font-semibold"
                    )}>
                      {format(day, 'd')}
                    </time>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedDate && (
          <Card className="mt-6 bg-neutral-950 border border-blue-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  Training for {format(selectedDate, 'MMMM d, yyyy')}
                </CardTitle>
                {getTrainingPlanForDate(selectedDate) && (
                  <Dialog open={isCopyingPlan} onOpenChange={setIsCopyingPlan}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-white hover:text-blue-400">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-950 border border-blue-500">
                      <DialogHeader>
                        <DialogTitle className="text-white">Copy Training Plan</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="athlete" className="text-white">Select Athlete</Label>
                          <Select
                            value={selectedAthleteId}
                            onValueChange={setSelectedAthleteId}
                          >
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                              <SelectValue placeholder="Select an athlete" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800">
                              {athletes.map((athlete) => (
                                <SelectItem key={athlete.id} value={athlete.id}>
                                  {athlete.first_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={() => {
                            const plan = getTrainingPlanForDate(selectedDate)
                            if (plan) handleCopyTrainingPlan(plan)
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                        >
                          Copy Training Plan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {getTrainingPlanForDate(selectedDate) ? (
                <div className="space-y-2">
                  {getTrainingPlanForDate(selectedDate)?.training_plan_exercises?.map((exercise) => (
                    <div key={exercise.id} className="flex flex-col space-y-1">
                      <div className="flex justify-start text-sm">
                        <span className="text-gray-400">Exercise:</span>
                        <span className="text-white ml-2 font-medium">{exercise.exercises.name}</span>
                      </div>
                      <div className="flex justify-start text-sm">
                        <span className="text-gray-400">Sets × Reps:</span>
                        <span className="text-white ml-2">{exercise.sets} × {exercise.reps}</span>
                      </div>
                      {exercise.notes && (
                        <div className="flex justify-start text-sm">
                          <span className="text-gray-400">Notes:</span>
                          <span className="text-white ml-2">{exercise.notes}</span>
                        </div>
                      )}
                      <div className="border-t border-neutral-800 mt-2 pt-2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <Dialog open={isAddingPlan} onOpenChange={setIsAddingPlan}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                    >
                      Add Training Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-neutral-950 border border-blue-500">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add Training Plan for {format(selectedDate, 'MMMM d, yyyy')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      {planExercises.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-white">Exercises in Plan:</h3>
                          <div className="space-y-2">
                            {planExercises.map((exercise) => (
                              <div key={exercise.id} className="bg-neutral-900 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="text-white">{exercise.exercises.name}</span>
                                  <span className="text-gray-400">{exercise.sets} sets × {exercise.reps} reps</span>
                                </div>
                                {exercise.notes && (
                                  <p className="text-sm text-gray-400 mt-1">{exercise.notes}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Dialog open={isAddingExercise} onOpenChange={setIsAddingExercise}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Exercise to Database
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-neutral-950 border border-blue-500">
                          <DialogHeader>
                            <DialogTitle className="text-white">Add New Exercise</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="exercise-name" className="text-white">Exercise Name</Label>
                              <Input
                                id="exercise-name"
                                value={newExercise}
                                onChange={(e) => setNewExercise(e.target.value)}
                                className="bg-neutral-900 border-neutral-800 text-white"
                                placeholder="Enter exercise name..."
                              />
                            </div>
                            <Button 
                              onClick={handleAddNewExercise}
                              className="w-full bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                            >
                              Add Exercise
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <div className="space-y-4 border-t border-neutral-800 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="exercise" className="text-white">Select Exercise</Label>
                          <Select
                            value={currentExercise.exercise_id}
                            onValueChange={(value: string) => setCurrentExercise({ ...currentExercise, exercise_id: value })}
                          >
                            <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                              <SelectValue placeholder="Select an exercise" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-800">
                              {exercises.map((exercise) => (
                                <SelectItem key={exercise.id} value={exercise.id} className="text-white hover:bg-blue-900/20">
                                  {exercise.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="sets" className="text-white">Sets</Label>
                            <Input
                              id="sets"
                              type="number"
                              value={currentExercise.sets}
                              onChange={(e) => setCurrentExercise({ ...currentExercise, sets: e.target.value })}
                              className="bg-neutral-900 border-neutral-800 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Number of sets"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reps" className="text-white">Reps</Label>
                            <Input
                              id="reps"
                              type="number"
                              value={currentExercise.reps}
                              onChange={(e) => setCurrentExercise({ ...currentExercise, reps: e.target.value })}
                              className="bg-neutral-900 border-neutral-800 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Number of reps"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes" className="text-white">Notes</Label>
                          <Input
                            id="notes"
                            value={currentExercise.notes}
                            onChange={(e) => setCurrentExercise({ ...currentExercise, notes: e.target.value })}
                            className="bg-neutral-900 border-neutral-800 text-white"
                            placeholder="Add any notes..."
                          />
                        </div>
                        <Button 
                          onClick={handleAddExerciseToPlan}
                          className="w-full bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                        >
                          Add Exercise to Plan
                        </Button>
                      </div>

                      {planExercises.length > 0 && (
                        <Button 
                          onClick={handleSaveTrainingPlan}
                          className="w-full bg-gradient-to-r from-blue-600 to-white text-black hover:from-blue-700 hover:to-gray-100 transition-all"
                        >
                          Save Training Plan
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 