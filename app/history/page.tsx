import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceHistory } from "@/components/features/history/performance-history"
import { Achievements } from "@/components/features/history/achievements"

export default function HistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">History</h2>
          <p className="text-muted-foreground">Track your investment journey and achievements</p>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Track your investment performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceHistory />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your investment milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <Achievements />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
