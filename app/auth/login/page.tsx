// ============================================================================
// LOGIN PAGE - User Authentication Interface
// ============================================================================
// This component provides the login interface for existing MediLog users
// Features include email/password authentication, role selection (patient/caregiver),
// form validation, loading states, and error handling with toast notifications

"use client"

import type React from "react"

import { useState } from "react"                                // React state management
import Link from "next/link"                                    // Next.js navigation component
import { useAuth } from "@/components/auth-provider"            // Authentication context hook
import { Button } from "@/components/ui/button"                 // UI button component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Card layout components
import { Input } from "@/components/ui/input"                   // Form input component
import { Label } from "@/components/ui/label"                   // Form label component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Radio button components for role selection
import { Brain, Loader2 } from "lucide-react"                  // Icon components
import { useToast } from "@/components/ui/use-toast"            // Toast notification hook

// ============================================================================
// LOGIN PAGE MAIN COMPONENT
// ============================================================================
export default function LoginPage() {
  // ============================================================================
  // HOOKS AND STATE - Authentication and UI State Management
  // ============================================================================
  const { login, isLoading } = useAuth()                       // Authentication functions and loading state
  const { toast } = useToast()                                 // Toast notification system
  
  // Form input state variables
  const [email, setEmail] = useState("")                       // User email input
  const [password, setPassword] = useState("")                 // User password input
  const [role, setRole] = useState<"patient" | "caregiver">("patient") // User role selection

  // ============================================================================
  // FORM SUBMISSION HANDLER - Process Login Attempt
  // ============================================================================
  // Handles form submission, calls authentication API, and manages success/error states
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()                                          // Prevent default form submission

    try {
      // Attempt to log in with provided credentials
      await login(email, password, role)
      
      // Show success notification
      toast({
        title: "Login successful",
        description: "Welcome back to MediLog!",
      })
    } catch (error) {
      // Show error notification if login fails
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",                                // Red/error styling
      })
    }
  }

  // ============================================================================
  // LOGIN FORM RENDER - User Interface Layout
  // ============================================================================
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-gray p-4">
      <Card className="w-full max-w-md shadow-elevated border-deep-teal/10">
        
        {/* ============================================================================ */}
        {/* CARD HEADER - Branding and Title */}
        {/* ============================================================================ */}
        <CardHeader className="space-y-1">
          {/* App Logo and Brand Link */}
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-deep-teal">
              <Brain className="h-6 w-6" />               {/* Brain icon for medical/AI theme */}
              <span>MediLog</span>                        {/* Application name */}
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-deep-teal/20 focus-visible:ring-deep-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-deep-teal/20 focus-visible:ring-deep-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                defaultValue="patient"
                value={role}
                onValueChange={(value: string) => setRole(value as "patient" | "caregiver")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="caregiver" id="caregiver" />
                  <Label htmlFor="caregiver">Caregiver</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-deep-teal hover:bg-deep-teal/90 transition-all button-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-deep-teal hover:text-deep-teal/80 underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

