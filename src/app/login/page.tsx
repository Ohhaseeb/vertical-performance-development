"use client"

import { createClientClient } from "@/utils/supabase/client";


import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const supabase = createClientClient();
  const [showPassword, setShowPassword] = useState(false)

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
            <Button className="bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="bg-neutral-950 border border-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-300">Login to access your training program</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="bg-neutral-900 border-neutral-800 text-white"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password" className="text-gray-200">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-neutral-900 border-neutral-800 text-white pr-10"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-300 focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="border-neutral-700 data-[state=checked]:bg-blue-500" />
                      <Label htmlFor="remember" className="text-sm text-gray-300">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90">
                Login
              </Button>
              <p className="text-sm text-gray-300 text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}