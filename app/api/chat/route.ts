// ============================================================================
// AI CHAT API ROUTE - Backend Endpoint for AI Assistant
// ============================================================================
// This API route handles chat requests from the AI chatbot component
// It processes user messages and returns contextual responses about MediLog features
// Uses the Vercel AI SDK for streaming responses to provide real-time chat experience

import { streamText } from "ai"  // Vercel AI SDK for streaming text responses

// ============================================================================
// POST REQUEST HANDLER - Process Chat Messages
// ============================================================================
// Handles incoming chat messages from the frontend AI chatbot
// Returns streaming responses with helpful information about MediLog features
export async function POST(req: Request) {
  // Extract messages array from the request body
  const { messages } = await req.json()

  // This is a simulated response. In a production environment,
  // you would connect to an actual AI service like OpenAI.
  const result = streamText({
    model: {
      provider: "openai",  // Placeholder for actual AI provider
      model: "gpt-4",      // Model specification
      
      // ============================================================================
      // MOCK AI REQUEST HANDLER - Simulates AI Response Logic
      // ============================================================================
      // In production, this would connect to a real AI service
      // Currently provides predefined responses based on user message content
      async doRequest() {
        // Simulate a delay to mimic API response time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get the last user message and convert to lowercase for keyword matching
        const lastMessage = messages[messages.length - 1].content.toLowerCase()

        // Default response for general inquiries
        let response = "I'm your MediLog assistant. How can I help you today?"

        // ============================================================================
        // RESPONSE LOGIC - Context-Aware Replies Based on User Input
        // ============================================================================
        // Pattern matching to provide relevant help based on user keywords
        
        // Medication-related queries
        if (lastMessage.includes("medication") || lastMessage.includes("medicine")) {
          response =
            "MediLog can help you track your medications and set reminders. Would you like me to show you how to set up medication reminders?"
        } 
        // Voice recording queries
        else if (lastMessage.includes("record") || lastMessage.includes("voice")) {
          response =
            "You can record medical interactions using our voice-to-text feature. Just navigate to the 'Record Interaction' page from your dashboard and click the microphone button to start recording."
        } 
        // Flashcard feature queries
        else if (lastMessage.includes("flashcard")) {
          response =
            "MediLog's flashcard feature helps you remember important medical information. You can create flashcards manually or let our AI generate them from your medical records."
        } 
        // Search functionality queries
        else if (lastMessage.includes("search")) {
          response =
            "You can search through your medical records using the Search feature. It allows you to filter by date, record type, and keywords to find exactly what you're looking for."
        } 
        // Greeting responses
        else if (lastMessage.includes("hello") || lastMessage.includes("hi")) {
          response =
            "Hello! Welcome to MediLog. I'm here to help you navigate the app and answer any questions you might have."
        } 
        // Gratitude responses
        else if (lastMessage.includes("thank")) {
          response = "You're welcome! If you have any other questions, feel free to ask anytime."
        } 
        // General help requests
        else if (lastMessage.includes("help")) {
          response =
            "I can help you with various aspects of MediLog, such as recording medical interactions, setting medication reminders, creating flashcards, or searching through your records. What would you like assistance with?"
        }

        // Return structured response object for the AI SDK
        return {
          text: response,
          usage: { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 },
          finishReason: "stop",
        }
      },
    },
    messages,  // Pass the conversation history to maintain context
  })

  // Return streaming response to the frontend for real-time chat experience
  return result.toDataStreamResponse()
}

