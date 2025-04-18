"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketAlerts: true,
    portfolioUpdates: true,
    priceAlerts: true,
    newsAlerts: true,
    tradingActivity: true,
    securityAlerts: true,
    marketingEmails: false,
    frequency: "daily",
  })

  const handleToggle = (field: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handleRadioChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      frequency: value,
    }))
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={() => handleToggle("smsNotifications")}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-medium">Notification Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="market-alerts">Market Alerts</Label>
              <p className="text-sm text-muted-foreground">Important market events and updates</p>
            </div>
            <Switch
              id="market-alerts"
              checked={settings.marketAlerts}
              onCheckedChange={() => handleToggle("marketAlerts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
              <p className="text-sm text-muted-foreground">Daily and weekly portfolio performance</p>
            </div>
            <Switch
              id="portfolio-updates"
              checked={settings.portfolioUpdates}
              onCheckedChange={() => handleToggle("portfolioUpdates")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="price-alerts">Price Alerts</Label>
              <p className="text-sm text-muted-foreground">Notifications when stocks hit target prices</p>
            </div>
            <Switch
              id="price-alerts"
              checked={settings.priceAlerts}
              onCheckedChange={() => handleToggle("priceAlerts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="news-alerts">News Alerts</Label>
              <p className="text-sm text-muted-foreground">Breaking news about your investments</p>
            </div>
            <Switch id="news-alerts" checked={settings.newsAlerts} onCheckedChange={() => handleToggle("newsAlerts")} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="trading-activity">Trading Activity</Label>
              <p className="text-sm text-muted-foreground">Notifications about your trades</p>
            </div>
            <Switch
              id="trading-activity"
              checked={settings.tradingActivity}
              onCheckedChange={() => handleToggle("tradingActivity")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">Account security and login notifications</p>
            </div>
            <Switch
              id="security-alerts"
              checked={settings.securityAlerts}
              onCheckedChange={() => handleToggle("securityAlerts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Promotional offers and updates</p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-medium">Digest Frequency</h3>
        <RadioGroup value={settings.frequency} onValueChange={handleRadioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="realtime" id="realtime" />
            <Label htmlFor="realtime">Real-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily Digest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly Digest</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </div>
  )
}
