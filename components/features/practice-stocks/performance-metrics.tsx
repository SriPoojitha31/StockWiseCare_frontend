"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid } from "recharts"

// Sample performance data
const performanceData = [
  { date: "Jan 1", value: 100000 },
  { date: "Jan 8", value: 102500 },
  { date: "Jan 15", value: 101200 },
  { date: "Jan 22", value: 103700 },
  { date: "Jan 29", value: 105200 },
  { date: "Feb 5", value: 104800 },
  { date: "Feb 12", value: 107300 },
  { date: "Feb 19", value: 109500 },
  { date: "Feb 26", value: 108200 },
  { date: "Mar 5", value: 110700 },
  { date: "Mar 12", value: 112300 },
]

const tradingActivityData = [
  { date: "Jan", buys: 12, sells: 5 },
  { date: "Feb", buys: 8, sells: 10 },
  { date: "Mar", buys: 15, sells: 7 },
]

const sectorAllocationData = [
  { name: "Technology", value: 45 },
  { name: "Healthcare", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Consumer", value: 10 },
  { name: "Energy", value: 10 },
]

export function PerformanceMetrics() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Performance Overview</TabsTrigger>
        <TabsTrigger value="activity">Trading Activity</TabsTrigger>
        <TabsTrigger value="allocation">Portfolio Allocation</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-3">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Portfolio Value Over Time</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-medium">Key Metrics</h3>

              <div>
                <div className="text-sm text-muted-foreground">Starting Value</div>
                <div className="text-xl font-medium">$100,000.00</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Current Value</div>
                <div className="text-xl font-medium">$112,300.00</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Total Return</div>
                <div className="text-xl font-medium text-green-500">+$12,300.00 (+12.3%)</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Annualized Return</div>
                <div className="text-xl font-medium text-green-500">+24.6%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Trading Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tradingActivityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Bar dataKey="buys" name="Buy Transactions" fill="hsl(var(--success))" />
                  <Bar dataKey="sells" name="Sell Transactions" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="allocation">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Sector Allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={sectorAllocationData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Allocation"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="value" name="Allocation %" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Allocation Details</h4>

                {sectorAllocationData.map((sector) => (
                  <div key={sector.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{sector.name}</span>
                      <span className="text-sm font-medium">{sector.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${sector.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
