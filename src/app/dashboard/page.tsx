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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getUser } from "@/queries/user"

interface Exercise {
  id: number
  name: string
  sets: number
  reps: string
  weight: string
  completed: boolean
}

type DaySchedule = Exercise[]

interface ExerciseSchedule {
  [key: string]: DaySchedule
}

// Mock data for weightlifting exercises
const exercisesByDay: ExerciseSchedule = {
  Monday: [
    { id: 1, name: "Bench Press", sets: 4, reps: "8-10", weight: "135 lbs", completed: true },
    { id: 2, name: "Incline Dumbbell Press", sets: 3, reps: "10-12", weight: "40 lbs", completed: true },
    { id: 3, name: "Cable Flyes", sets: 3, reps: "12-15", weight: "25 lbs", completed: false },
  ],
  Tuesday: [
    { id: 4, name: "Squats", sets: 4, reps: "8-10", weight: "185 lbs", completed: false },
    { id: 5, name: "Leg Press", sets: 3, reps: "10-12", weight: "225 lbs", completed: false },
    { id: 6, name: "Leg Extensions", sets: 3, reps: "12-15", weight: "90 lbs", completed: false },
  ],
  Wednesday: [
    { id: 7, name: "Pull-ups", sets: 4, reps: "8-10", weight: "Bodyweight", completed: false },
    { id: 8, name: "Barbell Rows", sets: 3, reps: "10-12", weight: "115 lbs", completed: false },
    { id: 9, name: "Lat Pulldowns", sets: 3, reps: "12-15", weight: "100 lbs", completed: false },
  ],
  Thursday: [
    { id: 10, name: "Overhead Press", sets: 4, reps: "8-10", weight: "95 lbs", completed: false },
    { id: 11, name: "Lateral Raises", sets: 3, reps: "10-12", weight: "15 lbs", completed: false },
    { id: 12, name: "Face Pulls", sets: 3, reps: "12-15", weight: "45 lbs", completed: false },
  ],
  Friday: [
    { id: 13, name: "Deadlifts", sets: 4, reps: "6-8", weight: "225 lbs", completed: false },
    { id: 14, name: "Romanian Deadlifts", sets: 3, reps: "8-10", weight: "135 lbs", completed: false },
    { id: 15, name: "Hyperextensions", sets: 3, reps: "12-15", weight: "Bodyweight", completed: false },
  ],
  Saturday: [
    { id: 16, name: "Bicep Curls", sets: 4, reps: "10-12", weight: "30 lbs", completed: false },
    { id: 17, name: "Tricep Pushdowns", sets: 3, reps: "10-12", weight: "50 lbs", completed: false },
    { id: 18, name: "Hammer Curls", sets: 3, reps: "12-15", weight: "25 lbs", completed: false },
  ],
  Sunday: [{ id: 19, name: "Rest Day", sets: 0, reps: "0", weight: "0", completed: false }],
}

// Mock data for progress
const progressStats = {
  attendanceRate: 92,
  skillProgress: 78,
  goalsCompleted: 8,
  totalGoals: 10,
}

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function DashboardPage() {
  const supabase = createClientClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState("This Week");
  const [showAllDays, setShowAllDays] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user: userData, error } = await getUser();
      
      if (error || !userData) {
        router.push('/login');
        return;
      }
      
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
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
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous Week</span>
                        </Button>
                        <span className="text-sm text-gray-200">{currentWeek}</span>
                        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-blue-400">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next Week</span>
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">Your weekly weightlifting exercises</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {daysOfWeek
                        .filter((day, index) => showAllDays || index < 3)
                        .map((day) => {
                          const exercises = exercisesByDay[day] || []
                          return (
                            <div
                              key={day}
                              className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800"
                            >
                              <div className="flex flex-row">
                                <div className="bg-blue-900 p-4 w-32 flex flex-col justify-center items-center">
                                  <div className="text-white font-bold text-base">{day}</div>
                                </div>
                                <div className="flex-1 p-4">
                                  {exercises.length > 0 && day !== "Sunday" ? (
                                    <div className="space-y-3">
                                      {exercises.map((exercise) => (
                                        <div key={exercise.id} className="flex items-start justify-between">
                                          <div>
                                            <div className="flex items-center">
                                              <h3 className="font-semibold text-white">{exercise.name}</h3>
                                              {exercise.completed && (
                                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                                              )}
                                            </div>
                                            <p className="text-sm text-gray-300">
                                              {exercise.sets} sets × {exercise.reps} reps • {exercise.weight}
                                            </p>
                                          </div>
                                          {exercise.completed ? (
                                            <Badge className="bg-green-900 text-green-300 hover:bg-green-900">
                                              Completed
                                            </Badge>
                                          ) : (
                                            <Badge className="bg-blue-900 text-blue-300 hover:bg-blue-900">To Do</Badge>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : day === "Sunday" ? (
                                    <div className="flex items-center">
                                      <p className="text-sm text-gray-300">Rest day - No exercises scheduled</p>
                                    </div>
                                  ) : (
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