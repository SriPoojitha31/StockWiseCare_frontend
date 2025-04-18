"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Sample data for sentiment analysis
const sentimentData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sentiment: 85,
    status: "bullish",
    keywords: ["innovation", "services", "growth"],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sentiment: 78,
    status: "bullish",
    keywords: ["cloud", "AI", "enterprise"],
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sentiment: 65,
    status: "neutral",
    keywords: ["advertising", "regulation", "AI"],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    sentiment: 72,
    status: "bullish",
    keywords: ["e-commerce", "AWS", "logistics"],
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    sentiment: 45,
    status: "bearish",
    keywords: ["competition", "production", "valuation"],
  },
]

export function SentimentAnalysis() {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return "bg-green-500"
    if (sentiment >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "bullish":
        return <Badge className="bg-green-500">Bullish</Badge>
      case "neutral":
        return <Badge className="bg-yellow-500">Neutral</Badge>
      case "bearish":
        return <Badge className="bg-red-500">Bearish</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {sentimentData.map((item) => (
        <div key={item.symbol} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{item.symbol}</span>
              <span className="text-muted-foreground ml-2 text-sm">{item.name}</span>
            </div>
            {getStatusBadge(item.status)}
          </div>
          <div className="flex items-center gap-2">
            <Progress value={item.sentiment} className="h-2" indicatorClassName={getSentimentColor(item.sentiment)} />
            <span className="text-sm font-medium">{item.sentiment}%</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.keywords.map((keyword) => (
              <Badge key={keyword} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
