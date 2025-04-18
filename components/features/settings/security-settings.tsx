"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Shield, Key, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SecuritySettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [settings, setSettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: true,
    deviceManagement: true,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleToggle = (field: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your security settings have been updated",
      })
    }, 1500)
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Account Security</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorEnabled}
              onCheckedChange={() => handleToggle("twoFactorEnabled")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-notifications">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts for new login attempts</p>
            </div>
            <Switch
              id="login-notifications"
              checked={settings.loginNotifications}
              onCheckedChange={() => handleToggle("loginNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout">Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
            </div>
            <Switch
              id="session-timeout"
              checked={settings.sessionTimeout}
              onCheckedChange={() => handleToggle("sessionTimeout")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="device-management">Device Management</Label>
              <p className="text-sm text-muted-foreground">Track and manage devices that access your account</p>
            </div>
            <Switch
              id="device-management"
              checked={settings.deviceManagement}
              onCheckedChange={() => handleToggle("deviceManagement")}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Change Password</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
            />
          </div>
          <Button onClick={handleChangePassword} disabled={isChangingPassword} className="mt-2">
            {isChangingPassword ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Changing...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Connected Devices</h3>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Current Device</h4>
                <p className="text-sm text-muted-foreground">Chrome on Windows • Last active now</p>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">iPhone 13</h4>
                <p className="text-sm text-muted-foreground">Safari on iOS • Last active 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">MacBook Pro</h4>
                <p className="text-sm text-muted-foreground">Firefox on macOS • Last active yesterday</p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Security Settings"
          )}
        </Button>
      </div>
    </div>
  )
}
