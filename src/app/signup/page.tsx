"use client"
import { createClientClient } from "@/utils/supabase/client";
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export default function Signup() {
  const supabase = createClientClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "basic",
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plan: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            plan: formData.plan
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Signup successful! Please check your email to confirm your account.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900 to-black">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
             
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
              <CardTitle className="text-2xl text-white">Create an Account</CardTitle>
              <CardDescription className="text-gray-300">Join our volleyball training program</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name" className="text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="bg-neutral-900 border-neutral-800 text-white"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
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
                    <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword" className="text-gray-200">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-neutral-900 border-neutral-800 text-white pr-10"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-300 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-gray-200">Select Your Plan</Label>
                    <RadioGroup 
                      defaultValue="basic" 
                      onValueChange={handleRadioChange}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="basic" id="basic" className="border-neutral-700 text-blue-500" />
                        <Label htmlFor="basic" className="text-gray-200">
                          Basic - $10/month
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="performance"
                          id="performance"
                          className="border-neutral-700 text-blue-500"
                        />
                        <Label htmlFor="performance" className="text-gray-200">
                          Performance - $15/month
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="termsAccepted" 
                      className="border-neutral-700 data-[state=checked]:bg-blue-500" 
                      required 
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="termsAccepted" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-400 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
                <CardFooter className="flex flex-col gap-4 px-0 pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                  <p className="text-sm text-gray-300 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                      Log in
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