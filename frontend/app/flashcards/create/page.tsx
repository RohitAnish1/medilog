"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Loader2, Plus, Save } from "lucide-react"

export default function CreateFlashcardsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [flashcards, setFlashcards] = useState<{ title: string; content: string }[]>([])

  const generateFlashcards = async () => {
    if (!content) {
      toast({
        title: "No content",
        description: "Please enter some medical information first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would be an API call to an AI service
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI-generated flashcards
      const mockFlashcards = [
        {
          title: "Blood Pressure",
          content: "Normal range: 120/80 mmHg. Your current reading: 130/85 mmHg.",
        },
        {
          title: "Medication Schedule",
          content: "Take Lisinopril 10mg once daily in the morning with food.",
        },
        {
          title: "Follow-up Appointment",
          content: "Schedule a follow-up in 3 months for blood pressure monitoring.",
        },
      ]

      setFlashcards(mockFlashcards)
      toast({
        title: "Flashcards generated",
        description: "AI has generated flashcards based on your medical information.",
      })
    } catch (error) {
      console.error("Error generating flashcards:", error)
      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const addFlashcard = () => {
    if (!title || !content) {
      toast({
        title: "Missing information",
        description: "Please enter both a title and content for your flashcard.",
        variant: "destructive",
      })
      return
    }

    setFlashcards([...flashcards, { title, content }])
    setTitle("")
    setContent("")
    toast({
      title: "Flashcard added",
      description: "Your flashcard has been added to the list.",
    })
  }

  const saveFlashcards = async () => {
    if (flashcards.length === 0) {
      toast({
        title: "No flashcards",
        description: "Please create at least one flashcard before saving.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, we would save the flashcards to a database
      // For now, we'll just simulate saving to localStorage
      const savedFlashcards = JSON.parse(localStorage.getItem("medilog-flashcards") || "[]")
      localStorage.setItem("medilog-flashcards", JSON.stringify([...savedFlashcards, ...flashcards]))

      toast({
        title: "Flashcards saved",
        description: `${flashcards.length} flashcards have been saved successfully.`,
      })

      // Clear the form and flashcards after saving
      setFlashcards([])
      setTitle("")
      setContent("")
    } catch (error) {
      console.error("Error saving flashcards:", error)
      toast({
        title: "Error",
        description: "Failed to save flashcards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Flashcards</h1>
          <p className="text-muted-foreground">Create flashcards to help you remember important medical information.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Manually</CardTitle>
              <CardDescription>Create flashcards by entering information manually.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Flashcard Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Medication Name, Doctor's Advice"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Flashcard Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the information you want to remember"
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addFlashcard} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Flashcard
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate with AI</CardTitle>
              <CardDescription>Let AI generate flashcards from your medical information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medical-info">Medical Information</Label>
                <Textarea
                  id="medical-info"
                  placeholder="Enter your medical information, doctor's notes, or prescription details"
                  className="min-h-[220px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generateFlashcards} className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Flashcards
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {flashcards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Flashcards</CardTitle>
              <CardDescription>Review your flashcards before saving them.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {flashcards.map((flashcard, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{flashcard.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{flashcard.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveFlashcards} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save All Flashcards
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

