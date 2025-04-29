"use client"

import { login } from './actions'
import { createClientClient } from "@/utils/supabase/client";
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const supabase = createClientClient();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  
  // Handle input change from form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  // Handle form submission, calls login action from actions.ts, if it is an error then it will show a toast error otherwise will log user in
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await login(formData);
    if (result?.error) {
      toast.error(result.error);
    }
    setIsLoading(false);
  }

  // Handle forgot password, if the email is not entered then it will show a toast error otherwise it will send a reset password email
  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while sending the reset email");
    } finally {
      setIsLoading(false);
    }
  }

  // Render the login page
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900 to-black">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="w-full flex h-16 items-center justify-between py-4 px-8">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <span className="text-xl font-bold text-blue-400">VDP</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center">
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
              <CardDescription className="text-gray-300">Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="bg-neutral-900 border-neutral-800 text-white"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-3">
                      <Label htmlFor="password" className="text-gray-200">
                        Password
                      </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-neutral-900 border-neutral-800 text-white pr-10"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
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
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-400 hover:underline"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <CardFooter className="flex flex-col gap-4 px-0 pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-sm text-gray-300 text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-400 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}