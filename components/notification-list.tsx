"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRight, TrendingUp, Heart, Bell, AlertTriangle } from "lucide-react"

// Sample notification data
const notifications = [
  {
    id: "1",
    title: "AAPL stock is up 3.2%",
    description: "Apple Inc. has increased by 3.2% today",
    time: "10 minutes ago",
    type: "stock",
    read: false,
  },
  {
    id: "2",
    title: "Portfolio milestone reached",
    description: "Your portfolio has reached $50,000 in value",
    time: "2 hours ago",
    type: "milestone",
    read: false,
  },
  {
    id: "3",
    title: "Charity donation successful",
    description: "Your donation of $25 to Global Education Fund was successful",
    time: "Yesterday",
    type: "charity",
    read: true,
  },
  {
    id: "4",
    title: "New AI insight available",
    description: "Check out the latest AI prediction for your portfolio",
    time: "2 days ago",
    type: "ai",
    read: true,
  },
  {
    id: "5",
    title: "Market alert: Tech sector volatility",
    description: "Increased volatility detected in the technology sector",
    time: "3 days ago",
    type: "alert",
    read: true,
  },
]

export function NotificationList() {
  const [activeNotifications, setActiveNotifications] = useState(notifications)

  const getIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "charity":
        return <Heart className="h-4 w-4 text-red-500" />
      case "milestone":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const markAllAsRead = () => {
    setActiveNotifications(
      activeNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Recent Notifications</h3>
        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-1">
              {activeNotifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 mt-4">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="space-y-4">
              {activeNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.read ? "" : "bg-muted/50"}`}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="unread" className="flex-1 mt-4">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="space-y-4">
              {activeNotifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div key={notification.id} className="p-3 rounded-lg border bg-muted/50">
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="alerts" className="flex-1 mt-4">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="space-y-4">
              {activeNotifications
                .filter((n) => n.type === "alert")
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.read ? "" : "bg-muted/50"}`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
