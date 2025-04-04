"use client"

import { useEffect, useState } from "react";
import { createClientClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const supabase = createClientClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        if (!user) {
          router.push('/login');
          return;
        }
        
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase, router]);

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
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900 to-black">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="VPD Logo"
                  className="rounded"
                />
                <span className="text-xl font-bold text-blue-400">VPD</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="rounded-lg border border-blue-500 bg-neutral-950 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to Your Dashboard</h1>
          
          <div className="bg-neutral-900 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Name:</span> {user?.user_metadata?.full_name || 'Not provided'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Plan:</span> {user?.user_metadata?.plan || 'Basic'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Training Programs</h3>
              <p className="text-gray-400 mb-4">Access your personalized training programs</p>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                View Programs
              </button>
            </div>
            
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-gray-400 mb-4">Track your performance and improvements</p>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                View Progress
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 