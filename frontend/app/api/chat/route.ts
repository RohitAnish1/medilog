import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  // This is a simulated response. In a production environment,
  // you would connect to an actual AI service like OpenAI.
  const result = streamText({
    model: {
      provider: "openai",
      model: "gpt-4",
      async doRequest() {
        // Simulate a delay to mimic API response time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const lastMessage = messages[messages.length - 1].content.toLowerCase()

        let response = "I'm your MediLog assistant. How can I help you today?"

        if (lastMessage.includes("medication") || lastMessage.includes("medicine")) {
          response =
            "MediLog can help you track your medications and set reminders. Would you like me to show you how to set up medication reminders?"
        } else if (lastMessage.includes("record") || lastMessage.includes("voice")) {
          response =
            "You can record medical interactions using our voice-to-text feature. Just navigate to the 'Record Interaction' page from your dashboard and click the microphone button to start recording."
        } else if (lastMessage.includes("flashcard")) {
          response =
            "MediLog's flashcard feature helps you remember important medical information. You can create flashcards manually or let our AI generate them from your medical records."
        } else if (lastMessage.includes("search")) {
          response =
            "You can search through your medical records using the Search feature. It allows you to filter by date, record type, and keywords to find exactly what you're looking for."
        } else if (lastMessage.includes("hello") || lastMessage.includes("hi")) {
          response =
            "Hello! Welcome to MediLog. I'm here to help you navigate the app and answer any questions you might have."
        } else if (lastMessage.includes("thank")) {
          response = "You're welcome! If you have any other questions, feel free to ask anytime."
        } else if (lastMessage.includes("help")) {
          response =
            "I can help you with various aspects of MediLog, such as recording medical interactions, setting medication reminders, creating flashcards, or searching through your records. What would you like assistance with?"
        }

        return {
          text: response,
          usage: { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 },
          finishReason: "stop",
        }
      },
    },
    messages,
  })

  return result.toDataStreamResponse()
}

