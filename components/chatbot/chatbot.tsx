"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, X, Send, MessageSquare } from "lucide-react"
import { useChatbot } from "@/components/chatbot/chatbot-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Sample responses for the chatbot
const botResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! I'm StockWise Assistant. How can I help you with your investments today?",
  },
  {
    keywords: ["invest", "investment", "stock", "stocks"],
    response:
      "StockWiseCare offers a range of investment options. You can explore them in the Investments section. Would you like me to guide you there?",
  },
  {
    keywords: ["charity", "donate", "donation"],
    response:
      "Our charity feature allows you to donate a portion of your investment profits to causes you care about. You can configure this in the Charity section.",
  },
  {
    keywords: ["ai", "insight", "prediction"],
    response:
      "Our AI Insights feature provides sentiment analysis, stock predictions, portfolio optimization, and news analysis to help you make informed investment decisions.",
  },
  {
    keywords: ["practice", "simulator", "simulation"],
    response:
      "You can practice trading with our simulator without risking real money. It's a great way to test strategies and learn about investing.",
  },
  {
    keywords: ["tax", "taxes", "calculator"],
    response:
      "Our tax calculator helps you estimate the tax implications of your investment activities. You can find it in the Tax Calculator section.",
  },
  {
    keywords: ["account", "profile", "settings"],
    response:
      "You can manage your account settings, update your profile, and configure notifications in the Settings section.",
  },
  {
    keywords: ["password", "forgot", "reset"],
    response:
      "If you've forgotten your password, you can reset it from the login page by clicking on 'Forgot password?'.",
  },
  {
    keywords: ["help", "support", "contact"],
    response:
      "If you need further assistance, you can contact our support team at support@stockwisecare.com or call us at 1-800-STOCKWISE.",
  },
]

// Default responses when no keywords match
const defaultResponses = [
  "I'm not sure I understand. Could you please rephrase your question?",
  "I'd like to help you with that. Could you provide more details?",
  "I'm still learning! Could you try asking in a different way?",
  "For this specific query, you might want to check our FAQ section or contact our support team.",
]

export function Chatbot() {
  const { isOpen, closeChat, toggleChat } = useChatbot()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm StockWise Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Check for keyword matches
    for (const item of botResponses) {
      if (item.keywords.some((keyword) => input.includes(keyword))) {
        return item.response
      }
    }

    // Return a random default response if no keywords match
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  if (!isOpen) {
    return (
      <Button onClick={toggleChat} className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" size="icon">
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] shadow-lg flex flex-col z-50">
      <div className="flex items-center justify-between bg-primary text-primary-foreground p-3 rounded-t-lg">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-medium">StockWise Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={closeChat} className="h-8 w-8 text-primary-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg p-3 bg-muted text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
