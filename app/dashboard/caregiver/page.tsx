"use client"

import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Mic, PlusCircle, Search, User } from "lucide-react"
import Link from "next/link"

export default function CaregiverDashboard() {
  const { user } = useAuth()

  const quickActions = [
    {
      title: "Record Interaction",
      description: "Record a patient interaction with voice-to-text",
      icon: Mic,
      href: "/record",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Add Patient Log",
      description: "Manually add a new patient log",
      icon: PlusCircle,
      href: "/patient-log/new",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Patient Records",
      description: "View and manage patient records",
      icon: FileText,
      href: "/patient-records",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Search Records",
      description: "Search through patient records",
      icon: Search,
      href: "/search",
      color: "bg-amber-100 dark:bg-amber-900",
    },
  ]

  const recentPatientLogs = [
    {
      patient: "John Smith",
      age: 45,
      date: "May 18, 2023",
      summary: "Follow-up for hypertension. Blood pressure: 130/85. Medication adjusted.",
    },
    {
      patient: "Emily Johnson",
      age: 32,
      date: "May 17, 2023",
      summary: "Annual checkup. All vitals normal. Recommended routine blood work.",
    },
    {
      patient: "Robert Davis",
      age: 68,
      date: "May 16, 2023",
      summary: "Diabetes management. A1C: 7.2%. Adjusted insulin dosage.",
    },
    {
      patient: "Sarah Wilson",
      age: 29,
      date: "May 15, 2023",
      summary: "Prenatal visit. Fetal heartbeat normal. Prescribed prenatal vitamins.",
    },
  ]

  const upcomingFollowUps = [
    {
      patient: "John Smith",
      reason: "Blood pressure check",
      date: "June 18, 2023",
    },
    {
      patient: "Maria Garcia",
      reason: "Post-surgery follow-up",
      date: "May 25, 2023",
    },
    {
      patient: "Robert Davis",
      reason: "Diabetes management",
      date: "June 16, 2023",
    },
  ]

  return (
    <DashboardLayout role="caregiver">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your recent patient interactions and upcoming follow-ups.
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

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Patient Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentPatientLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{log.patient}</p>
                        <p className="text-sm text-muted-foreground">Age: {log.age}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.date}</p>
                      <p className="text-sm">{log.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/patient-records">View All Patient Records</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingFollowUps.map((followUp, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{followUp.patient}</p>
                      <p className="text-sm">{followUp.reason}</p>
                      <p className="text-sm text-muted-foreground">{followUp.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Follow-ups
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+5% from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">New Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">+2 from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">-1 from last week</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="monthly" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">New Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">+5 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground">+8 from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="yearly" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">512</div>
                      <p className="text-xs text-muted-foreground">+24% from last year</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">New Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">128</div>
                      <p className="text-xs text-muted-foreground">+32 from last year</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">384</div>
                      <p className="text-xs text-muted-foreground">+96 from last year</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

