import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SentimentAnalysis } from "@/components/features/ai-insights/sentiment-analysis"
import { StockPrediction } from "@/components/features/ai-insights/stock-prediction"
import { PortfolioOptimizer } from "@/components/features/ai-insights/portfolio-optimizer"
import { NewsAnalysis } from "@/components/features/ai-insights/news-analysis"

export default function AIInsightsPage() {
  return (
    <div className="w-screen h-screen overflow-auto bg-background text-foreground">
      <div className="w-full h-full flex flex-col p-4 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-sm text-muted-foreground">
            Powered by advanced machine learning algorithms
          </p>
        </div>

        <Tabs defaultValue="sentiment" className="flex-1 space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="prediction">Stock Prediction</TabsTrigger>
            <TabsTrigger value="optimizer">Portfolio Optimizer</TabsTrigger>
            <TabsTrigger value="news">News Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Market Sentiment Analysis</CardTitle>
                <CardDescription>
                  AI-powered analysis of market sentiment for your portfolio stocks
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <SentimentAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prediction" className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Stock Price Prediction</CardTitle>
                <CardDescription>
                  AI predictions for potential stock price movements in the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <StockPrediction />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizer" className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Portfolio Optimizer</CardTitle>
                <CardDescription>
                  AI recommendations to optimize your portfolio for better returns
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <PortfolioOptimizer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>News Analysis</CardTitle>
                <CardDescription>
                  AI analysis of recent news and its potential impact on your investments
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <NewsAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
