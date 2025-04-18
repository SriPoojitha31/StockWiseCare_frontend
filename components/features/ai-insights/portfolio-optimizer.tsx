"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowRight, RefreshCw } from "lucide-react"

// Sample portfolio data
const currentPortfolio = [
  { name: "Technology", value: 45, color: "#4f46e5" },
  { name: "Healthcare", value: 20, color: "#06b6d4" },
  { name: "Finance", value: 15, color: "#10b981" },
  { name: "Consumer", value: 10, color: "#f59e0b" },
  { name: "Energy", value: 10, color: "#ef4444" },
]

const optimizedPortfolio = [
  { name: "Technology", value: 35, color: "#4f46e5" },
  { name: "Healthcare", value: 25, color: "#06b6d4" },
  { name: "Finance", value: 20, color: "#10b981" },
  { name: "Consumer", value: 15, color: "#f59e0b" },
  { name: "Energy", value: 5, color: "#ef4444" },
]

const recommendations = [
  {
    action: "Reduce",
    symbol: "AAPL",
    name: "Apple Inc.",
    current: 15,
    target: 10,
    reason: "Overexposure to tech sector",
  },
  {
    action: "Increase",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    current: 5,
    target: 8,
    reason: "Healthcare sector expected to outperform",
  },
  {
    action: "Add",
    symbol: "V",
    name: "Visa Inc.",
    current: 0,
    target: 5,
    reason: "Diversification into financial services",
  },
  {
    action: "Reduce",
    symbol: "XOM",
    name: "Exxon Mobil",
    current: 8,
    target: 4,
    reason: "Reduce exposure to volatile energy sector",
  },
  {
    action: "Hold",
    symbol: "PG",
    name: "Procter & Gamble",
    current: 7,
    target: 7,
    reason: "Stable consumer staples position",
  },
]

export function PortfolioOptimizer() {
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [timeHorizon, setTimeHorizon] = useState(5)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isOptimized, setIsOptimized] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      setIsOptimized(true)
    }, 2000)
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "Increase":
      case "Add":
        return "bg-green-500"
      case "Reduce":
        return "bg-red-500"
      case "Hold":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="optimizer" className="space-y-4">
        <TabsList>
          <TabsTrigger value="optimizer">Portfolio Optimizer</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="optimizer" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Optimization Parameters</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                      <span className="text-sm text-muted-foreground">
                        {riskTolerance < 33 ? "Conservative" : riskTolerance < 66 ? "Moderate" : "Aggressive"}
                      </span>
                    </div>
                    <Slider
                      id="risk-tolerance"
                      min={0}
                      max={100}
                      step={1}
                      value={[riskTolerance]}
                      onValueChange={(value) => setRiskTolerance(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                      <span className="text-sm text-muted-foreground">{timeHorizon} years</span>
                    </div>
                    <Slider
                      id="time-horizon"
                      min={1}
                      max={20}
                      step={1}
                      value={[timeHorizon]}
                      onValueChange={(value) => setTimeHorizon(value[0])}
                    />
                  </div>

                  <Button className="w-full" onClick={handleOptimize} disabled={isOptimizing}>
                    {isOptimizing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      "Optimize Portfolio"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Expected Performance</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Expected Annual Return</span>
                      <span className="font-medium">{isOptimized ? "9.2%" : "7.5%"}</span>
                    </div>
                    <Progress value={isOptimized ? 92 : 75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Risk (Volatility)</span>
                      <span className="font-medium">{isOptimized ? "12.4%" : "15.8%"}</span>
                    </div>
                    <Progress value={isOptimized ? 62 : 79} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Sharpe Ratio</span>
                      <span className="font-medium">{isOptimized ? "0.74" : "0.47"}</span>
                    </div>
                    <Progress value={isOptimized ? 74 : 47} className="h-2" />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Optimization Benefits</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• {isOptimized ? "+1.7%" : "---"} higher expected returns</li>
                      <li>• {isOptimized ? "-3.4%" : "---"} lower volatility</li>
                      <li>• {isOptimized ? "+0.27" : "---"} better Sharpe ratio</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Current Allocation</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentPortfolio}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {currentPortfolio.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Allocation"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">
                  {isOptimized ? "Optimized Allocation" : "Target Allocation"}
                </h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={isOptimized ? optimizedPortfolio : currentPortfolio}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {(isOptimized ? optimizedPortfolio : currentPortfolio).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Allocation"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Recommended Actions</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Badge className={`${getActionColor(rec.action)}`}>{rec.action}</Badge>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{rec.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{rec.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{rec.current}%</span>
                      <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{rec.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
