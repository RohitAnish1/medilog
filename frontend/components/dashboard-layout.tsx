"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Brain,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Menu,
  Mic,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "patient" | "caregiver"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const patientNavItems = [
    {
      title: "Dashboard",
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

  const caregiverNavItems = [
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
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20" aria-label="Toggle Menu">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-sm bg-soft-gray">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b py-4">
                  <Brain className="h-6 w-6 text-deep-teal" />
                  <span className="text-lg font-bold">MediLog</span>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
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
        </Button>
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
            {navItems.map((item) => (
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

