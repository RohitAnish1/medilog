// ============================================================================
// ROOT LAYOUT COMPONENT - Main Application Wrapper
// ============================================================================
// This is the main layout component that wraps the entire Next.js application
// It provides global functionality like theme management, authentication context,
// toast notifications, and the AI chatbot across all pages

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"  // Global theme management (light/dark mode)
import { Toaster } from "@/components/ui/toaster"  // Toast notification system
import { AuthProvider } from "@/components/auth-provider"  // Authentication context provider
import { Inter } from "next/font/google"  // Google Font for consistent typography
import "./globals.css"  // Global CSS styles
import { AIChatbot } from "@/components/ai-chatbot"  // AI assistant chatbot component

// Font configuration - Inter font with Latin character subset
const inter = Inter({ subsets: ["latin"] })

// Metadata for SEO and browser tab display
export const metadata = {
  title: "MediLog - Medical Interaction Logging",
  description: "AI-powered platform for logging and managing medical interactions",
}

// ============================================================================
// ROOT LAYOUT FUNCTION - Application Shell
// ============================================================================
// This component creates the basic HTML structure and provides global providers
// for theme management, authentication, and UI components
export default function RootLayout({
  children,  // All page components will be rendered here
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* Theme Provider - Manages light/dark mode across the app */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Authentication Provider - Manages user login state and role-based access */}
          <AuthProvider>
            {/* Main content area where individual pages render */}
            {children}
            {/* AI Chatbot - Available on all pages for user assistance */}
            <AIChatbot />
            {/* Toast Notification System - For success/error messages */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

