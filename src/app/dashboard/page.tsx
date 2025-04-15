"use client"

import { useEffect, useState } from "react"
import { createClientClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  Dumbbell,
  BarChart2,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Save,
} from "lucide-react"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getUser } from "@/queries/user"
import { TrainingPlan, TrainingPlanExercise, getWeeklyTrainingPlans } from "@/queries/training"

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Mock data for progress
const progressStats = {
  attendanceRate: 92,
  skillProgress: 78,
  goalsCompleted: 8,
  totalGoals: 10,
}

// Type for tracking completed exercises
interface CompletedExercise {
  exerciseId: string;
  date: string;
}

// Type for tracking logged exercise sets
interface LoggedSet {
  exerciseId: string;
  date: string;
  setIndex: number;
  reps: string;
  weight: string;
}

export default function DashboardPage() {
  const supabase = createClientClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [showAllDays, setShowAllDays] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
  const [loggedSets, setLoggedSets] = useState<LoggedSet[]>([]);

  // Calculate current week end
  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  
  // Format dates for display
  const currentWeekDisplay = `${format(currentWeekStart, 'MMM d')} - ${format(currentWeekEnd, 'MMM d, yyyy')}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user: userData, error } = await getUser();
        
        if (error || !userData) {
          console.error('Authentication error:', error);
          router.push('/login');
          return;
        }

        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    // Fetch training plans for the current week
    const fetchTrainingPlans = async () => {
      if (!user?.id) return;
      
      try {
        const startDateStr = format(currentWeekStart, 'yyyy-MM-dd');
        const endDateStr = format(currentWeekEnd, 'yyyy-MM-dd');
        
        const plans = await getWeeklyTrainingPlans(
          supabase,
          user.id,
          startDateStr,
          endDateStr
        );
        
        setTrainingPlans(plans);
      } catch (error) {
        console.error('Error fetching training plans:', error);
      }
    };
    
    if (user) {
      fetchTrainingPlans();
    }
  }, [user, currentWeekStart, supabase]);

  // Load completed exercises from localStorage when component mounts
  useEffect(() => {
    if (user?.id) {
      const savedCompletedExercises = localStorage.getItem(`completed-exercises-${user.id}`);
      if (savedCompletedExercises) {
        try {
          setCompletedExercises(JSON.parse(savedCompletedExercises));
        } catch (e) {
          console.error('Error parsing completed exercises from localStorage:', e);
        }
      }
    }
  }, [user]);

  // Save completed exercises to localStorage whenever they change
  useEffect(() => {
    if (user?.id && completedExercises.length > 0) {
      localStorage.setItem(`completed-exercises-${user.id}`, JSON.stringify(completedExercises));
    }
  }, [completedExercises, user]);

  // Load logged sets from localStorage when component mounts
  useEffect(() => {
    if (user?.id) {
      const savedLoggedSets = localStorage.getItem(`logged-sets-${user.id}`);
      if (savedLoggedSets) {
        try {
          setLoggedSets(JSON.parse(savedLoggedSets));
        } catch (e) {
          console.error('Error parsing logged sets from localStorage:', e);
        }
      }
    }
  }, [user]);

  // Save logged sets to localStorage whenever they change
  useEffect(() => {
    if (user?.id && loggedSets.length > 0) {
      localStorage.setItem(`logged-sets-${user.id}`, JSON.stringify(loggedSets));
    }
  }, [loggedSets, user]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Go to previous week
  const previousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  // Go to next week
  const nextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  // Get training plan for a specific day
  const getTrainingPlanForDay = (dayName: string) => {
    // Map day name to day number (0 = Monday, 6 = Sunday)
    const dayIndex = daysOfWeek.indexOf(dayName);
    if (dayIndex === -1) return null;
    
    // Calculate the date for this day
    const dayDate = new Date(currentWeekStart);
    dayDate.setDate(currentWeekStart.getDate() + dayIndex);
    const formattedDate = format(dayDate, 'yyyy-MM-dd');
    
    // Find the plan for this date
    return trainingPlans.find(plan => plan.date === formattedDate);
  };

  // Check if an exercise is completed
  const isExerciseCompleted = (exerciseId: string, date: string) => {
    return completedExercises.some(
      (completed) => completed.exerciseId === exerciseId && completed.date === date
    );
  };

  // Toggle completion status of an exercise
  const toggleExerciseCompletion = (exerciseId: string, date: string) => {
    const isCompleted = isExerciseCompleted(exerciseId, date);
    
    if (isCompleted) {
      // Remove from completed exercises
      setCompletedExercises(
        completedExercises.filter(
          (completed) => !(completed.exerciseId === exerciseId && completed.date === date)
        )
      );
    } else {
      // Add to completed exercises
      setCompletedExercises([
        ...completedExercises,
        { exerciseId, date }
      ]);
    }
  };

  // Get value for a specific logged set
  const getLoggedSetValue = (exerciseId: string, date: string, setIndex: number, field: 'reps' | 'weight'): string => {
    const loggedSet = loggedSets.find(
      set => set.exerciseId === exerciseId && 
             set.date === date && 
             set.setIndex === setIndex
    );
    return loggedSet ? loggedSet[field] : '';
  };

  // Update logged set value
  const updateLoggedSetValue = (
    exerciseId: string, 
    date: string, 
    setIndex: number, 
    field: 'reps' | 'weight', 
    value: string
  ) => {
    const existingSetIndex = loggedSets.findIndex(
      set => set.exerciseId === exerciseId && 
             set.date === date && 
             set.setIndex === setIndex
    );

    if (existingSetIndex >= 0) {
      // Update existing set
      const updatedSets = [...loggedSets];
      updatedSets[existingSetIndex] = {
        ...updatedSets[existingSetIndex],
        [field]: value
      };
      setLoggedSets(updatedSets);
    } else {
      // Create new logged set
      setLoggedSets([
        ...loggedSets,
        {
          exerciseId,
          date,
          setIndex,
          reps: field === 'reps' ? value : '',
          weight: field === 'weight' ? value : ''
        }
      ]);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Your Training is Loading...</h1>
        </div>
      </div>
    );
  }

  const userFirstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Athlete';

  return (
    <div className="flex min-h-screen flex-col bg-black dark">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="container max-w-screen-xl mx-auto px-8 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center">
                <span className="text-xl font-bold text-blue-400">VPD</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="font-medium text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard/progress"
                className="font-medium text-gray-200 transition-colors hover:text-blue-400"
              >
                Progress
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-8 w-8 border border-blue-500">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userFirstName} />
                  <AvatarFallback className="bg-neutral-800 text-blue-400">
                    {userFirstName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-200 hover:text-blue-400">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-200 hover:text-blue-400"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col gap-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back, {userFirstName}</h1>
                <p className="text-gray-300">Here's your weekly workout schedule</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-blue-500 text-gray-200 hover:text-blue-400">
                  <Calendar className="mr-2 h-4 w-4" />
                  Full Calendar
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90" size="sm">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Log Workout
                </Button>
              </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Weekly Schedule */}
              <div className="lg:col-span-3 space-y-6">
                <Card className="bg-neutral-950 border border-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-xl">Weekly Schedule</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-300 hover:text-blue-400"
                          onClick={previousWeek}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous Week</span>
                        </Button>
                        <span className="text-sm text-gray-200">{currentWeekDisplay}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-300 hover:text-blue-400"
                          onClick={nextWeek}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next Week</span>
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">Your weekly training exercises</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {daysOfWeek
                        .filter((day, index) => showAllDays || index < 3)
                        .map((day) => {
                          const plan = getTrainingPlanForDay(day);
                          const exercises = plan?.exercises_data || [];
                          const dayDate = new Date(currentWeekStart);
                          dayDate.setDate(currentWeekStart.getDate() + daysOfWeek.indexOf(day));
                          const formattedDate = format(dayDate, 'MMM d');
                          const dateStr = format(dayDate, 'yyyy-MM-dd');
                          
                          return (
                            <div
                              key={day}
                              className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800"
                            >
                              <div className="flex flex-row">
                                <div className="bg-blue-900 p-4 w-32 flex flex-col justify-center items-center">
                                  <div className="text-white font-bold text-base">{day}</div>
                                  <div className="text-white text-sm">{formattedDate}</div>
                                </div>
                                <div className="flex-1 p-4">
                                  {exercises.length > 0 ? (
                                    <div className="space-y-3">
                                      {exercises.map((exercise) => {
                                        const completed = isExerciseCompleted(exercise.id!, dateStr);
                                        
                                        return (
                                          <div key={exercise.id} className="flex items-start justify-between">
                                            <div className="w-full">
                                              <div className="flex items-center">
                                                <h3 className="font-semibold text-white">{exercise.exercise_name}</h3>
                                                {completed && (
                                                  <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                                                )}
                                              </div>
                                              <p className="text-sm text-gray-300">
                                                {exercise.sets} sets × {exercise.reps} reps
                                                {exercise.notes && ` • ${exercise.notes}`}
                                              </p>
                                              
                                              {/* Log Exercise Inputs */}
                                              <div className="mt-2 space-y-2">
                                                <div className="grid grid-cols-5 gap-2 text-xs text-gray-400 px-1 ">
                                                  <div>Set</div>
                                                  <div className="col-span-2">Reps</div>
                                                  <div className="col-span-2">Weight (lbs)</div>
                                                </div>
                                                {Array.from({ length: exercise.sets }, (_, setIndex) => {
                                                  const setReps = getLoggedSetValue(exercise.id!, dateStr, setIndex, 'reps');
                                                  const setWeight = getLoggedSetValue(exercise.id!, dateStr, setIndex, 'weight');
                                                  const isSetCompleted = setReps !== '' && setWeight !== '';
                                                  
                                                  return (
                                                    <div key={`log-${exercise.id}-${setIndex}`} className={`grid grid-cols-5 gap-2 ${isSetCompleted ? 'bg-blue-900/20 rounded' : ''}`}>
                                                      <div className="flex items-center justify-center text-xs text-gray-300 bg-neutral-800 border border-neutral-700 rounded text-white">
                                                        {setIndex + 1}
                                                      </div>
                                                      <div className="col-span-2">
                                                        <input 
                                                          type="number"
                                                          placeholder="Reps"
                                                          value={setReps}
                                                          onChange={(e) => updateLoggedSetValue(exercise.id!, dateStr, setIndex, 'reps', e.target.value)}
                                                          className="py-1 px-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm w-full focus:border-blue-500 focus:outline-none"
                                                        />
                                                      </div>
                                                      <div className="col-span-2">
                                                        <input 
                                                          type="number"
                                                          placeholder="Weight"
                                                          value={setWeight}
                                                          onChange={(e) => updateLoggedSetValue(exercise.id!, dateStr, setIndex, 'weight', e.target.value)}
                                                          className="py-1 px-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm w-full focus:border-blue-500 focus:outline-none"
                                                        />
                                                      </div>
                                                    </div>
                                                  )})}
                                                  <div className="flex justify-end mt-3">
                                                    <Button
                                                      size="sm"
                                                      className={`flex items-center gap-1 ${
                                                        completed 
                                                          ? "bg-green-700 hover:bg-green-800 text-white" 
                                                          : "bg-blue-600 hover:bg-blue-700 text-white"
                                                      }`}
                                                      onClick={() => {
                                                        toggleExerciseCompletion(exercise.id!, dateStr);
                                                      }}
                                                    >
                                                      {completed ? (
                                                        <>
                                                          <CheckCircle className="h-4 w-4" />
                                                          
                                                        </>
                                                      ) : (
                                                        <>
                                                          <CheckCircle className="h-4 w-4" />
                                                          Save
                                                        </>
                                                      )}
                                                    </Button>
                                                  </div>
                                              </div>
                                            </div>
                                            <Badge 
                                              className={`ml-2 ${
                                                completed 
                                                  ? "bg-green-900/50 text-green-300" 
                                                  : "bg-blue-900/50 text-blue-300"
                                              }`}
                                            >
                                              {completed ? "Completed" : "In Progress"}
                                            </Badge>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) 
                                  : (
                                    <div className="flex items-center">
                                      <p className="text-sm text-gray-400">No exercises scheduled for this day</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>

                    {/* Show More/Less Button */}
                    <div className="mt-4 flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-gray-200 hover:text-blue-400"
                        onClick={() => setShowAllDays(!showAllDays)}
                      >
                        {showAllDays ? "Show Less" : "Show More"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Summary */}
                <Card className="bg-neutral-950 border border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-xl">Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 border-2 border-blue-500 mb-4">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userFirstName} />
                        <AvatarFallback className="bg-neutral-800 text-blue-400 text-xl">
                          {userFirstName.substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-white">{user?.user_metadata?.full_name || userFirstName}</h3>
                      <p className="text-sm text-gray-300">Outside Hitter</p>
                      <div className="mt-4 w-full">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Performance Plan</span>
                          <span className="text-blue-400">Active</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Next Session</span>
                          <span className="text-white">Wednesday, 6:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-gray-200 hover:text-blue-400"
                      asChild
                    >
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        View Full Profile
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Progress Stats */}
                <Card className="bg-neutral-950 border border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-xl">Your Progress</CardTitle>
                    <CardDescription className="text-gray-300">Monthly training statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-300">Attendance Rate</span>
                          <span className="text-sm text-white">{progressStats.attendanceRate}%</span>
                        </div>
                        <Progress value={progressStats.attendanceRate} className="h-2 bg-neutral-800">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                        </Progress>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-300">Skill Progress</span>
                          <span className="text-sm text-white">{progressStats.skillProgress}%</span>
                        </div>
                        <Progress value={progressStats.skillProgress} className="h-2 bg-neutral-800">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                        </Progress>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-300">Goals Completed</span>
                          <span className="text-sm text-white">
                            {progressStats.goalsCompleted}/{progressStats.totalGoals}
                          </span>
                        </div>
                        <Progress
                          value={(progressStats.goalsCompleted / progressStats.totalGoals) * 100}
                          className="h-2 bg-neutral-800"
                        >
                          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-gray-200 hover:text-blue-400"
                      asChild
                    >
                      <Link href="/dashboard/progress">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Detailed Progress
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-900 bg-black py-6">
        <div className="container max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-300">
              © {new Date().getFullYear()} Volleyball Performance Development. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-gray-300 hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-300 hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs text-gray-300 hover:text-blue-400">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 