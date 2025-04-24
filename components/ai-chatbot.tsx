"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Minimize2, Maximize2, Send, Mic, Bot, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showChatbot, setShowChatbot] = useState(false)

  useEffect(() => {
    if (pathname === "/") {
      setShowChatbot(true)
    } else {
      setShowChatbot(false)
    }
  }, [pathname])

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! I'm your MediLog assistant. How can I help you today?",
      },
    ],
  })

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  // Mock function for voice input (future implementation)
  const handleVoiceInput = () => {
    alert("Voice input will be available in a future update!")
  }

  if (!showChatbot) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2"
          >
            <Card className="w-80 md:w-96 shadow-elevated border-deep-teal/20 overflow-hidden">
              <CardHeader className="p-3 border-b bg-deep-teal text-white flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <h3 className="font-medium text-sm">MediLog Assistant</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                    onClick={minimizeChat}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/20"
                    onClick={closeChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 h-80 overflow-y-auto bg-navy-blue/10">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%] text-sm shadow-sm",
                          message.role === "user"
                            ? "bg-soft-mint text-dark-charcoal"
                            : "bg-pale-blue text-dark-charcoal",
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-3 py-2 bg-pale-blue text-dark-charcoal max-w-[80%] text-sm shadow-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t bg-white">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Ask me anything about MediLog..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 border-deep-teal/20 focus-visible:ring-deep-teal"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-deep-teal hover:bg-deep-teal/10"
                    onClick={handleVoiceInput}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-deep-teal hover:bg-deep-teal/90"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-2"
          >
            <Card className="w-60 shadow-card border-deep-teal/20">
              <CardHeader className="p-2 border-b bg-deep-teal text-white flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  <h3 className="font-medium text-xs">MediLog Assistant</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={maximizeChat}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={closeChat}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={toggleChat}
          className="rounded-full h-12 w-12 shadow-button bg-deep-teal hover:bg-deep-teal/90 transition-all"
          aria-label="Chat with AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}

