"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { auth, db, googleProvider } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

type User = {
  id: string
  name: string
  email: string
  role: "patient" | "caregiver"
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string, role?: "patient" | "caregiver") => Promise<void>
  register: (name: string, email: string, password: string, role: "patient" | "caregiver") => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("medilog-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const isAuthRoute = pathname?.includes("/auth")
    const isRootRoute = pathname === "/"

    if (user && isAuthRoute) {
      if (user.role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } else if (!user && !isAuthRoute && !isRootRoute) {
      router.push("/auth/login")
    }
  }, [user, isLoading, pathname, router])

  const register = async (name: string, email: string, password: string, role: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      })
      const userData = {
        id: userCred.user.uid,
        name,
        email,
        role: role as "patient" | "caregiver",
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

  const login = async (email: string, password: string, role?: "patient" | "caregiver") => {
    setIsLoading(true)
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid))
      if (!userDoc.exists()) throw new Error("User profile not found")
      const profile = userDoc.data()
      const userData = {
        id: userCred.user.uid,
        name: profile?.name || "",
        email: profile?.email || email,
        role: (profile?.role || "patient") as "patient" | "caregiver",
      }
      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))
      if (userData.role === "patient") {
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

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const userCred = await signInWithPopup(auth, googleProvider)
      const userDocRef = doc(db, "users", userCred.user.uid)
      const userDoc = await getDoc(userDocRef)
      let role = "patient"
      let name = userCred.user.displayName || ""
      let email = userCred.user.email || ""
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name,
          email,
          role,
          createdAt: new Date().toISOString(),
        })
      } else {
        const profile = userDoc.data()
        role = profile?.role || "patient"
        name = profile?.name || name
        email = profile?.email || email
      }
      const userData = {
        id: userCred.user.uid,
        name,
        email,
        role: role as "patient" | "caregiver",
      }
      setUser(userData)
      localStorage.setItem("medilog-user", JSON.stringify(userData))
      if (role === "patient") {
        router.push("/dashboard/patient")
      } else {
        router.push("/dashboard/caregiver")
      }
    } catch (error) {
      console.error("Google login failed:", error)
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

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}