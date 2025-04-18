"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react"

// Sample prediction data
const predictionData = {
  AAPL: {
    current: 172.45,
    prediction: [
      { day: "Today", price: 172.45 },
      { day: "Tomorrow", price: 174.32 },
      { day: "Day 3", price: 176.18 },
      { day: "Day 4", price: 175.89 },
      { day: "Day 5", price: 177.45 },
      { day: "Day 6", price: 179.21 },
      { day: "Day 7", price: 180.05 },
    ],
    confidence: 78,
    trend: "up",
    factors: ["Strong quarterly earnings", "New product announcements", "Positive analyst ratings"],
  },
  MSFT: {
    current: 287.18,
    prediction: [
      { day: "Today", price: 287.18 },
      { day: "Tomorrow", price: 289.45 },
      { day: "Day 3", price: 291.23 },
      { day: "Day 4", price: 290.78 },
      { day: "Day 5", price: 293.12 },
      { day: "Day 6", price: 295.67 },
      { day: "Day 7", price: 297.21 },
    ],
    confidence: 82,
    trend: "up",
    factors: ["Cloud revenue growth", "AI integration announcements", "Strong market position"],
  },
  GOOGL: {
    current: 2312.45,
    prediction: [
      { day: "Today", price: 2312.45 },
      { day: "Tomorrow", price: 2305.67 },
      { day: "Day 3", price: 2298.32 },
      { day: "Day 4", price: 2287.45 },
      { day: "Day 5", price: 2292.18 },
      { day: "Day 6", price: 2301.56 },
      { day: "Day 7", price: 2310.23 },
    ],
    confidence: 65,
    trend: "down",
    factors: ["Regulatory concerns", "Increased competition", "Ad revenue pressure"],
  },
  TSLA: {
    current: 712.45,
    prediction: [
      { day: "Today", price: 712.45 },
      { day: "Tomorrow", price: 705.32 },
      { day: "Day 3", price: 698.76 },
      { day: "Day 4", price: 692.45 },
      { day: "Day 5", price: 687.23 },
      { day: "Day 6", price: 695.67 },
      { day: "Day 7", price: 702.34 },
    ],
    confidence: 58,
    trend: "down",
    factors: ["Production challenges", "Increased competition", "Market volatility"],
  },
}

export function StockPrediction() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (predictionData[searchInput.toUpperCase()]) {
      setSelectedStock(searchInput.toUpperCase())
    }
  }

  const stockData = predictionData[selectedStock]
  const lastDay = stockData.prediction[stockData.prediction.length - 1]
  const priceDifference = lastDay.price - stockData.current
  const percentChange = (priceDifference / stockData.current) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="w-full md:w-64">
          <Label htmlFor="stock-search">Search Stock Symbol</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form onSubmit={handleSearch}>
              <Input
                id="stock-search"
                placeholder="e.g. AAPL, MSFT"
                className="pl-8"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(predictionData).map((symbol) => (
            <Button
              key={symbol}
              variant={selectedStock === symbol ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStock(symbol)}
            >
              {symbol}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stockData.prediction}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={stockData.trend === "up" ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium">{selectedStock} Prediction</h3>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">${lastDay.price.toFixed(2)}</span>
                <span
                  className={`ml-2 flex items-center text-sm ${percentChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {percentChange >= 0 ? (
                    <>
                      +{percentChange.toFixed(2)}% <ArrowUpRight className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    <>
                      {percentChange.toFixed(2)}% <ArrowDownRight className="ml-1 h-3 w-3" />
                    </>
                  )}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">7-day prediction</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Confidence Level</h4>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    stockData.confidence > 70
                      ? "bg-green-500"
                      : stockData.confidence > 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${stockData.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stockData.confidence}% confidence</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Factors</h4>
              <ul className="space-y-1">
                {stockData.factors.map((factor, index) => (
                  <li key={index} className="text-sm">
                    • {factor}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
