"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample leaderboard data
const leaderboardData = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    portfolioValue: 156432.75,
    percentageGain: 56.43,
    rank: 1,
    badge: "gold",
    trades: 87,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    portfolioValue: 142875.32,
    percentageGain: 42.88,
    rank: 2,
    badge: "silver",
    trades: 124,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
    portfolioValue: 138921.45,
    percentageGain: 38.92,
    rank: 3,
    badge: "bronze",
    trades: 65,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    portfolioValue: 132456.78,
    percentageGain: 32.46,
    rank: 4,
    trades: 92,
  },
  {
    id: "5",
    name: "Jessica Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JP",
    portfolioValue: 128765.43,
    percentageGain: 28.77,
    rank: 5,
    trades: 78,
  },
  {
    id: "6",
    name: "Robert Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RW",
    portfolioValue: 125432.1,
    percentageGain: 25.43,
    rank: 6,
    trades: 103,
  },
  {
    id: "7",
    name: "Lisa Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LT",
    portfolioValue: 122345.67,
    percentageGain: 22.35,
    rank: 7,
    trades: 56,
  },
  {
    id: "8",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    portfolioValue: 118765.32,
    percentageGain: 18.77,
    rank: 8,
    trades: 71,
    isCurrentUser: true,
  },
  {
    id: "9",
    name: "Amanda Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AG",
    portfolioValue: 115432.1,
    percentageGain: 15.43,
    rank: 9,
    trades: 84,
  },
  {
    id: "10",
    name: "Kevin Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "KB",
    portfolioValue: 112345.67,
    percentageGain: 12.35,
    rank: 10,
    trades: 62,
  },
]

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [searchQuery, setSearchQuery] = useState("")

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "gold":
        return "bg-yellow-500"
      case "silver":
        return "bg-gray-400"
      case "bronze":
        return "bg-amber-700"
      default:
        return "bg-primary"
    }
  }

  const filteredLeaderboard = leaderboardData.filter((trader) =>
    trader.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-medium">Top Traders</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search traders..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead className="text-right">Portfolio Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
              <TableHead className="text-right">Trades</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaderboard.map((trader) => (
              <TableRow key={trader.id} className={trader.isCurrentUser ? "bg-muted/50" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {trader.badge && <Badge className={`mr-2 ${getBadgeColor(trader.badge)}`}>{trader.rank}</Badge>}
                    {!trader.badge && trader.rank}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                      <AvatarFallback>{trader.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{trader.name}</div>
                      {trader.isCurrentUser && <div className="text-xs text-muted-foreground">You</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  $
                  {trader.portfolioValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <span className="flex items-center justify-end text-green-500">
                    +{trader.percentageGain.toFixed(2)}% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                </TableCell>
                <TableCell className="text-right">{trader.trades}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
