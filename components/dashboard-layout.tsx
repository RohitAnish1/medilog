// ============================================================================
// DASHBOARD LAYOUT COMPONENT - Shared Dashboard UI Structure
// ============================================================================
// This component provides the common layout structure for both patient and caregiver dashboards
// Features include responsive sidebar navigation, user menu, role-based navigation items,
// and consistent header/content layout across all dashboard pages

"use client"

import type React from "react"

import { useState } from "react"                              // React state management
import Link from "next/link"                                 // Next.js navigation component
import { usePathname } from "next/navigation"                // Hook to get current page path
import { useAuth } from "@/components/auth-provider"         // Authentication context
import { Button } from "@/components/ui/button"              // UI button component
import {
  DropdownMenu,                                              // User menu dropdown components
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,              // Notification icon
  Brain,             // App logo icon
  Calendar,          // Calendar/scheduling icon
  ChevronDown,       // Dropdown arrow icon
  ClipboardList,     // Task/list icon
  FileText,          // Document icon
  Home,              // Dashboard home icon
  LogOut,            // Logout icon
  Menu,              // Mobile menu icon
  Mic,               // Recording icon
  PanelLeft,         // Sidebar toggle icon
  PlusCircle,        // Add/create icon
  Search,            // Search icon
  Settings,          // Settings icon
  User,              // User profile icon
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Mobile sidebar components

// ============================================================================
// TYPE DEFINITIONS - Component Props Interface
// ============================================================================
interface DashboardLayoutProps {
  children: React.ReactNode                    // Page content to render within layout
  role: "patient" | "caregiver"               // User role determines navigation options
}

// Navigation item interface for type safety
interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

// ============================================================================
// DASHBOARD LAYOUT MAIN COMPONENT
// ============================================================================
export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  // ============================================================================
  // HOOKS AND STATE - Component State Management
  // ============================================================================
  const { user, logout } = useAuth()                        // Current user and logout function
  const pathname = usePathname()                            // Current page path for active nav highlighting
  const [sidebarOpen, setSidebarOpen] = useState(true)     // Desktop sidebar visibility state

  // ============================================================================
  // NAVIGATION CONFIGURATION - Role-Based Menu Items
  // ============================================================================
  
  // Patient navigation menu items - focused on personal health management
  const patientNavItems: NavigationItem[] = [
    {
      title: "Dashboard",                                    // Main dashboard overview
      href: "/dashboard/patient",
      icon: Home,
    },
    {
      title: "Record Interaction",
      href: "/record",
      icon: Mic,
    },
    {
      title: "Create Flashcards",
      href: "/flashcards/create",
      icon: PlusCircle,
    },
    {
      title: "Review Flashcards",
      href: "/flashcards/review",
      icon: ClipboardList,
    },
    {
      title: "Medicine Reminders",
      href: "/medicine-reminder",
      icon: Calendar,
    },
    {
      title: "Search Records",
      href: "/search",
      icon: Search,
    },
  ]

  const caregiverNavItems: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/caregiver",
      icon: Home,
    },
    {
      title: "Record Interaction",
      href: "/record",
      icon: Mic,
    },
    {
      title: "Patient Records",
      href: "/patient-records",
      icon: FileText,
    },
    {
      title: "Add New Patient Log",
      href: "/patient-log/new",
      icon: PlusCircle,
    },
    {
      title: "Search Records",
      href: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const navItems = role === "patient" ? patientNavItems : caregiverNavItems

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-deep-teal text-white px-4 sm:px-6 shadow-sm">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20" aria-label="Toggle Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 sm:max-w-sm bg-soft-gray">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b py-4">
                <Brain className="h-6 w-6 text-deep-teal" />
                <span className="text-lg font-bold">MediLog</span>
              </div>
              <nav className="flex-1 overflow-auto py-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((item: NavigationItem) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-deep-teal text-white"
                          : "text-dark-charcoal hover:bg-deep-teal/10"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6" />
            <span>MediLog</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-cool-cyan"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20">
                <User className="h-5 w-5" />
                <span className="hidden md:inline-flex">{user?.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 shadow-elevated">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-deep-teal/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-deep-teal/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-deep-teal/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={`fixed inset-y-0 left-0 z-20 mt-16 hidden w-64 transform border-r bg-soft-gray transition-transform duration-200 ease-in-out md:block ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item: NavigationItem) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? "bg-deep-teal text-white" : "text-dark-charcoal hover:bg-deep-teal/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main
          className={`flex-1 transition-all duration-200 ease-in-out bg-soft-gray/50 ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}
        >
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

