
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Brain, Loader2, Mic, MicOff } from "lucide-react";

// Import summarizeText function from your module
import { summarizeText } from "../../summery.js"; // Adjust the path if needed

export default function RecordPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    console.log("Initializing Speech Recognition...");

    // Check if the browser supports SpeechRecognition
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = transcript;
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          }
        }
        console.log("Updated transcript:", finalTranscript);
        setTranscript(finalTranscript);
      };

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
        toast({
          title: "Summary generated",
          description: "The summary has been successfully generated and displayed.",
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

