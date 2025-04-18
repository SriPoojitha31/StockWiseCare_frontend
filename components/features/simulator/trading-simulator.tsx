"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight, Play, Pause, RefreshCw, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample market data
const initialMarketData = [
  { time: "9:30", AAPL: 170.1, MSFT: 286.0, GOOGL: 2328.12, AMZN: 3260.55, TSLA: 721.21 },
  { time: "10:00", AAPL: 170.45, MSFT: 286.25, GOOGL: 2325.45, AMZN: 3270.25, TSLA: 719.45 },
  { time: "10:30", AAPL: 171.2, MSFT: 286.75, GOOGL: 2320.1, AMZN: 3280.1, TSLA: 717.1 },
  { time: "11:00", AAPL: 170.8, MSFT: 286.5, GOOGL: 2318.75, AMZN: 3275.45, TSLA: 715.75 },
  { time: "11:30", AAPL: 171.5, MSFT: 287.0, GOOGL: 2315.3, AMZN: 3290.3, TSLA: 714.3 },
  { time: "12:00", AAPL: 172.1, MSFT: 287.25, GOOGL: 2313.2, AMZN: 3300.2, TSLA: 713.2 },
  { time: "12:30", AAPL: 171.9, MSFT: 287.1, GOOGL: 2314.5, AMZN: 3295.5, TSLA: 714.5 },
  { time: "13:00", AAPL: 172.3, MSFT: 287.3, GOOGL: 2313.1, AMZN: 3302.1, TSLA: 713.1 },
  { time: "13:30", AAPL: 172.45, MSFT: 287.18, GOOGL: 2312.45, AMZN: 3305.78, TSLA: 712.45 },
  { time: "14:00", AAPL: 172.8, MSFT: 287.5, GOOGL: 2314.2, AMZN: 3310.45, TSLA: 713.8 },
  { time: "14:30", AAPL: 173.25, MSFT: 288.1, GOOGL: 2316.75, AMZN: 3315.2, TSLA: 715.25 },
  { time: "15:00", AAPL: 173.1, MSFT: 287.9, GOOGL: 2315.5, AMZN: 3312.8, TSLA: 714.6 },
  { time: "15:30", AAPL: 173.5, MSFT: 288.3, GOOGL: 2317.2, AMZN: 3318.45, TSLA: 716.1 },
  { time: "16:00", AAPL: 173.75, MSFT: 288.45, GOOGL: 2318.3, AMZN: 3320.75, TSLA: 717.25 },
]

export function TradingSimulator() {
  const { toast } = useToast()
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [marketData, setMarketData] = useState(initialMarketData.slice(0, 1))
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [quantity, setQuantity] = useState("")
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    holdings: [],
    transactions: [],
  })
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null)

  const startSimulation = () => {
    if (isSimulating) return

    setIsSimulating(true)

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const nextTime = prevTime + 1

        if (nextTime >= initialMarketData.length) {
          clearInterval(interval)
          setIsSimulating(false)
          toast({
            title: "Simulation complete",
            description: "The trading day has ended",
          })
          return prevTime
        }

        setMarketData(initialMarketData.slice(0, nextTime + 1))
        return nextTime
      })
    }, 2000 / simulationSpeed)

    setSimulationInterval(interval)
  }

  const pauseSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval)
      setSimulationInterval(null)
    }
    setIsSimulating(false)
  }

  const resetSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval)
      setSimulationInterval(null)
    }
    setIsSimulating(false)
    setCurrentTime(0)
    setMarketData(initialMarketData.slice(0, 1))
    setPortfolio({
      cash: 100000,
      holdings: [],
      transactions: [],
    })

    toast({
      title: "Simulation reset",
      description: "The trading simulation has been reset",
    })
  }

  const handleBuy = () => {
    const qty = Number.parseInt(quantity)

    if (!qty || qty <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    const currentPrice = marketData[currentTime][selectedStock]
    const totalCost = currentPrice * qty

    if (totalCost > portfolio.cash) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough cash for this purchase",
        variant: "destructive",
      })
      return
    }

    const existingHolding = portfolio.holdings.find((h) => h.symbol === selectedStock)

    const updatedHoldings = existingHolding
      ? portfolio.holdings.map((h) =>
          h.symbol === selectedStock
            ? {
                ...h,
                quantity: h.quantity + qty,
                avgPrice: (h.avgPrice * h.quantity + currentPrice * qty) / (h.quantity + qty),
              }
            : h,
        )
      : [
          ...portfolio.holdings,
          {
            symbol: selectedStock,
            quantity: qty,
            avgPrice: currentPrice,
          },
        ]

    const transaction = {
      id: Date.now().toString(),
      time: initialMarketData[currentTime].time,
      type: "buy",
      symbol: selectedStock,
      quantity: qty,
      price: currentPrice,
      total: totalCost,
    }

    setPortfolio({
      cash: portfolio.cash - totalCost,
      holdings: updatedHoldings,
      transactions: [transaction, ...portfolio.transactions],
    })

    setQuantity("")

    toast({
      title: "Purchase successful",
      description: `Bought ${qty} shares of ${selectedStock} at $${currentPrice.toFixed(2)}`,
    })
  }

  const handleSell = () => {
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

    const currentPrice = marketData[currentTime][selectedStock]
    const totalValue = currentPrice * qty

    const updatedHoldings =
      existingHolding.quantity === qty
        ? portfolio.holdings.filter((h) => h.symbol !== selectedStock)
        : portfolio.holdings.map((h) => (h.symbol === selectedStock ? { ...h, quantity: h.quantity - qty } : h))

    const transaction = {
      id: Date.now().toString(),
      time: initialMarketData[currentTime].time,
      type: "sell",
      symbol: selectedStock,
      quantity: qty,
      price: currentPrice,
      total: totalValue,
    }

    setPortfolio({
      cash: portfolio.cash + totalValue,
      holdings: updatedHoldings,
      transactions: [transaction, ...portfolio.transactions],
    })

    setQuantity("")

    toast({
      title: "Sale successful",
      description: `Sold ${qty} shares of ${selectedStock} at $${currentPrice.toFixed(2)}`,
    })
  }

  const calculatePortfolioValue = () => {
    if (currentTime < 0 || !marketData[currentTime]) return portfolio.cash

    const holdingsValue = portfolio.holdings.reduce(
      (total, holding) => total + holding.quantity * marketData[currentTime][holding.symbol],
      0,
    )
    return portfolio.cash + holdingsValue
  }

  const getStockChange = (symbol: string) => {
    if (currentTime <= 0 || !marketData[currentTime - 1]) return { value: 0, percent: 0 }

    const currentPrice = marketData[currentTime][symbol]
    const previousPrice = marketData[currentTime - 1][symbol]
    const change = currentPrice - previousPrice
    const percentChange = (change / previousPrice) * 100

    return { value: change, percent: percentChange }
  }

  const currentPrice = currentTime >= 0 && marketData[currentTime] ? marketData[currentTime][selectedStock] : 0
  const stockChange = getStockChange(selectedStock)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">
                  Market Time: {currentTime >= 0 && marketData[currentTime] ? marketData[currentTime].time : "9:30"}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button
                  variant={isSimulating ? "outline" : "default"}
                  size="sm"
                  onClick={startSimulation}
                  disabled={isSimulating || currentTime >= initialMarketData.length - 1}
                >
                  <Play className="h-4 w-4 mr-1" /> Start
                </Button>
                <Button
                  variant={!isSimulating ? "outline" : "default"}
                  size="sm"
                  onClick={pauseSimulation}
                  disabled={!isSimulating}
                >
                  <Pause className="h-4 w-4 mr-1" /> Pause
                </Button>
                <Button variant="outline" size="sm" onClick={resetSimulation}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="simulation-speed">Simulation Speed</Label>
                  <span className="text-sm text-muted-foreground">{simulationSpeed}x</span>
                </div>
                <Slider
                  id="simulation-speed"
                  min={1}
                  max={5}
                  step={1}
                  value={[simulationSpeed]}
                  onValueChange={(value) => setSimulationSpeed(value[0])}
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(initialMarketData[0])
                  .filter((key) => key !== "time")
                  .map((symbol) => (
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

              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium">{selectedStock}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
                    <span
                      className={`ml-2 flex items-center text-sm ${
                        stockChange.percent >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stockChange.percent >= 0 ? (
                        <>
                          +{stockChange.percent.toFixed(2)}% <ArrowUpRight className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          {stockChange.percent.toFixed(2)}% <ArrowDownRight className="ml-1 h-3 w-3" />
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
                  <Button onClick={handleBuy} className="bg-green-600 hover:bg-green-700">
                    Buy
                  </Button>
                  <Button onClick={handleSell} variant="destructive">
                    Sell
                  </Button>
                </div>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={marketData}
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
                      formatter={(value: number) => [`$${value.toFixed(2)}`, selectedStock]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedStock}
                      stroke="hsl(var(--primary))"
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

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Current Holdings</h4>
                {portfolio.holdings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No holdings yet. Start trading!</p>
                ) : (
                  <div className="space-y-2">
                    {portfolio.holdings.map((holding) => {
                      const currentStockPrice = marketData[currentTime][holding.symbol]
                      const marketValue = holding.quantity * currentStockPrice
                      const gainLoss = marketValue - holding.quantity * holding.avgPrice
                      const gainLossPercent = (gainLoss / (holding.quantity * holding.avgPrice)) * 100

                      return (
                        <div key={holding.symbol} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{holding.symbol}</div>
                            <div className="text-xs text-muted-foreground">
                              {holding.quantity} shares @ ${holding.avgPrice.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div>${marketValue.toFixed(2)}</div>
                            <div className={`text-xs ${gainLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          {portfolio.transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet. Start trading!</p>
          ) : (
            <div className="space-y-2">
              {portfolio.transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          transaction.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type.toUpperCase()}
                      </span>
                      <span className="ml-2 font-medium">{transaction.symbol}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {transaction.quantity} shares @ ${transaction.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div>${transaction.total.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
