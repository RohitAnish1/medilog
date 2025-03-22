"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Brain, Loader2, Mic, MicOff, Save } from "lucide-react"

// Declare SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function RecordPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [summary, setSummary] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [medications, setMedications] = useState("")
  const [notes, setNotes] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = transcript

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " "
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        setTranscript(finalTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive",
        })
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [toast, transcript])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      })
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
      toast({
        title: "Recording stopped",
        description: "Voice recording has been stopped.",
      })
    } else {
      setTranscript("")
      recognitionRef.current.start()
      setIsRecording(true)
      toast({
        title: "Recording started",
        description: "Voice recording has started. Speak clearly.",
      })
    }
  }

  const generateSummary = async () => {
    if (!transcript && !notes) {
      toast({
        title: "No content",
        description: "Please record or type some content first.",
        variant: "destructive",
      })
      return
    }

    setIsSummarizing(true)

    try {
      // In a real app, this would be an API call to an AI service
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const content = transcript || notes

      // Mock AI summary generation
      const mockSummary = `
Patient presented with ${symptoms || "symptoms that include fatigue and headaches"}.
Assessment indicates ${diagnosis || "possible hypertension"}.
Recommended treatment includes ${medications || "regular monitoring and lifestyle changes"}.
Follow-up appointment scheduled in 2 weeks.
      `.trim()

      setSummary(mockSummary)
      toast({
        title: "Summary generated",
        description: "AI has generated a summary of the medical interaction.",
      })
    } catch (error) {
      console.error("Error generating summary:", error)
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSummarizing(false)
    }
  }

  const saveRecord = async () => {
    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Record saved",
        description: "Medical interaction has been saved successfully.",
      })

      // Clear form after saving
      if (user?.role === "caregiver") {
        setPatientName("")
        setPatientAge("")
      }
      setSymptoms("")
      setDiagnosis("")
      setMedications("")
      setNotes("")
      setTranscript("")
      setSummary("")
    } catch (error) {
      console.error("Error saving record:", error)
      toast({
        title: "Error",
        description: "Failed to save record. Please try again.",
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
          <h1 className="text-3xl font-bold tracking-tight">Record Medical Interaction</h1>
          <p className="text-muted-foreground">
            Record and document medical interactions using voice-to-text or manual entry.
          </p>
        </div>

        <Tabs defaultValue="voice" className="space-y-4">
          <TabsList>
            <TabsTrigger value="voice">Voice Recording</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="summary" disabled={!transcript && !notes}>
              AI Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voice-to-Text Recording</CardTitle>
                <CardDescription>
                  Record your medical interaction using voice recognition. Speak clearly for best results.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className="h-16 w-16 rounded-full"
                  >
                    {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transcript">Transcript</Label>
                  <Textarea
                    id="transcript"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Your recorded text will appear here..."
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setTranscript("")}>
                  Clear
                </Button>
                <Button onClick={generateSummary} disabled={!transcript || isSummarizing}>
                  {isSummarizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manual Entry</CardTitle>
                <CardDescription>Manually enter details about the medical interaction.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.role === "caregiver" && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Patient Name</Label>
                      <Input
                        id="patient-name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-age">Patient Age</Label>
                      <Input
                        id="patient-age"
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        placeholder="Enter patient age"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe symptoms"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter diagnosis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medications">Medications</Label>
                  <Textarea
                    id="medications"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="List prescribed medications"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any additional notes"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSymptoms("")
                    setDiagnosis("")
                    setMedications("")
                    setNotes("")
                  }}
                >
                  Clear
                </Button>
                <Button onClick={generateSummary} disabled={!notes || isSummarizing}>
                  {isSummarizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Summary</CardTitle>
                <CardDescription>Review the AI-generated summary of the medical interaction.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary ? (
                  <div className="rounded-lg border bg-muted p-4">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{summary}</pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 py-6">
                    <Brain className="h-12 w-12 text-muted-foreground" />
                    <p className="text-center text-muted-foreground">
                      Click "Generate Summary" to create an AI-powered summary of the medical interaction.
                    </p>
                    <Button onClick={generateSummary} disabled={(!transcript && !notes) || isSummarizing}>
                      {isSummarizing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Generate Summary
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={saveRecord} disabled={!summary || isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Record
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

