"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Chatbot } from "@/components/chatbot/chatbot"

type ChatbotContextType = {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen((prev) => !prev)

  return (
    <ChatbotContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
      <Chatbot />
    </ChatbotContext.Provider>
  )
}
