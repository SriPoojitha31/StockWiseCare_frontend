import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradingSimulator } from "@/components/features/simulator/trading-simulator"
import { Leaderboard } from "@/components/features/simulator/leaderboard"

export default function SimulatorPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trading Simulator</h2>
          <p className="text-muted-foreground">Compete with other users in simulated trading challenges</p>
        </div>
      </div>

      <Tabs defaultValue="simulator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="simulator">Trading Simulator</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Simulation</CardTitle>
              <CardDescription>Test your trading strategies in a simulated market environment</CardDescription>
            </CardHeader>
            <CardContent>
              <TradingSimulator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trader Leaderboard</CardTitle>
              <CardDescription>See how you rank against other traders</CardDescription>
            </CardHeader>
            <CardContent>
              <Leaderboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
