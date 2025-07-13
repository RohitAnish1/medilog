// ============================================================================
// VOICE RECORDING PAGE - Medical Interaction Recording Interface
// ============================================================================
// This component provides voice-to-text recording functionality for medical interactions
// Features include real-time speech recognition, AI summarization, and flashcard creation
// Uses Web Speech API for voice recognition and AI for content processing

"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth-provider";           // Authentication context
import { DashboardLayout } from "@/components/dashboard-layout"; // Dashboard wrapper
import { Button } from "@/components/ui/button";                 // UI button component
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Card components
import { Textarea } from "@/components/ui/textarea";             // Text area for transcript editing
import { Label } from "@/components/ui/label";                   // Form labels
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Tab navigation
import { useToast } from "@/components/ui/use-toast";            // Toast notifications
import { Brain, Loader2, Mic, MicOff } from "lucide-react";     // Icon components
import { saveFlashcard } from "@/lib/firebase";                 // Firebase flashcard storage function

// Import summarizeText function from your module
import { summarizeText } from "../../summery.js";               // AI summarization utility

// ============================================================================
// VOICE RECORDING MAIN COMPONENT
// ============================================================================
export default function RecordPage() {
  const { user } = useAuth();                                   // Current authenticated user
  const { toast } = useToast();                                 // Toast notification system
  
  // ============================================================================
  // STATE MANAGEMENT - Recording and Content State
  // ============================================================================
  const [isRecording, setIsRecording] = useState(false);        // Recording active state
  const [transcript, setTranscript] = useState("");             // Voice-to-text transcript
  const [summary, setSummary] = useState("");                   // AI-generated summary
  const [isSummarizing, setIsSummarizing] = useState(false);    // Summary generation loading state

  // Reference to speech recognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ============================================================================
  // SPEECH RECOGNITION INITIALIZATION - Setup Voice-to-Text
  // ============================================================================
  // Initializes Web Speech API for real-time voice recognition
  useEffect(() => {
    console.log("Initializing Speech Recognition...");

    // Check if the browser supports SpeechRecognition (Chrome/Edge preferred)
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure speech recognition settings
      recognitionRef.current.continuous = true;          // Keep listening continuously
      recognitionRef.current.interimResults = true;      // Show results as user speaks

      // ============================================================================
      // SPEECH RESULT HANDLER - Process Voice Recognition Results
      // ============================================================================
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = transcript;
        
        // Process all speech recognition results
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";  // Add finalized text
          }
        }
        console.log("Updated transcript:", finalTranscript);
        setTranscript(finalTranscript);                  // Update transcript state
      };

      // ============================================================================
      // ERROR HANDLING - Speech Recognition Error Management
      // ============================================================================
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive",
        });
      };
    } else {
      console.warn("Speech Recognition is not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        console.log("Stopping Speech Recognition...");
        recognitionRef.current.stop();
      }
    };
  }, [toast, transcript]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      console.log("Stopping voice recording...");
      recognitionRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Voice recording has been stopped.",
      });
    } else {
      console.log("Starting voice recording...");
      setTranscript("");
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Voice recording has started. Speak clearly.",
      });
    }
  };

  const generateSummary = async () => {
    if (!transcript.trim()) {
      toast({
        title: "No transcript",
        description: "Please record or enter text before generating a summary.",
        variant: "destructive",
      });
      return;
    }

    console.log("Sending transcript to summarizeText function:", transcript);
    setIsSummarizing(true);

    try {
      const formattedSummary = await summarizeText(transcript);
      console.log("Received summary response from summarizeText function:", formattedSummary);

      if (formattedSummary) {
        setSummary(formattedSummary.content); // Update the summary state

        // Save the summary to Firebase
        await saveFlashcard("Generated Summary", formattedSummary.content, "Summaries");
        toast({
          title: "Summary saved",
          description: "The summary has been saved as a flashcard.",
        });
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Record Medical Interaction</h1>
          <p className="text-muted-foreground">
            Record, summarize, and save your medical interactions using voice-to-text or manual input.
          </p>
        </div>

        <Tabs defaultValue="voice" className="space-y-4">
          <TabsList>
            <TabsTrigger value="voice">Voice Recording</TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-4">
            {/* Voice-to-text recording and transcript */}
            <Card>
              <CardHeader>
                <CardTitle>Voice-to-Text Recording</CardTitle>
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
                    placeholder="Your recorded or entered text will appear here..."
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

            {/* Summary Display */}
            {summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Summary</CardTitle>
                  <CardDescription>Here’s the concise summary of your transcript:</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{summary}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

