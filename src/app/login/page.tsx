"use client"

import { login } from './actions'
import { createClientClient } from "@/utils/supabase/client";
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Zap, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
    <div className="flex min-h-screen flex-col bg-[#0A0A0F]" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-orange-500/10">
        <div className="w-full flex h-16 items-center justify-between py-4 px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>VDP</span>
          </Link>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 cursor-pointer" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 relative">
        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />

        <div className="relative w-full max-w-md">
          <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/60 to-[#0A0A0F] p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>

            <form action={handleSubmit}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-gray-800/40 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-orange-500/20"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-sm text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-gray-800/40 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-orange-500/20 pr-10"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-300 focus:outline-none cursor-pointer transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-gray-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 cursor-pointer" />
                    <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200 cursor-pointer"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 py-5 font-semibold cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
