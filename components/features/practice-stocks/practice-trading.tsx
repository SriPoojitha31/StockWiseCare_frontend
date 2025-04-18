"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight, Search, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample stock data
const stockData = {
  AAPL: {
    name: "Apple Inc.",
    price: 172.45,
    change: 2.35,
    changePercent: 1.38,
    chartData: [
      { time: "9:30", price: 170.1 },
      { time: "10:00", price: 170.45 },
      { time: "10:30", price: 171.2 },
      { time: "11:00", price: 170.8 },
      { time: "11:30", price: 171.5 },
      { time: "12:00", price: 172.1 },
      { time: "12:30", price: 171.9 },
      { time: "13:00", price: 172.3 },
      { time: "13:30", price: 172.45 },
    ],
  },
  MSFT: {
    name: "Microsoft Corporation",
    price: 287.18,
    change: 1.23,
    changePercent: 0.43,
    chartData: [
      { time: "9:30", price: 286.0 },
      { time: "10:00", price: 286.25 },
      { time: "10:30", price: 286.75 },
      { time: "11:00", price: 286.5 },
      { time: "11:30", price: 287.0 },
      { time: "12:00", price: 287.25 },
      { time: "12:30", price: 287.1 },
      { time: "13:00", price: 287.3 },
      { time: "13:30", price: 287.18 },
    ],
  },
  GOOGL: {
    name: "Alphabet Inc.",
    price: 2312.45,
    change: -15.67,
    changePercent: -0.67,
    chartData: [
      { time: "9:30", price: 2328.12 },
      { time: "10:00", price: 2325.45 },
      { time: "10:30", price: 2320.1 },
      { time: "11:00", price: 2318.75 },
      { time: "11:30", price: 2315.3 },
      { time: "12:00", price: 2313.2 },
      { time: "12:30", price: 2314.5 },
      { time: "13:00", price: 2313.1 },
      { time: "13:30", price: 2312.45 },
    ],
  },
  AMZN: {
    name: "Amazon.com, Inc.",
    price: 3305.78,
    change: 45.23,
    changePercent: 1.39,
    chartData: [
      { time: "9:30", price: 3260.55 },
      { time: "10:00", price: 3270.25 },
      { time: "10:30", price: 3280.1 },
      { time: "11:00", price: 3275.45 },
      { time: "11:30", price: 3290.3 },
      { time: "12:00", price: 3300.2 },
      { time: "12:30", price: 3295.5 },
      { time: "13:00", price: 3302.1 },
      { time: "13:30", price: 3305.78 },
    ],
  },
  TSLA: {
    name: "Tesla, Inc.",
    price: 712.45,
    change: -8.76,
    changePercent: -1.21,
    chartData: [
      { time: "9:30", price: 721.21 },
      { time: "10:00", price: 719.45 },
      { time: "10:30", price: 717.1 },
      { time: "11:00", price: 715.75 },
      { time: "11:30", price: 714.3 },
      { time: "12:00", price: 713.2 },
      { time: "12:30", price: 714.5 },
      { time: "13:00", price: 713.1 },
      { time: "13:30", price: 712.45 },
    ],
  },
}

// Initial portfolio
const initialPortfolio = {
  cash: 100000,
  holdings: [],
  transactions: [],
}

export function PracticeTrading() {
  const { toast } = useToast()
  const [portfolio, setPortfolio] = useState(initialPortfolio)
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [quantity, setQuantity] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (stockData[searchInput.toUpperCase()]) {
      setSelectedStock(searchInput.toUpperCase())
    } else {
      toast({
        title: "Stock not found",
        description: "Please enter a valid stock symbol",
        variant: "destructive",
      })
    }
  }

  const handleBuy = () => {
    const stock = stockData[selectedStock]
    const qty = Number.parseInt(quantity)

    if (!qty || qty <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    const totalCost = stock.price * qty

    if (totalCost > portfolio.cash) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough cash for this purchase",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const existingHolding = portfolio.holdings.find((h) => h.symbol === selectedStock)

      const updatedHoldings = existingHolding
        ? portfolio.holdings.map((h) =>
            h.symbol === selectedStock
              ? {
                  ...h,
                  quantity: h.quantity + qty,
                  avgPrice: (h.avgPrice * h.quantity + stock.price * qty) / (h.quantity + qty),
                }
              : h,
          )
        : [
            ...portfolio.holdings,
            {
              symbol: selectedStock,
              name: stock.name,
              quantity: qty,
              avgPrice: stock.price,
              currentPrice: stock.price,
            },
          ]

      const transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: "buy",
        symbol: selectedStock,
        quantity: qty,
        price: stock.price,
        total: totalCost,
      }

      setPortfolio({
        cash: portfolio.cash - totalCost,
        holdings: updatedHoldings,
        transactions: [transaction, ...portfolio.transactions],
      })

      setQuantity("")
      setIsLoading(false)

      toast({
        title: "Purchase successful",
        description: `Bought ${qty} shares of ${selectedStock} at $${stock.price.toFixed(2)}`,
      })
    }, 1000)
  }

  const handleSell = () => {
    const stock = stockData[selectedStock]
    const qty = Number.parseInt(quantity)

    if (!qty || qty <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    const existingHolding = portfolio.holdings.find((h) => h.symbol === selectedStock)

    if (!existingHolding || existingHolding.quantity < qty) {
      toast({
        title: "Insufficient shares",
        description: `You don't have enough ${selectedStock} shares to sell`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const totalValue = stock.price * qty

      const updatedHoldings =
        existingHolding.quantity === qty
          ? portfolio.holdings.filter((h) => h.symbol !== selectedStock)
          : portfolio.holdings.map((h) => (h.symbol === selectedStock ? { ...h, quantity: h.quantity - qty } : h))

      const transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: "sell",
        symbol: selectedStock,
        quantity: qty,
        price: stock.price,
        total: totalValue,
      }

      setPortfolio({
        cash: portfolio.cash + totalValue,
        holdings: updatedHoldings,
        transactions: [transaction, ...portfolio.transactions],
      })

      setQuantity("")
      setIsLoading(false)

      toast({
        title: "Sale successful",
        description: `Sold ${qty} shares of ${selectedStock} at $${stock.price.toFixed(2)}`,
      })
    }, 1000)
  }

  const calculatePortfolioValue = () => {
    const holdingsValue = portfolio.holdings.reduce(
      (total, holding) => total + holding.quantity * stockData[holding.symbol].price,
      0,
    )
    return portfolio.cash + holdingsValue
  }

  const stock = stockData[selectedStock]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-4">
              <div className="w-full md:w-64">
                <Label htmlFor="stock-search">Search Stock Symbol</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <form onSubmit={handleSearch}>
                    <Input
                      id="stock-search"
                      placeholder="e.g. AAPL, MSFT"
                      className="pl-8"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(stockData).map((symbol) => (
                  <Button
                    key={symbol}
                    variant={selectedStock === symbol ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStock(symbol)}
                  >
                    {symbol}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    {stock.name} ({selectedStock})
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold">${stock.price.toFixed(2)}</span>
                    <span
                      className={`ml-2 flex items-center text-sm ${
                        stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.changePercent >= 0 ? (
                        <>
                          +{stock.changePercent.toFixed(2)}% <ArrowUpRight className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          {stock.changePercent.toFixed(2)}% <ArrowDownRight className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-end gap-2 mt-4 md:mt-0">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      className="w-24"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleBuy} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Buy"}
                  </Button>
                  <Button onClick={handleSell} disabled={isLoading} variant="destructive">
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Sell"}
                  </Button>
                </div>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stock.chartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                      domain={["dataMin - 5", "dataMax + 5"]}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={stock.changePercent >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Portfolio Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-2xl font-bold">${calculatePortfolioValue().toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Cash Available</div>
                <div className="text-xl font-medium">${portfolio.cash.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Holdings Value</div>
                <div className="text-xl font-medium">${(calculatePortfolioValue() - portfolio.cash).toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Avg. Price</TableHead>
                    <TableHead className="text-right">Current Price</TableHead>
                    <TableHead className="text-right">Market Value</TableHead>
                    <TableHead className="text-right">Gain/Loss</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolio.holdings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No holdings yet. Start buying stocks!
                      </TableCell>
                    </TableRow>
                  ) : (
                    portfolio.holdings.map((holding) => {
                      const currentPrice = stockData[holding.symbol].price
                      const marketValue = holding.quantity * currentPrice
                      const avgCost = holding.quantity * holding.avgPrice
                      const gainLoss = marketValue - avgCost
                      const gainLossPercent = (gainLoss / avgCost) * 100

                      return (
                        <TableRow key={holding.symbol}>
                          <TableCell className="font-medium">{holding.symbol}</TableCell>
                          <TableCell>{holding.name}</TableCell>
                          <TableCell className="text-right">{holding.quantity}</TableCell>
                          <TableCell className="text-right">${holding.avgPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${currentPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${marketValue.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <span className={gainLoss >= 0 ? "text-green-500" : "text-red-500"}>
                              ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-0">
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
                  {portfolio.transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No transactions yet. Start trading!
                      </TableCell>
                    </TableRow>
                  ) : (
                    portfolio.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}{" "}
                          {new Date(transaction.date).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.type.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.symbol}</TableCell>
                        <TableCell className="text-right">{transaction.quantity}</TableCell>
                        <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${transaction.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
