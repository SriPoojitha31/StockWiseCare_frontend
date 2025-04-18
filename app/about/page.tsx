import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TrendingUp, Users, Globe, Shield, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">About StockWiseCare</h2>
          <p className="text-muted-foreground">Our mission, values, and purpose</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Transforming investing into a force for good</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              StockWiseCare was founded with a simple yet powerful mission: to make investing not just profitable, but
              purposeful. We believe that financial growth and social impact can go hand in hand, creating a new
              paradigm for investment platforms.
            </p>
            <p>
              Our platform combines cutting-edge investment tools with seamless charitable giving, allowing investors to
              grow their wealth while supporting causes they care about. By integrating AI-powered insights, practice
              trading environments, and transparent impact tracking, we're building a community of investors who measure
              success not just in returns, but in positive change.
            </p>
            <p>
              At StockWiseCare, we're committed to democratizing access to financial markets while fostering a culture
              of giving. We envision a world where every investment transaction can contribute to solving global
              challenges, from education and healthcare to environmental sustainability.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Investing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We provide AI-powered insights and analytics to help you make informed investment decisions, maximizing
              your returns while managing risk.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Charitable Impact</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our platform makes it easy to donate a portion of your investment gains to causes you care about, creating
              a positive impact with every successful trade.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Focus</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join a community of like-minded investors who believe in the power of financial markets to drive positive
              change in the world.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Values</CardTitle>
          <CardDescription>The principles that guide everything we do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="mt-0.5">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Global Responsibility</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We believe in the power of financial markets to address global challenges and create a more equitable
                  world.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Transparency & Trust</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We maintain the highest standards of transparency in our operations, fees, and charitable
                  distributions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Innovation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We continuously innovate to provide cutting-edge tools that make investing both profitable and
                  purposeful.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Inclusivity</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We're committed to making investing accessible to everyone, regardless of background or experience
                  level.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
          <CardDescription>The people behind StockWiseCare</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            StockWiseCare was founded by a team of finance professionals, technologists, and social impact experts who
            shared a vision of transforming how people invest. Our diverse team brings together expertise from Wall
            Street, Silicon Valley, and leading nonprofit organizations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                <img src="/placeholder.svg?height=96&width=96" alt="CEO" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium">Sri Poojitha Jorige</h3>
              <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                <img src="/placeholder.svg?height=96&width=96" alt="CTO" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium">Shivathmika Velishala</h3>
              <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                <img src="/placeholder.svg?height=96&width=96" alt="CSO" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-medium">Muni Cherisma Anamala</h3>
              <p className="text-sm text-muted-foreground">Chief Impact Officer & Co-Founder</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
