"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Users,
  UserPlus,
  BarChart2,
  Settings,
  LogOut,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { createClientClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { getUser } from "@/queries/user"

interface Profile {
  id: string;
  email: string;
  first_name: string;
  plan: string;
  admin: boolean;
}

export default function CoachDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<Profile[]>([])
  const router = useRouter();
  const supabase = createClientClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) {
          console.error('Error fetching profiles:', error);
          return;
        }
         
        if (data) {
          setUsers(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

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
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Loading Athletes...</h1>
        </div>
      </div>
    );
  }

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
              <Link href="/coach-dashboard" className="font-medium text-blue-400 transition-colors">
                Coach Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
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
                <h1 className="text-2xl md:text-3xl font-bold text-white">Coach Dashboard</h1>
                <p className="text-gray-300">Manage your athletes and track their progress</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Search athletes..."
                  className="pl-10 bg-neutral-900 border-neutral-800 text-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-neutral-950 border border-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-blue-500">
                        <AvatarImage src="/placeholder.svg" alt={user.first_name || "User"} />
                        <AvatarFallback className="bg-neutral-800 text-blue-400">
                          {user.first_name?.substring(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white">
                          {user.first_name.toUpperCase() || "Unnamed User"}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          athlete
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{user.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Plan</span>
                        <span className="text-white">{user.plan}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Role</span>
                        <span className="text-white">{user.admin ? 'Admin' : 'Athlete'}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90"
                      onClick={() => router.push(`/athlete/${user.id}`)}
                    >
                      View Calendar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
              <span className="text-xs text-gray-300">Privacy Policy</span>
              <span className="text-xs text-gray-300">Terms of Service</span>
              <span className="text-xs text-gray-300">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 