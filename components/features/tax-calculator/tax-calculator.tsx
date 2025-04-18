"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample transaction data
const sampleTransactions = [
  {
    id: "1",
    symbol: "AAPL",
    buyDate: "2023-01-15",
    buyPrice: 145.32,
    sellDate: "2023-08-20",
    sellPrice: 172.45,
    quantity: 15,
    gain: 406.95,
    holdingPeriod: "Long-term",
  },
  {
    id: "2",
    symbol: "MSFT",
    buyDate: "2023-03-10",
    buyPrice: 235.45,
    sellDate: "2023-09-05",
    sellPrice: 287.18,
    quantity: 10,
    gain: 517.3,
    holdingPeriod: "Short-term",
  },
  {
    id: "3",
    symbol: "GOOGL",
    buyDate: "2023-02-05",
    buyPrice: 2250.1,
    sellDate: "2023-04-15",
    sellPrice: 2312.45,
    quantity: 5,
    gain: 311.75,
    holdingPeriod: "Short-term",
  },
  {
    id: "4",
    symbol: "TSLA",
    buyDate: "2022-11-20",
    buyPrice: 675.32,
    sellDate: "2023-08-10",
    sellPrice: 712.45,
    quantity: 12,
    gain: 445.56,
    holdingPeriod: "Long-term",
  },
]

export function TaxCalculator() {
  const { toast } = useToast()
  const [isCalculating, setIsCalculating] = useState(false)
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [taxYear, setTaxYear] = useState("2023")
  const [filingStatus, setFilingStatus] = useState("single")
  const [income, setIncome] = useState("75000")
  const [stateRate, setStateRate] = useState(5)
  const [taxResults, setTaxResults] = useState<any>(null)

  const calculateTax = () => {
    setIsCalculating(true)

    // Simulate API call
    setTimeout(() => {
      // Calculate total gains
      const shortTermGains = transactions
        .filter((t) => t.holdingPeriod === "Short-term")
        .reduce((sum, t) => sum + t.gain, 0)

      const longTermGains = transactions
        .filter((t) => t.holdingPeriod === "Long-term")
        .reduce((sum, t) => sum + t.gain, 0)

      const totalGains = shortTermGains + longTermGains

      // Calculate federal tax rates based on filing status and income
      let shortTermRate = 0.22 // Default rate
      let longTermRate = 0.15 // Default rate

      const totalIncome = Number.parseInt(income) + shortTermGains

      // Simplified tax brackets for demonstration
      if (filingStatus === "single") {
        if (totalIncome < 40000) {
          shortTermRate = 0.12
          longTermRate = 0
        } else if (totalIncome < 85000) {
          shortTermRate = 0.22
          longTermRate = 0.15
        } else if (totalIncome < 165000) {
          shortTermRate = 0.24
          longTermRate = 0.15
        } else if (totalIncome < 210000) {
          shortTermRate = 0.32
          longTermRate = 0.15
        } else {
          shortTermRate = 0.35
          longTermRate = 0.2
        }
      } else if (filingStatus === "joint") {
        if (totalIncome < 80000) {
          shortTermRate = 0.12
          longTermRate = 0
        } else if (totalIncome < 170000) {
          shortTermRate = 0.22
          longTermRate = 0.15
        } else if (totalIncome < 330000) {
          shortTermRate = 0.24
          longTermRate = 0.15
        } else if (totalIncome < 420000) {
          shortTermRate = 0.32
          longTermRate = 0.15
        } else {
          shortTermRate = 0.35
          longTermRate = 0.2
        }
      }

      // Calculate taxes
      const shortTermTax = shortTermGains * shortTermRate
      const longTermTax = longTermGains * longTermRate
      const stateTax = totalGains * (stateRate / 100)
      const totalTax = shortTermTax + longTermTax + stateTax
      const effectiveRate = totalGains > 0 ? (totalTax / totalGains) * 100 : 0

      setTaxResults({
        shortTermGains,
        longTermGains,
        totalGains,
        shortTermRate,
        longTermRate,
        stateRate,
        shortTermTax,
        longTermTax,
        stateTax,
        totalTax,
        effectiveRate,
      })

      setIsCalculating(false)

      toast({
        title: "Tax calculation complete",
        description: "Your estimated tax liability has been calculated",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
          <TabsTrigger value="transactions">Realized Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Tax Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-year">Tax Year</Label>
                    <Select value={taxYear} onValueChange={setTaxYear}>
                      <SelectTrigger id="tax-year">
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filing-status">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger id="filing-status">
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="joint">Married Filing Jointly</SelectItem>
                        <SelectItem value="separate">Married Filing Separately</SelectItem>
                        <SelectItem value="head">Head of Household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (excluding investments)</Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter your annual income"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="state-rate">State Tax Rate (%)</Label>
                      <span className="text-sm text-muted-foreground">{stateRate}%</span>
                    </div>
                    <Slider
                      id="state-rate"
                      min={0}
                      max={13}
                      step={0.1}
                      value={[stateRate]}
                      onValueChange={(value) => setStateRate(value[0])}
                    />
                  </div>

                  <Button className="w-full" onClick={calculateTax} disabled={isCalculating}>
                    {isCalculating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate Tax
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Tax Summary</h3>
                {!taxResults ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                    <Calculator className="h-12 w-12 mb-4 opacity-20" />
                    <p>Enter your information and click "Calculate Tax" to see your estimated tax liability.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Short-Term Gains</div>
                        <div className="text-xl font-medium">${taxResults.shortTermGains.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Long-Term Gains</div>
                        <div className="text-xl font-medium">${taxResults.longTermGains.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Gains</div>
                        <div className="text-xl font-medium">${taxResults.totalGains.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Effective Tax Rate</div>
                        <div className="text-xl font-medium">{taxResults.effectiveRate.toFixed(2)}%</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Tax Breakdown</h4>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Federal Tax (Short-Term)</span>
                          <span className="font-medium">${taxResults.shortTermTax.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${taxResults.shortTermGains.toFixed(2)} × {(taxResults.shortTermRate * 100).toFixed(2)}%
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Federal Tax (Long-Term)</span>
                          <span className="font-medium">${taxResults.longTermTax.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${taxResults.longTermGains.toFixed(2)} × {(taxResults.longTermRate * 100).toFixed(2)}%
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>State Tax</span>
                          <span className="font-medium">${taxResults.stateTax.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${taxResults.totalGains.toFixed(2)} × {taxResults.stateRate.toFixed(2)}%
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total Estimated Tax</span>
                          <span>${taxResults.totalTax.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Buy Date</TableHead>
                    <TableHead className="text-right">Buy Price</TableHead>
                    <TableHead>Sell Date</TableHead>
                    <TableHead className="text-right">Sell Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Gain/Loss</TableHead>
                    <TableHead>Holding Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.symbol}</TableCell>
                      <TableCell>{transaction.buyDate}</TableCell>
                      <TableCell className="text-right">${transaction.buyPrice.toFixed(2)}</TableCell>
                      <TableCell>{transaction.sellDate}</TableCell>
                      <TableCell className="text-right">${transaction.sellPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{transaction.quantity}</TableCell>
                      <TableCell className="text-right">
                        <span className={transaction.gain >= 0 ? "text-green-500" : "text-red-500"}>
                          ${transaction.gain.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.holdingPeriod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
