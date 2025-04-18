import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BarChart3, Heart, TrendingUp } from "lucide-react"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Invest with Purpose at <span className="text-primary">StockWiseCare</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Grow your wealth while making a positive impact. Our platform combines smart investing with charitable
              giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StockWiseCare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Investing</CardTitle>
                <CardDescription>
                  Access AI-powered insights and analytics to make informed investment decisions.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Portfolio Management</CardTitle>
                <CardDescription>Track and manage your investments with our intuitive dashboard.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Charitable Impact</CardTitle>
                <CardDescription>
                  Automatically donate a portion of your gains to causes you care about.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold">Ready to start investing with purpose?</h3>
                  <p className="text-muted-foreground mt-2">Join thousands of investors making a difference today.</p>
                </div>
                <Button asChild size="lg">
                  <Link href="/auth/sign-up">
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
