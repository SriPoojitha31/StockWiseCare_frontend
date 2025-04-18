import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PracticeTrading } from "@/components/features/practice-stocks/practice-trading"
import { AIAssistant } from "@/components/features/practice-stocks/ai-assistant"
import { PerformanceMetrics } from "@/components/features/practice-stocks/performance-metrics"

export default function PracticeStocksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Practice Stocks</h2>
          <p className="text-muted-foreground">Practice buying and selling stocks with virtual money</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Trading Simulator</CardTitle>
            <CardDescription>Buy and sell stocks with $100,000 virtual money</CardDescription>
          </CardHeader>
          <CardContent>
            <PracticeTrading />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Get AI-powered trading recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <AIAssistant />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Track your practice trading performance</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceMetrics />
        </CardContent>
      </Card>
    </div>
  )
}
