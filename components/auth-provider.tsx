// ============================================================================
// AUTHENTICATION PROVIDER - User Authentication & Role Management
// ============================================================================
// This component provides authentication context throughout the application
// Handles user login, registration, logout, and role-based routing
// Manages user session persistence and automatic redirects based on auth status

"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// ============================================================================
// TYPE DEFINITIONS - Authentication System Types
// ============================================================================

// User object structure - null when not authenticated
type User = {
  id: string                    // Unique user identifier
  name: string                  // User's display name
  email: string                 // User's email address
  role: "patient" | "caregiver" // User role determining dashboard access
} | null

// Authentication context interface defining all auth-related functions
type AuthContextType = {
  user: User                    // Current authenticated user or null
  login: (email: string, password: string, role: "patient" | "caregiver") => Promise<void>
  register: (name: string, email: string, password: string, role: "patient" | "caregiver") => Promise<void>
  logout: () => void            // Function to log out current user
  isLoading: boolean            // Loading state for auth operations
}

// Create authentication context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================================================
// AUTHENTICATION PROVIDER COMPONENT - Main Auth Logic
// ============================================================================
// Wraps the entire application to provide authentication state and functions
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)      // Current user state
  const [isLoading, setIsLoading] = useState(true)  // Loading state for initial auth check
  const router = useRouter()                        // Next.js router for navigation
  const pathname = usePathname()                    // Current page path

  // ============================================================================
  // INITIAL AUTHENTICATION CHECK - Page Load User Validation
  // ============================================================================
  // Checks localStorage for existing user session on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("medilog-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))  // Restore user session from localStorage
    }
    setIsLoading(false)  // Mark initial auth check as complete
  }, [])

  // ============================================================================
  // ROUTE PROTECTION & REDIRECTS - Role-Based Navigation Logic
  // ============================================================================
  // Automatically redirects users based on authentication status and role
  useEffect(() => {
    if (isLoading) return  // Don't redirect while checking auth status

    const isAuthRoute = pathname?.includes("/auth")  // Check if on login/register pages
    const isRootRoute = pathname === "/"             // Check if on landing page

    if (user && isAuthRoute) {
      // Redirect logged in users away from auth pages to their dashboard
      if (user.role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } else if (!user && !isAuthRoute && !isRootRoute) {
      // Redirect non-logged in users to login (except from landing page)
      router.push("/auth/login")
    }
  }, [user, isLoading, pathname, router])

  // ============================================================================
  // LOGIN FUNCTION - User Authentication
  // ============================================================================
  // Authenticates user credentials and sets up session
  const login = async (email: string, password: string, role: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate with backend
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data creation (replace with actual API response)
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),  // Generate random ID
        name: email.split("@")[0],  // Extract name from email prefix
        email,
        role,
      }

      // Set user state and persist to localStorage
      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))

      // Redirect to appropriate dashboard based on user role
      if (role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error  // Re-throw for error handling in UI
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================================
  // REGISTRATION FUNCTION - New User Account Creation
  // ============================================================================
  // Creates new user account and automatically logs them in
  const register = async (name: string, email: string, password: string, role: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to create account
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data creation (replace with actual API response)
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),  // Generate random ID
        name,       // Use provided name
        email,
        role,
      }

      // Set user state and persist to localStorage
      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))

      // Redirect to appropriate dashboard based on user role
      if (role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } catch (error) {
      console.error("Registration failed:", error)
      throw error  // Re-throw for error handling in UI
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================================
  // LOGOUT FUNCTION - User Session Termination
  // ============================================================================
  // Clears user session and redirects to landing page
  const logout = () => {
    setUser(null)                                    // Clear user state
    localStorage.removeItem("medilog-user")          // Remove session from localStorage
    router.push("/")                                 // Redirect to landing page
  }

  // ============================================================================
  // CONTEXT PROVIDER - Make Auth Functions Available to Child Components
  // ============================================================================
  // Provides authentication state and functions to all child components
  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

// ============================================================================
// AUTHENTICATION HOOK - Easy Access to Auth Context
// ============================================================================
// Custom hook for accessing authentication context in any component
// Throws error if used outside of AuthProvider to prevent undefined context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

