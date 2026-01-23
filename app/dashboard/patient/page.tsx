// ============================================================================
// PATIENT DASHBOARD - Main Patient Interface
// ============================================================================
// This component serves as the main dashboard for patient users
// Features include quick action buttons, upcoming medication reminders,
// and recent medical interactions overview for easy patient management

"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"           // Authentication context
import { DashboardLayout } from "@/components/dashboard-layout" // Dashboard wrapper component
import { Button } from "@/components/ui/button"                 // Reusable button component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Card components
import { Calendar, Clock, FileText, Mic, PlusCircle } from "lucide-react" // Icon components
import Link from "next/link"                                    // Next.js navigation component
import { fetchUserReminders } from "@/lib/firebase"
type Reminder = {
  id: string
  medicine: string
  dosage: string
  frequency: string
  time: string
  days: string[]
  notes?: string
}
// ============================================================================
// PATIENT DASHBOARD MAIN COMPONENT
// ============================================================================
export default function PatientDashboard() {
  const { user } = useAuth()  // Get current authenticated user
  const [upcomingReminders, setUpcomingReminders] = useState<Reminder[]>([])
  // ============================================================================
  // QUICK ACTIONS DATA - Primary Feature Access Points
  // ============================================================================
  // Configuration for main dashboard action cards that link to key features
  const quickActions = [
    {
      title: "Start Recording",
      description: "Record a medical interaction with voice-to-text",
      icon: Mic,                           // Microphone icon for recording
      href: "/record",                     // Link to voice recording page
      color: "bg-blue-100 dark:bg-blue-900", // Card background color
    },
    {
      title: "Create Flashcards",
      description: "Create flashcards for important medical information",
      icon: PlusCircle,                    // Plus icon for creation
      href: "/flashcards/create",          // Link to flashcard creation
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Review Flashcards",
      description: "Review your saved medical flashcards",
      icon: FileText,                      // Document icon for review
      href: "/flashcards/review",          // Link to flashcard review
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Medicine Reminder",
      description: "Set reminders for your medications",
      icon: Clock,                         // Clock icon for reminders
      href: "/medicine-reminder",          // Link to medication reminders
      color: "bg-amber-100 dark:bg-amber-900",
    },
  ]

  // ============================================================================
  // UPCOMING REMINDERS DATA - Next Medication Schedule
  // ============================================================================
  // Mock data for displaying upcoming medication reminders (would come from database)
  

  // ============================================================================
  // RECENT INTERACTIONS DATA - Medical History Preview
  // ============================================================================
  // Mock data for recent doctor visits and medical interactions
  const recentInteractions = [
    {
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",           // Heart specialist
      date: "May 15, 2023",
      summary: "Routine checkup for hypertension. Blood pressure was 130/85.", // Visit summary
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "Endocrinologist",        // Diabetes specialist
      date: "April 28, 2023",
      summary: "Follow-up for diabetes management. A1C levels improved to 6.8%.",
    },
  ]
   useEffect(() => {
    if (!user?.id) return
    fetchUserReminders(user.id).then(setUpcomingReminders)
  }, [user?.id])
  // ============================================================================
  // DASHBOARD RENDER - Main Patient Interface Layout
  // ============================================================================
  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        {/* ============================================================================ */}
        {/* WELCOME SECTION - Personalized Greeting */}
        {/* ============================================================================ */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your medical information and upcoming reminders.
          </p>
        </div>

        {/* ============================================================================ */}
        {/* QUICK ACTIONS GRID - Main Feature Access Cards */}
        {/* ============================================================================ */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="overflow-hidden">
              <Link href={action.href}>
                <CardHeader className="p-4 pb-0">
                  {/* Icon container with themed background */}
                  <div className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* ============================================================================ */}
        {/* INFORMATION PANELS - Reminders and Recent Activity */}
        {/* ============================================================================ */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* MEDICATION REMINDERS PANEL */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Upcoming Medication Reminders</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Display each upcoming medication reminder */}
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{reminder.medicine}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {/* Link to full medication management page */}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/medicine-reminder">View All Reminders</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* RECENT MEDICAL INTERACTIONS PANEL */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Medical Interactions</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Display each recent medical interaction */}
                {recentInteractions.map((interaction, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{interaction.doctor}</p>
                      <p className="text-sm text-muted-foreground">{interaction.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{interaction.specialty}</p>
                    <p className="text-sm">{interaction.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {/* Link to full interaction history search */}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/search">View All Interactions</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

