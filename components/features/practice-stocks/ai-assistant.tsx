"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample AI recommendations
const aiRecommendations = [
  {
    symbol: "AAPL",
    action: "buy",
    confidence: 85,
    reason: "Strong technical indicators and positive earnings outlook",
    price: 172.45,
    targetPrice: 195.0,
  },
  {
    symbol: "MSFT",
    action: "hold",
    confidence: 72,
    reason: "Fair valuation with moderate growth potential",
    price: 287.18,
    targetPrice: 305.0,
  },
  {
    symbol: "GOOGL",
    action: "buy",
    confidence: 78,
    reason: "Undervalued relative to peers with strong AI initiatives",
    price: 2312.45,
    targetPrice: 2500.0,
  },
  {
    symbol: "TSLA",
    action: "sell",
    confidence: 65,
    reason: "Increasing competition and production challenges",
    price: 712.45,
    targetPrice: 650.0,
  },
]

export function AIAssistant() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(aiRecommendations)

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Recommendations updated",
        description: "AI analysis has been refreshed with latest market data",
      })
    }, 2000)
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "buy":
        return <Badge className="bg-green-500">Buy</Badge>
      case "sell":
        return <Badge className="bg-red-500">Sell</Badge>
      case "hold":
        return <Badge className="bg-blue-500">Hold</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-sm font-medium">AI Trading Recommendations</h3>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Refresh"}
        </Button>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Card key={rec.symbol} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{rec.symbol}</span>
                    <span className="ml-2">${rec.price.toFixed(2)}</span>
                  </div>
                </div>
                {getActionBadge(rec.action)}
              </div>

              <div className="mt-2">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="ml-1 font-medium">${rec.targetPrice.toFixed(2)}</span>
                  <span
                    className={`ml-2 flex items-center text-xs ${
                      rec.targetPrice > rec.price ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {rec.targetPrice > rec.price ? (
                      <>
                        +{(((rec.targetPrice - rec.price) / rec.price) * 100).toFixed(2)}%
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        {(((rec.targetPrice - rec.price) / rec.price) * 100).toFixed(2)}%
                        <ArrowDownRight className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
              </div>

              <div className="mt-2">
                <div className="flex items-center">
                  <span className="text-xs mr-2">Confidence:</span>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        rec.confidence > 70 ? "bg-green-500" : rec.confidence > 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${rec.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs ml-2">{rec.confidence}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        <p>
          <strong>Note:</strong> These are AI-generated recommendations for educational purposes only. Practice trading
          decisions should be based on your own research and analysis.
        </p>
      </div>
    </div>
  )
}
