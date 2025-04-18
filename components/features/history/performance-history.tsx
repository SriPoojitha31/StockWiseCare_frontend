"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample performance data
const performanceData = [
  { date: "Jan 2023", portfolioValue: 100000, benchmark: 100000 },
  { date: "Feb 2023", portfolioValue: 102500, benchmark: 101200 },
  { date: "Mar 2023", portfolioValue: 101200, benchmark: 102400 },
  { date: "Apr 2023", portfolioValue: 103700, benchmark: 103100 },
  { date: "May 2023", portfolioValue: 105200, benchmark: 102800 },
  { date: "Jun 2023", portfolioValue: 104800, benchmark: 103500 },
  { date: "Jul 2023", portfolioValue: 107300, benchmark: 104200 },
  { date: "Aug 2023", portfolioValue: 109500, benchmark: 105800 },
  { date: "Sep 2023", portfolioValue: 108200, benchmark: 106500 },
  { date: "Oct 2023", portfolioValue: 110700, benchmark: 107200 },
  { date: "Nov 2023", portfolioValue: 112300, benchmark: 108900 },
  { date: "Dec 2023", portfolioValue: 115800, benchmark: 110500 },
]

// Sample trade history
const tradeHistory = [
  {
    id: "1",
    date: "Dec 15, 2023",
    type: "buy",
    symbol: "AAPL",
    quantity: 15,
    price: 172.45,
    total: 2586.75,
  },
  {
    id: "2",
    date: "Dec 10, 2023",
    type: "sell",
    symbol: "MSFT",
    quantity: 8,
    price: 287.18,
    total: 2297.44,
  },
  {
    id: "3",
    date: "Nov 28, 2023",
    type: "buy",
    symbol: "GOOGL",
    quantity: 5,
    price: 2312.45,
    total: 11562.25,
  },
  {
    id: "4",
    date: "Nov 15, 2023",
    type: "buy",
    symbol: "AMZN",
    quantity: 10,
    price: 3305.78,
    total: 33057.8,
  },
  {
    id: "5",
    date: "Oct 22, 2023",
    type: "sell",
    symbol: "TSLA",
    quantity: 12,
    price: 712.45,
    total: 8549.4,
  },
]

export function PerformanceHistory() {
  const [timeframe, setTimeframe] = useState("1y")

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
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
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="portfolioValue"
                  name="Your Portfolio"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="benchmark" name="S&P 500" stroke="hsl(var(--muted-foreground))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Starting Value</h3>
            <p className="text-2xl font-bold">$100,000.00</p>
            <p className="text-sm text-muted-foreground">Jan 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Current Value</h3>
            <p className="text-2xl font-bold">$115,800.00</p>
            <p className="text-sm text-muted-foreground">Dec 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Total Return</h3>
            <p className="text-2xl font-bold text-green-500">+15.8%</p>
            <p className="text-sm text-muted-foreground">vs. S&P 500: +10.5%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Trade History</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tradeHistory.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell>
                      <Badge className={trade.type === "buy" ? "bg-green-500" : "bg-red-500"}>
                        {trade.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell className="text-right">{trade.quantity}</TableCell>
                    <TableCell className="text-right">${trade.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${trade.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
