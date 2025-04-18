import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, BarChart3, Heart } from "lucide-react"
import { PortfolioChart } from "@/components/features/dashboard/portfolio-chart"
import { StockTable } from "@/components/features/dashboard/stock-table"
import { SentimentAnalysis } from "@/components/features/ai-insights/sentiment-analysis"
import  { useEffect, useState } from "react";

export default function DashboardPage() {
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [todaysGain, setTodaysGain] = useState(null);
  const [charityDonations, setCharityDonations] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`);
        const data = response.data;

        setPortfolioValue(data.portfolioValue);
        setTodaysGain(data.todaysGain);
        setCharityDonations(data.charityDonations);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="charity">Charity Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioValue !== null ? `$${portfolioValue}` : "Loading..."}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    +20.1% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Gain/Loss</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todaysGain !== null ? `$${todaysGain}` : "Loading..."}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    +5.2% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>{" "}
                  from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Charity Donations</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{charityDonations !== null ? `$${charityDonations}` : "Loading..."}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium flex items-center">
                    +12.5% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PortfolioChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>AI Market Insights</CardTitle>
                <CardDescription>Sentiment analysis for your top holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentAnalysis />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
              <CardDescription>A list of your current stock holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <StockTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analysis of your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charity Impact</CardTitle>
              <CardDescription>Track your charitable contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Charity impact content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
