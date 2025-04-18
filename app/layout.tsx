import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { ChatbotProvider } from "@/components/chatbot/chatbot-provider"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StockWiseCare - Invest with Purpose",
  description: "Invest in stocks while supporting charitable causes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
            <Toaster />
            <ChatbotProvider />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
