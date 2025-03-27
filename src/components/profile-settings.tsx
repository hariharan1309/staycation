"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Upload, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ProfileSettingsProps {
  userRole: "guest" | "owner"
}

export function ProfileSettings({ userRole }: ProfileSettingsProps) {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=120&width=120")

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Travel enthusiast and adventure seeker. Love exploring new places and experiencing different cultures. Always looking for the next great adventure!",
    address: "123 Main St, San Francisco, CA 94103",
    country: "United States",
    language: "English",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailBookings: true,
    emailPromotions: false,
    emailAccount: true,
    pushBookings: true,
    pushPromotions: false,
    pushAccount: false,
  })

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "**** **** **** 4242",
    cardName: "John Doe",
    expiryDate: "12/25",
    defaultMethod: true,
  })

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handleNotificationChange = (setting: string, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: checked,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and how it's displayed to others.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                  >
                    <Upload className="h-6 w-6 text-white" />
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-medium">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground">Upload a photo to personalize your profile.</p>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    <label
                      htmlFor="profile-image"
                      className="inline-flex cursor-pointer items-center text-sm font-medium text-primary hover:underline"
                    >
                      Upload new image
                    </label>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={personalInfo.country}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, country: value })}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={personalInfo.language}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, language: value })}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          {userRole === "owner" && (
            <Card>
              <CardHeader>
                <CardTitle>Host Settings</CardTitle>
                <CardDescription>Configure your host profile and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="superhost">Superhost Status</Label>
                    <p className="text-sm text-muted-foreground">You're a Superhost! Keep up the great work.</p>
                  </div>
                  <Badge>Superhost</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="instant-book">Instant Book</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow guests to book without sending a reservation request.
                    </p>
                  </div>
                  <Switch id="instant-book" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="guest-requirements">Guest Requirements</Label>
                    <p className="text-sm text-muted-foreground">
                      Set requirements for guests who can book your properties.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage the emails you receive from us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-bookings">Booking Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your bookings and trips.</p>
                </div>
                <Switch
                  id="email-bookings"
                  checked={notificationSettings.emailBookings}
                  onCheckedChange={(checked) => handleNotificationChange("emailBookings", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-promotions">Promotions and Offers</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about promotions, discounts, and special offers.
                  </p>
                </div>
                <Switch
                  id="email-promotions"
                  checked={notificationSettings.emailPromotions}
                  onCheckedChange={(checked) => handleNotificationChange("emailPromotions", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-account">Account Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity and security.
                  </p>
                </div>
                <Switch
                  id="email-account"
                  checked={notificationSettings.emailAccount}
                  onCheckedChange={(checked) => handleNotificationChange("emailAccount", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage the push notifications you receive on your devices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-bookings">Booking Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications about your bookings and trips.
                  </p>
                </div>
                <Switch
                  id="push-bookings"
                  checked={notificationSettings.pushBookings}
                  onCheckedChange={(checked) => handleNotificationChange("pushBookings", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-promotions">Promotions and Offers</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications about promotions and offers.
                  </p>
                </div>
                <Switch
                  id="push-promotions"
                  checked={notificationSettings.pushPromotions}
                  onCheckedChange={(checked) => handleNotificationChange("pushPromotions", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-account">Account Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications about your account activity.
                  </p>
                </div>
                <Switch
                  id="push-account"
                  checked={notificationSettings.pushAccount}
                  onCheckedChange={(checked) => handleNotificationChange("pushAccount", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-16 items-center justify-center rounded-md bg-muted">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiryDate}</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {userRole === "owner" && (
            <Card>
              <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
                <CardDescription>Manage how you receive payments from bookings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-16 items-center justify-center rounded-md bg-muted">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                          <polyline points="3.29 7 12 12 20.71 7" />
                          <line x1="12" y1="22" x2="12" y2="12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">Ending in 5678</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payout Method
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past transactions and receipts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "INV-001",
                    date: "May 20, 2023",
                    amount: "$120.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-002",
                    date: "Apr 15, 2023",
                    amount: "$200.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-003",
                    date: "Mar 10, 2023",
                    amount: "$180.00",
                    status: "Paid",
                  },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Invoice #{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge variant="outline">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link">View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with an additional security layer.
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>Manage your active sessions and devices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  device: "MacBook Pro",
                  location: "San Francisco, CA",
                  lastActive: "Active now",
                  current: true,
                },
                {
                  device: "iPhone 13",
                  location: "San Francisco, CA",
                  lastActive: "2 hours ago",
                  current: false,
                },
                {
                  device: "Windows PC",
                  location: "New York, NY",
                  lastActive: "3 days ago",
                  current: false,
                },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {session.device.includes("Mac") || session.device.includes("iPhone") ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0017 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 00-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z" />
                          <path d="M10 2c1 .5 2 2 2 5" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect width="14" height="8" x="5" y="2" rx="2" />
                          <rect width="20" height="8" x="2" y="14" rx="2" />
                          <path d="M6 18h2" />
                          <path d="M12 18h6" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {session.device}
                        {session.current && <span className="ml-2 text-xs text-muted-foreground">(Current)</span>}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm">
                      Log Out
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Log Out of All Devices
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Deletion</CardTitle>
              <CardDescription>Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
              <Button variant="destructive" className="mt-4">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

