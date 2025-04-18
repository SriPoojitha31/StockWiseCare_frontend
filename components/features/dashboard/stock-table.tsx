"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"

// Sample data for the table
const stocks = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 15,
    avgPrice: 145.32,
    currentPrice: 172.45,
    change: 2.35,
    changePercent: 1.38,
    value: 2586.75,
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 10,
    avgPrice: 235.45,
    currentPrice: 287.18,
    change: 1.23,
    changePercent: 0.43,
    value: 2871.8,
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 5,
    avgPrice: 2250.1,
    currentPrice: 2312.45,
    change: -15.67,
    changePercent: -0.67,
    value: 11562.25,
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    shares: 8,
    avgPrice: 3125.98,
    currentPrice: 3305.78,
    change: 45.23,
    changePercent: 1.39,
    value: 26446.24,
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 12,
    avgPrice: 675.32,
    currentPrice: 712.45,
    change: -8.76,
    changePercent: -1.21,
    value: 8549.4,
  },
]

export function StockTable() {
  const [sortColumn, setSortColumn] = useState<string>("symbol")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedStocks = [...stocks].sort((a: any, b: any) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("symbol")}>
              Symbol
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("name")}>
              Company
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50 text-right" onClick={() => handleSort("shares")}>
              Shares
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50 text-right" onClick={() => handleSort("avgPrice")}>
              Avg. Price
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 text-right"
              onClick={() => handleSort("currentPrice")}
            >
              Current Price
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 text-right"
              onClick={() => handleSort("changePercent")}
            >
              Change
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50 text-right" onClick={() => handleSort("value")}>
              Value
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell className="text-right">{stock.shares}</TableCell>
              <TableCell className="text-right">${stock.avgPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {stock.changePercent > 0 ? (
                    <span className="text-green-500 flex items-center">
                      +{stock.changePercent.toFixed(2)}% <ArrowUpRight className="ml-1 h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      {stock.changePercent.toFixed(2)}% <ArrowDownRight className="ml-1 h-3 w-3" />
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">${stock.value.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
