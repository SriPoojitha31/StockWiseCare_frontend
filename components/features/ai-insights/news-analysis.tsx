"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"

// Sample news data
const newsData = [
  {
    id: "1",
    title: "Fed Signals Potential Rate Cut in Coming Months",
    source: "Financial Times",
    date: "2 hours ago",
    summary:
      "The Federal Reserve has indicated it may begin cutting interest rates in the coming months as inflation shows signs of cooling.",
    impact: "positive",
    affectedSectors: ["Finance", "Real Estate", "Technology"],
    affectedStocks: [
      { symbol: "JPM", impact: "positive" },
      { symbol: "GS", impact: "positive" },
      { symbol: "MS", impact: "positive" },
    ],
    sentiment: 78,
    url: "#",
  },
  {
    id: "2",
    title: "Apple Announces New AI Features for iPhone",
    source: "TechCrunch",
    date: "5 hours ago",
    summary:
      "Apple unveiled a suite of new AI features for the upcoming iPhone, positioning itself to compete with Google and Microsoft in the AI space.",
    impact: "positive",
    affectedSectors: ["Technology", "Communication Services"],
    affectedStocks: [
      { symbol: "AAPL", impact: "positive" },
      { symbol: "GOOGL", impact: "negative" },
      { symbol: "MSFT", impact: "neutral" },
    ],
    sentiment: 85,
    url: "#",
  },
  {
    id: "3",
    title: "Oil Prices Surge Amid Middle East Tensions",
    source: "Reuters",
    date: "1 day ago",
    summary:
      "Crude oil prices jumped 5% following reports of escalating tensions in the Middle East, raising concerns about supply disruptions.",
    impact: "mixed",
    affectedSectors: ["Energy", "Transportation", "Airlines"],
    affectedStocks: [
      { symbol: "XOM", impact: "positive" },
      { symbol: "CVX", impact: "positive" },
      { symbol: "DAL", impact: "negative" },
      { symbol: "UAL", impact: "negative" },
    ],
    sentiment: 45,
    url: "#",
  },
  {
    id: "4",
    title: "Healthcare Bill Faces Uncertainty in Congress",
    source: "Washington Post",
    date: "2 days ago",
    summary:
      "A major healthcare reform bill faces an uncertain future in Congress, potentially impacting pharmaceutical and insurance companies.",
    impact: "negative",
    affectedSectors: ["Healthcare", "Pharmaceuticals", "Insurance"],
    affectedStocks: [
      { symbol: "JNJ", impact: "negative" },
      { symbol: "PFE", impact: "negative" },
      { symbol: "UNH", impact: "negative" },
    ],
    sentiment: 32,
    url: "#",
  },
]

export function NewsAnalysis() {
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredNews = selectedTab === "all" ? newsData : newsData.filter((news) => news.impact === selectedTab)

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive":
        return <Badge className="bg-green-500">Positive</Badge>
      case "negative":
        return <Badge className="bg-red-500">Negative</Badge>
      case "mixed":
        return <Badge className="bg-yellow-500">Mixed</Badge>
      case "neutral":
        return <Badge className="bg-blue-500">Neutral</Badge>
      default:
        return null
    }
  }

  const getStockImpact = (impact: string) => {
    switch (impact) {
      case "positive":
        return <ArrowUpRight className="h-3 w-3 text-green-500" />
      case "negative":
        return <ArrowDownRight className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="positive">Positive Impact</TabsTrigger>
          <TabsTrigger value="negative">Negative Impact</TabsTrigger>
          <TabsTrigger value="mixed">Mixed Impact</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredNews.map((news) => (
          <Card key={news.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{news.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <span>{news.date}</span>
                    </div>
                  </div>
                  {getImpactBadge(news.impact)}
                </div>

                <p className="text-sm">{news.summary}</p>

                <div>
                  <h4 className="text-sm font-medium mb-1">Affected Sectors</h4>
                  <div className="flex flex-wrap gap-1">
                    {news.affectedSectors.map((sector) => (
                      <Badge key={sector} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Affected Stocks</h4>
                  <div className="flex flex-wrap gap-2">
                    {news.affectedStocks.map((stock) => (
                      <div key={stock.symbol} className="flex items-center">
                        <span className="text-sm font-medium">{stock.symbol}</span>
                        {getStockImpact(stock.impact)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">AI Sentiment:</span>
                    <div className="w-24 bg-muted rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          news.sentiment > 70 ? "bg-green-500" : news.sentiment > 50 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${news.sentiment}%` }}
                      ></div>
                    </div>
                    <span className="text-sm ml-2">{news.sentiment}%</span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center" asChild>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                      Read More <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
