"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, TrendingUp, Zap, Award, Star } from "lucide-react"

// Sample achievements data
const achievements = [
  {
    id: "1",
    title: "First Investment",
    description: "Made your first investment on the platform",
    icon: Trophy,
    completed: true,
    date: "Jan 15, 2023",
    reward: "Badge Unlocked",
  },
  {
    id: "2",
    title: "Diversification Master",
    description: "Invested in at least 5 different sectors",
    icon: Target,
    completed: true,
    date: "Mar 22, 2023",
    reward: "+50 Experience Points",
  },
  {
    id: "3",
    title: "Profit Milestone",
    description: "Achieved 10% return on your portfolio",
    icon: TrendingUp,
    completed: true,
    date: "Aug 10, 2023",
    reward: "Unlocked Advanced Analytics",
  },
  {
    id: "4",
    title: "Charitable Investor",
    description: "Donated to at least 3 different charities",
    icon: Award,
    completed: true,
    date: "Sep 5, 2023",
    reward: "Charity Impact Badge",
  },
  {
    id: "5",
    title: "Trading Expert",
    description: "Completed 50 successful trades",
    icon: Zap,
    completed: false,
    progress: 72,
    reward: "Reduced Trading Fees",
  },
  {
    id: "6",
    title: "Portfolio Milestone",
    description: "Grow your portfolio to $150,000",
    icon: Star,
    completed: false,
    progress: 77,
    reward: "Premium Dashboard Access",
  },
]

// Sample badges data
const badges = [
  {
    id: "1",
    name: "First Steps",
    icon: Trophy,
    description: "Made your first investment",
    date: "Jan 15, 2023",
    rarity: "common",
  },
  {
    id: "2",
    name: "Diversification Pro",
    icon: Target,
    description: "Invested across multiple sectors",
    date: "Mar 22, 2023",
    rarity: "uncommon",
  },
  {
    id: "3",
    name: "Profit Hunter",
    icon: TrendingUp,
    description: "Achieved significant portfolio returns",
    date: "Aug 10, 2023",
    rarity: "rare",
  },
  {
    id: "4",
    name: "Charitable Heart",
    icon: Award,
    description: "Contributed to multiple charities",
    date: "Sep 5, 2023",
    rarity: "rare",
  },
]

export function Achievements() {
  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Trophy className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Your Achievements</h3>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <achievement.icon
                        className={`h-6 w-6 ${achievement.completed ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.title}</h4>
                        {achievement.completed ? (
                          <Badge className="bg-green-500">Completed</Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>

                      {achievement.completed ? (
                        <p className="text-xs text-muted-foreground mt-2">Completed on {achievement.date}</p>
                      ) : (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-1.5" />
                        </div>
                      )}

                      <div className="mt-2 text-xs">
                        <span className="font-medium">Reward:</span> {achievement.reward}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Your Badges</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${getBadgeColor(badge.rarity)} mb-3`}>
                    <badge.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">Earned on {badge.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium">Investment Milestones</h3>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />

            <div className="space-y-8 relative pl-10">
              <div className="relative">
                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                  <Trophy className="h-3 w-3" />
                </div>
                <h4 className="font-medium">Started Investment Journey</h4>
                <p className="text-sm text-muted-foreground mt-1">Made your first investment of $10,000</p>
                <p className="text-xs text-muted-foreground mt-2">January 15, 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                  <Target className="h-3 w-3" />
                </div>
                <h4 className="font-medium">Portfolio Diversification</h4>
                <p className="text-sm text-muted-foreground mt-1">Expanded portfolio to include 5 different sectors</p>
                <p className="text-xs text-muted-foreground mt-2">March 22, 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <h4 className="font-medium">First Profit Milestone</h4>
                <p className="text-sm text-muted-foreground mt-1">Achieved 10% return on initial investment</p>
                <p className="text-xs text-muted-foreground mt-2">August 10, 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                  <Award className="h-3 w-3" />
                </div>
                <h4 className="font-medium">Charitable Contribution</h4>
                <p className="text-sm text-muted-foreground mt-1">Started donating a portion of profits to charity</p>
                <p className="text-xs text-muted-foreground mt-2">September 5, 2023</p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                  <Star className="h-3 w-3" />
                </div>
                <h4 className="font-medium">Portfolio Value Milestone</h4>
                <p className="text-sm text-muted-foreground mt-1">Portfolio value reached $100,000</p>
                <p className="text-xs text-muted-foreground mt-2">December 1, 2023</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
