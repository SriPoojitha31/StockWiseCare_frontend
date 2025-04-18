"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Heart, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample charity data
const charities = [
  { id: "1", name: "Tata Trust", color: "#4f46e5", allocation: 40 },
  { id: "2", name: "Reliance Foundation", color: "#06b6d4", allocation: 30 },
  { id: "3", name: "Bill & Melinda Gates Foundation", color: "#10b981", allocation: 20 },
  { id: "4", name: "Red Cross", color: "#ef4444", allocation: 10 },
]

export function CharityDistribution() {
  const { toast } = useToast()
  const [profitPercentage, setProfitPercentage] = useState(5)
  const [autoDistribute, setAutoDistribute] = useState(true)
  const [charityAllocations, setCharityAllocations] = useState(charities)
  const [isSaving, setIsSaving] = useState(false)

  const handleAllocationChange = (id: string, value: number) => {
    // Calculate the total of all other allocations
    const otherTotal = charityAllocations
      .filter((charity) => charity.id !== id)
      .reduce((sum, charity) => sum + charity.allocation, 0)

    // Ensure the total doesn't exceed 100%
    if (value + otherTotal > 100) {
      toast({
        title: "Invalid allocation",
        description: "Total allocation cannot exceed 100%",
        variant: "destructive",
      })
      return
    }

    // Update the allocation for the specified charity
    setCharityAllocations(
      charityAllocations.map((charity) => (charity.id === id ? { ...charity, allocation: value } : charity)),
    )
  }

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your charity distribution settings have been updated",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="profit-percentage">Percentage of Profits to Donate</Label>
              <span className="text-sm text-muted-foreground">{profitPercentage}%</span>
            </div>
            <Slider
              id="profit-percentage"
              min={1}
              max={20}
              step={1}
              value={[profitPercentage]}
              onValueChange={(value) => setProfitPercentage(value[0])}
            />
            <p className="text-sm text-muted-foreground">
              {profitPercentage}% of your investment profits will be donated to your selected charities.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-distribute" checked={autoDistribute} onCheckedChange={setAutoDistribute} />
            <Label htmlFor="auto-distribute">Automatically distribute donations</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            When enabled, your donations will be automatically distributed according to your allocation settings.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Charity Allocation</h3>

            {charityAllocations.map((charity) => (
              <div key={charity.id} className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={`charity-${charity.id}`}>{charity.name}</Label>
                  <span className="text-sm text-muted-foreground">{charity.allocation}%</span>
                </div>
                <Slider
                  id={`charity-${charity.id}`}
                  min={0}
                  max={100}
                  step={5}
                  value={[charity.allocation]}
                  onValueChange={(value) => handleAllocationChange(charity.id, value[0])}
                />
              </div>
            ))}
          </div>

          <Button className="w-full" onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-medium">Donation Distribution</h3>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charityAllocations}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="allocation"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {charityAllocations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Allocation"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">Summary</h4>
              <p className="text-sm">
                You are donating <span className="font-medium">{profitPercentage}%</span> of your investment profits to
                charity.
              </p>
              <p className="text-sm mt-1">
                Based on your current portfolio performance, your estimated annual donation would be approximately{" "}
                <span className="font-medium">$1,250</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
