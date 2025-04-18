import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaxCalculator } from "@/components/features/tax-calculator/tax-calculator"

export default function TaxCalculatorPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tax Calculator</h2>
          <p className="text-muted-foreground">Estimate taxes on your practice stock trades</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Tax Calculator</CardTitle>
          <CardDescription>Calculate potential tax implications based on your practice trades</CardDescription>
        </CardHeader>
        <CardContent>
          <TaxCalculator />
        </CardContent>
      </Card>
    </div>
  )
}
