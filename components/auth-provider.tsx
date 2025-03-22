"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "patient" | "caregiver"
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string, role: "patient" | "caregiver") => Promise<void>
  register: (name: string, email: string, password: string, role: "patient" | "caregiver") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("medilog-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect based on auth status and role
  useEffect(() => {
    if (isLoading) return

    const isAuthRoute = pathname?.includes("/auth")
    const isRootRoute = pathname === "/"

    if (user && isAuthRoute) {
      // Redirect logged in users away from auth pages
      if (user.role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } else if (!user && !isAuthRoute && !isRootRoute) {
      // Redirect non-logged in users to login
      router.push("/auth/login")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string, role: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        role,
      }

      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))

      if (role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
      }

      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))

      if (role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("medilog-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

