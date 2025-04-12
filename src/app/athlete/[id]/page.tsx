"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/utils/supabase/client"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Copy, Check } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Profile, getAthleteById, getAllAthletes } from "@/queries/athlete"
import { Exercise, getAllExercises, addExercise } from "@/queries/exercises"
import { TrainingPlan, TrainingPlanExercise, getTrainingPlanByDate, createTrainingPlan } from "@/queries/training"

// Main page component for displaying an individual athlete's training calendar and plans
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

  // Fetches the athlete's profile data when the component mounts
  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const data = await getAthleteById(supabase, id)
        setAthlete(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAthlete()
  }, [id])

  // Fetches training plans for the selected date
  useEffect(() => {
    const fetchTrainingPlans = async () => {
      if (!selectedDate) return
      
      try {
        const data = await getTrainingPlanByDate(
          supabase,
          id,
          format(selectedDate, 'yyyy-MM-dd')
        )
        
        if (data) {
          setTrainingPlans([data])
        } else {
          setTrainingPlans([])
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchTrainingPlans()
  }, [id, selectedDate])

  // Fetches all available exercises from the database
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getAllExercises(supabase)
        setExercises(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchExercises()
  }, [])

  // Navigates to the next month in the calendar
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  
  // Navigates to the previous month in the calendar
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  // Adds a new exercise to the database
  const handleAddNewExercise = async () => {
    if (!newExercise.trim()) return

    try {
      const data = await addExercise(supabase, newExercise)
      setExercises([...exercises, data])
      setNewExercise("")
      setIsAddingExercise(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Adds an exercise to the current training plan being created
  const handleAddExerciseToPlan = () => {
    if (!currentExercise.exercise_id || !currentExercise.sets || !currentExercise.reps) return

    const exercise = exercises.find(e => e.id === currentExercise.exercise_id)
    if (!exercise) return

    const newPlanExercise: TrainingPlanExercise = {
      id: crypto.randomUUID(),
      exercise_id: currentExercise.exercise_id,
      sets: Number(currentExercise.sets),
      reps: Number(currentExercise.reps),
      notes: currentExercise.notes,
      exercise_name: exercise.name,
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

  // Saves the complete training plan to the database
  const handleSaveTrainingPlan = async () => {
    if (!selectedDate || planExercises.length === 0) return

    try {
      const data = await createTrainingPlan(
        supabase,
        id,
        format(selectedDate, 'yyyy-MM-dd'),
        planExercises
      )

      setPlanExercises([])
      setIsAddingPlan(false)
      setTrainingPlans([data])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Retrieves a training plan for a specific date
  const getTrainingPlanForDate = (date: Date) => {
    return trainingPlans.find(plan => 
      plan.date === format(date, 'yyyy-MM-dd')
    )
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
              </div>
            </CardHeader>
            <CardContent>
              {getTrainingPlanForDate(selectedDate) ? (
                <div className="space-y-2">
                  {getTrainingPlanForDate(selectedDate)?.exercises_data?.map((exercise) => (
                    <div key={exercise.id} className="flex flex-col space-y-1">
                      <div className="flex justify-start text-sm">
                        <span className="text-gray-400">Exercise:</span>
                        <span className="text-white ml-2 font-medium">{exercise.exercise_name || exercise.exercises?.name}</span>
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
                                  <span className="text-white">{exercise.exercise_name || exercise.exercises?.name}</span>
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
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between bg-neutral-900 border-neutral-800 text-white",
                                  !currentExercise.exercise_id && "text-gray-400"
                                )}
                              >
                                {currentExercise.exercise_id
                                  ? exercises.find((exercise) => exercise.id === currentExercise.exercise_id)?.name
                                  : "Select an exercise..."}
                                <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-neutral-900 border-neutral-800">
                              <Command className="bg-neutral-900">
                                <CommandInput 
                                  placeholder="Search exercises..." 
                                  className="text-white placeholder:text-white [&_svg]:text-white"
                                />
                                <CommandEmpty className="py-2 text-gray-400">No exercise found.</CommandEmpty>
                                <CommandGroup className="bg-neutral-900">
                                  {exercises.map((exercise) => (
                                    <CommandItem
                                      key={exercise.id}
                                      value={exercise.name}
                                      onSelect={() => {
                                        setCurrentExercise({ ...currentExercise, exercise_id: exercise.id })
                                      }}
                                      className="text-white hover:bg-blue-900/20 cursor-pointer"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          currentExercise.exercise_id === exercise.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {exercise.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
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