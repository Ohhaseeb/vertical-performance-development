"use client"

import { signup } from './actions'
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Zap, ArrowLeft, Flame } from "lucide-react"

import { Button } from "@/components/ui/button"
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
                Create an Account
              </h1>
              <p className="text-sm text-gray-500 mt-1">Join our vertical jump training program</p>
            </div>

            {successMessage ? (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-400 font-medium">{successMessage}</p>
                <p className="text-xs text-gray-400 mt-2">Please check your email inbox and follow the instructions to confirm your account.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  {/* Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm text-gray-300">
                      First Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="bg-gray-800/40 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-orange-500/20"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
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
                    {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  </div>

                  {/* Password */}
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
                    {errors.password ? (
                      <p className="text-xs text-red-400">{errors.password}</p>
                    ) : (
                      <p className="text-xs text-gray-600">Password must be at least 8 characters long</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-gray-800/40 border-gray-700/60 text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-orange-500/20 pr-10"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-500 hover:text-gray-300 focus:outline-none cursor-pointer transition-colors duration-200"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
                  </div>

                  {/* Plan Selection */}
                  <div className="grid gap-3">
                    <Label className="text-sm text-gray-300">Select Your Plan</Label>
                    <RadioGroup
                      defaultValue="basic"
                      onValueChange={handleRadioChange}
                      className="grid gap-3"
                    >
                      <label htmlFor="basic" className="cursor-pointer">
                        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                          formData.plan === "basic"
                            ? "border-orange-500/40 bg-orange-500/5"
                            : "border-gray-800/60 bg-gray-800/20 hover:border-gray-700"
                        }`}>
                          <RadioGroupItem value="basic" id="basic" className="border-gray-600 text-orange-500" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-white">Basic</span>
                            <span className="text-sm text-gray-500 ml-2">$10/month</span>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="performance" className="cursor-pointer">
                        <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 relative ${
                          formData.plan === "performance"
                            ? "border-orange-500/40 bg-orange-500/5"
                            : "border-gray-800/60 bg-gray-800/20 hover:border-gray-700"
                        }`}>
                          <RadioGroupItem value="performance" id="performance" className="border-gray-600 text-orange-500" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-white">Performance</span>
                            <span className="text-sm text-gray-500 ml-2">$25 every 3 months</span>
                          </div>
                          <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                        </div>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      className="border-gray-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 cursor-pointer mt-0.5"
                      required
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="termsAccepted" className="text-sm text-gray-400 cursor-pointer">
                        I agree to the{" "}
                        <span className="text-orange-400">Terms of Service</span>
                        {" "}and{" "}
                        <span className="text-orange-400">Privacy Policy</span>
                      </Label>
                      {errors.termsAccepted && <p className="text-xs text-red-400 mt-1">{errors.termsAccepted}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 py-5 font-semibold cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
