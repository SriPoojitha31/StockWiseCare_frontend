import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharityDistribution } from "@/components/features/charity/charity-distribution"
import { CharityList } from "@/components/features/charity/charity-list"
import { CharityImpact } from "@/components/features/charity/charity-impact"

export default function CharityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Charity Impact</h2>
          <p className="text-muted-foreground">Share your investment profits with charitable causes</p>
        </div>
      </div>

      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">Profit Distribution</TabsTrigger>
          <TabsTrigger value="charities">Charity Organizations</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Distribution Settings</CardTitle>
              <CardDescription>Configure how your investment profits are shared with charities</CardDescription>
            </CardHeader>
            <CardContent>
              <CharityDistribution />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charity Organizations</CardTitle>
              <CardDescription>Browse and select charitable organizations to support</CardDescription>
            </CardHeader>
            <CardContent>
              <CharityList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Charitable Impact</CardTitle>
              <CardDescription>Track the difference your donations are making</CardDescription>
            </CardHeader>
            <CardContent>
              <CharityImpact />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
