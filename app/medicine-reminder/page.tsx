"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Clock, Loader2, Plus, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Reminder = {
  id: string
  medicine: string
  dosage: string
  frequency: string
  time: string
  days: string[]
  notes?: string
}

export default function MedicineReminderPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id">>({
    medicine: "",
    dosage: "",
    frequency: "daily",
    time: "08:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    notes: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just use localStorage or mock data
    const savedReminders = JSON.parse(localStorage.getItem("medilog-reminders") || "[]")

    // If no saved reminders, use mock data
    const mockReminders: Reminder[] =
      savedReminders.length > 0
        ? savedReminders
        : [
            {
              id: "1",
              medicine: "Lisinopril",
              dosage: "10mg",
              frequency: "daily",
              time: "08:00",
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              notes: "Take with food",
            },
            {
              id: "2",
              medicine: "Metformin",
              dosage: "500mg",
              frequency: "twice-daily",
              time: "13:00",
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              notes: "Take with lunch",
            },
            {
              id: "3",
              medicine: "Atorvastatin",
              dosage: "20mg",
              frequency: "daily",
              time: "20:00",
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              notes: "Take in the evening",
            },
          ]

    setReminders(mockReminders)
    setIsLoading(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReminder({ ...newReminder, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewReminder({ ...newReminder, [name]: value })
  }

  const handleDayToggle = (day: string) => {
    const updatedDays = newReminder.days.includes(day)
      ? newReminder.days.filter((d) => d !== day)
      : [...newReminder.days, day]

    setNewReminder({ ...newReminder, days: updatedDays })
  }

  const addReminder = async () => {
    if (!newReminder.medicine || !newReminder.dosage || !newReminder.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (newReminder.days.length === 0) {
      toast({
        title: "No days selected",
        description: "Please select at least one day for the reminder.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReminderWithId: Reminder = {
        ...newReminder,
        id: `reminder-${Date.now()}`,
      }

      const updatedReminders = [...reminders, newReminderWithId]
      setReminders(updatedReminders)

      // In a real app, we would save to a database
      // For now, we'll just save to localStorage
      localStorage.setItem("medilog-reminders", JSON.stringify(updatedReminders))

      // Reset form
      setNewReminder({
        medicine: "",
        dosage: "",
        frequency: "daily",
        time: "08:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        notes: "",
      })

      setIsDialogOpen(false)

      toast({
        title: "Reminder added",
        description: "Your medication reminder has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding reminder:", error)
      toast({
        title: "Error",
        description: "Failed to add reminder. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteReminder = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedReminders = reminders.filter((reminder) => reminder.id !== id)
      setReminders(updatedReminders)

      // In a real app, we would update the database
      // For now, we'll just update localStorage
      localStorage.setItem("medilog-reminders", JSON.stringify(updatedReminders))

      toast({
        title: "Reminder deleted",
        description: "Your medication reminder has been deleted.",
      })
    } catch (error) {
      console.error("Error deleting reminder:", error)
      toast({
        title: "Error",
        description: "Failed to delete reminder. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const getDayAbbreviation = (day: string) => day.substring(0, 3)

  const getTodayReminders = () => {
    const today = new Date()
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" })
    return reminders.filter((reminder) => reminder.days.includes(dayOfWeek))
  }

  const getUpcomingReminders = () => {
    const today = new Date()
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" })
    const todayReminders = reminders.filter((reminder) => reminder.days.includes(dayOfWeek))

    // Sort by time
    return todayReminders.sort((a, b) => {
      const timeA = a.time
      const timeB = b.time
      return timeA.localeCompare(timeB)
    })
  }

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medicine Reminders</h1>
            <p className="text-muted-foreground">Set up and manage your medication reminders.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Medication Reminder</DialogTitle>
                <DialogDescription>
                  Create a new reminder for your medication. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medicine" className="text-right">
                    Medicine
                  </Label>
                  <Input
                    id="medicine"
                    name="medicine"
                    value={newReminder.medicine}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Enter medication name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dosage" className="text-right">
                    Dosage
                  </Label>
                  <Input
                    id="dosage"
                    name="dosage"
                    value={newReminder.dosage}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="E.g., 10mg, 1 tablet"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">
                    Frequency
                  </Label>
                  <Select
                    value={newReminder.frequency}
                    onValueChange={(value) => handleSelectChange("frequency", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={newReminder.time}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Days</Label>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={newReminder.days.includes(day) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleDayToggle(day)}
                      >
                        {getDayAbbreviation(day)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={newReminder.notes}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Optional notes"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addReminder} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Reminder"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : getUpcomingReminders().length > 0 ? (
              <div className="space-y-4">
                {getUpcomingReminders().map((reminder) => (
                  <Card key={reminder.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{reminder.medicine}</CardTitle>
                          <CardDescription>{reminder.dosage}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(reminder.time)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {reminder.days.map((day) => (
                          <span
                            key={day}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {getDayAbbreviation(day)}
                          </span>
                        ))}
                      </div>
                      {reminder.notes && <p className="mt-2 text-sm text-muted-foreground">{reminder.notes}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No reminders for today</h3>
                <p className="mt-2 text-sm text-muted-foreground">Add a new medication reminder to get started.</p>
                <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : reminders.length > 0 ? (
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <Card key={reminder.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{reminder.medicine}</CardTitle>
                          <CardDescription>{reminder.dosage}</CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the reminder for {reminder.medicine}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteReminder(reminder.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(reminder.time)}</span>
                        <span className="text-xs">({reminder.frequency})</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {reminder.days.map((day) => (
                          <span
                            key={day}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {getDayAbbreviation(day)}
                          </span>
                        ))}
                      </div>
                      {reminder.notes && <p className="mt-2 text-sm text-muted-foreground">{reminder.notes}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No reminders found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Add a new medication reminder to get started.</p>
                <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reminder
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

