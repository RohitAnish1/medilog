"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, FileText, Mic, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  const { user } = useAuth()

  const quickActions = [
    {
      title: "Start Recording",
      description: "Record a medical interaction with voice-to-text",
      icon: Mic,
      href: "/record",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Create Flashcards",
      description: "Create flashcards for important medical information",
      icon: PlusCircle,
      href: "/flashcards/create",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Review Flashcards",
      description: "Review your saved medical flashcards",
      icon: FileText,
      href: "/flashcards/review",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Medicine Reminder",
      description: "Set reminders for your medications",
      icon: Clock,
      href: "/medicine-reminder",
      color: "bg-amber-100 dark:bg-amber-900",
    },
  ]

  const upcomingReminders = [
    {
      medicine: "Lisinopril",
      time: "8:00 AM",
      date: "Today",
    },
    {
      medicine: "Metformin",
      time: "1:00 PM",
      date: "Today",
    },
    {
      medicine: "Atorvastatin",
      time: "8:00 PM",
      date: "Today",
    },
  ]

  const recentInteractions = [
    {
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2023",
      summary: "Routine checkup for hypertension. Blood pressure was 130/85.",
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      date: "April 28, 2023",
      summary: "Follow-up for diabetes management. A1C levels improved to 6.8%.",
    },
  ]

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your medical information and upcoming reminders.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="overflow-hidden">
              <Link href={action.href}>
                <CardHeader className="p-4 pb-0">
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Upcoming Medication Reminders</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{reminder.medicine}</p>
                      <p className="text-sm text-muted-foreground">{reminder.date}</p>
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
              <Button variant="outline" className="w-full" asChild>
                <Link href="/medicine-reminder">View All Reminders</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Medical Interactions</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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

