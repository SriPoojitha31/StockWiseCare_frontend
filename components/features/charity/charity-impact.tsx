"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useState } from "react"

// Sample impact data
const impactData = [
  {
    id: "1",
    name: "Tata Trust",
    color: "#4f46e5",
    donated: 450.75,
    impact: [
      { description: "Children educated", value: 45 },
      { description: "Communities supported", value: 12 },
      { description: "Schools built", value: 3 },
    ],
  },
  {
    id: "2",
    name: "Reliance Foundation",
    color: "#06b6d4",
    donated: 325.5,
    impact: [
      { description: "Patients treated", value: 120 },
      { description: "Medical camps", value: 8 },
      { description: "Healthcare workers trained", value: 25 },
    ],
  },
  {
    id: "3",
    name: "Bill & Melinda Gates Foundation",
    color: "#10b981",
    donated: 275.25,
    impact: [
      { description: "Vaccines distributed", value: 1500 },
      { description: "Research grants", value: 5 },
      { description: "Countries impacted", value: 12 },
    ],
  },
  {
    id: "4",
    name: "Red Cross",
    color: "#ef4444",
    donated: 200.5,
    impact: [
      { description: "Disaster victims helped", value: 350 },
      { description: "Emergency kits distributed", value: 200 },
      { description: "Volunteers mobilized", value: 45 },
    ],
  },
]

// Total donations by category
const donationsByCategory = [
  { name: "Education", value: 450.75, color: "#4f46e5" },
  { name: "Healthcare", value: 525.75, color: "#06b6d4" },
  { name: "Global Health", value: 275.25, color: "#10b981" },
  { name: "Disaster Relief", value: 200.5, color: "#ef4444" },
]

export function CharityImpact() {
  const [timeframe, setTimeframe] = useState("year")

  const totalDonated = impactData.reduce((sum, charity) => sum + charity.donated, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Donation Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donationsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {donationsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Donated"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Impact Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Donated</div>
                <div className="text-2xl font-bold">${totalDonated.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Charities Supported</div>
                <div className="text-xl font-medium">{impactData.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
                <div className="text-xl font-medium">2,000+</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Impact by Charity</h3>

        {impactData.map((charity) => (
          <Card key={charity.id}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">{charity.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    You've donated <span className="font-medium">${charity.donated.toFixed(2)}</span>
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="space-y-2">
                    {charity.impact.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm">
                          <span>{item.description}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                        <Progress
                          value={(item.value / 100) * 100}
                          className="h-1.5"
                          indicatorClassName={charity.color}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
