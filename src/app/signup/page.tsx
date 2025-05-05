"use client"

import { signup } from './actions'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "basic",
    termsAccepted: false
  })
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    termsAccepted?: string;
  }>({});

  // Handle input change from form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    
    // Basic sanitization - trim whitespace
    const sanitizedValue = type === 'checkbox' ? checked : value.trim();
    
    setFormData(prev => ({
      ...prev,
      [id]: sanitizedValue
    }));
    
    // Clear error when field is edited
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
    
    // Clear success message when user edits form after submission
    if (successMessage) {
      setSuccessMessage("");
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plan: value
    }));
    
    // Clear success message when user edits form after submission
    if (successMessage) {
      setSuccessMessage("");
    }
  }

  // Validate form data
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Name validation - only letters, spaces, and common name characters
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s.',-]{2,50}$/.test(formData.name)) {
      newErrors.name = "Name appears to be invalid";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, and numbers";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create sanitized FormData for submission
      const formDataToSubmit = new FormData();
      
      // Sanitize name - remove excessive spaces, escape HTML
      formDataToSubmit.append('name', 
        formData.name
          .replace(/\s+/g, ' ')
          .replace(/[<>&"']/g, c => {
            return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c] || c;
          })
      );
      
      // Email - normalize to lowercase
      formDataToSubmit.append('email', formData.email.toLowerCase());
      
      // Don't sanitize password - it needs to be exact as entered
      formDataToSubmit.append('password', formData.password);
      
      // Add plan
      formDataToSubmit.append('plan', formData.plan);
      
      // Submit the sanitized data
      await signup(formDataToSubmit);
      
      // Show success message
      setSuccessMessage("An email has been sent, please confirm your account");
      
      // Optionally, reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        plan: "basic",
        termsAccepted: false
      });
    } catch (error) {
      console.error('Signup error:', error);
      // Handle submission errors if needed
    } finally {
      setIsLoading(false);
    }
  };

  // Render the signup page
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900 to-black">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="w-full flex h-16 items-center justify-between py-4 px-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-400 ">VDP</span>
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
              <CardDescription className="text-gray-300">Join our vertical jump training program</CardDescription>
            </CardHeader>
            <CardContent>
              {successMessage ? (
                <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-md">
                  <p className="text-sm text-green-400">{successMessage}</p>
                  <p className="text-xs text-green-300 mt-1">Please check your email inbox and follow the instructions to confirm your account.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name" className="text-gray-200">
                        First Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="bg-neutral-900 border-neutral-800 text-white"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
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
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
                      {errors.password ? (
                        <p className="text-xs text-red-500">{errors.password}</p>
                      ) : (
                        <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
                      )}
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
                      {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
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
                            Performance - $25 every 3 months
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
                      <Label htmlFor="termsAccepted" className="text-sm text-gray-300 flex-wrap">
                        <span className="flex flex-wrap">
                          I agree to the{" "}
                          <span className="text-blue-400 mx-1">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-blue-400 mx-1">
                            Privacy Policy
                          </span>
                        </span>
                      </Label>
                      {errors.termsAccepted && <p className="text-xs text-red-500 ml-2">{errors.termsAccepted}</p>}
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
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}