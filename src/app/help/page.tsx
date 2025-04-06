"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and learn how to use StayCation.</p>
        </div>

        <Tabs defaultValue="guests" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="guests">For Guests</TabsTrigger>
            <TabsTrigger value="hosts">For Hosts</TabsTrigger>
          </TabsList>
          <TabsContent value="guests" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Booking & Reservations</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to book properties and manage your reservations.
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Payments & Refunds</h3>
                  <p className="text-sm text-muted-foreground">
                    Information about payment methods, fees, and refund policies.
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Guest Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get help with issues during your stay and contact support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="hosts" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Listing Your Property</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to create and optimize your property listing.
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Managing Bookings</h3>
                  <p className="text-sm text-muted-foreground">
                    How to handle reservations, cancellations, and guest communications.
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-8 w-8 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold">Payments & Taxes</h3>
                  <p className="text-sm text-muted-foreground">
                    Information about getting paid, payout methods, and tax obligations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To create an account, click on the "Sign Up" button in the top right corner of the homepage. You can
                  sign up using your email address, or through your Google or Facebook account. Follow the prompts to
                  complete your profile information.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I book a property?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To book a property, search for your desired location and dates, then browse the available listings.
                  When you find a property you like, click "View Details" to see more information. On the property page,
                  select your check-in and check-out dates, number of guests, and click "Reserve." Follow the prompts to
                  complete your booking and payment.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Cancellation policies vary by property. Each listing displays its specific cancellation policy, which
                  can be Flexible, Moderate, or Strict. You can view the details of each policy on the property page
                  before booking. In general, the earlier you cancel, the more likely you are to receive a full or
                  partial refund.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I become a host?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To become a host, create an account and click "Become a Host" in your dashboard or on the homepage.
                  You'll need to provide details about your property, including location, type, amenities, and photos.
                  You'll also need to set your pricing, availability, and house rules. Once your listing is complete,
                  submit it for review, and it will be published once approved.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do payments work?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Guests pay through our secure payment system when they book a property. We hold the payment until 24
                  hours after check-in to ensure everything is as expected. Hosts receive their payout via their
                  preferred payment method (direct deposit, PayPal, etc.) after this 24-hour period, minus our service
                  fee. All transactions are protected by our secure payment system.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What if there's an issue with my stay?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you encounter any issues during your stay, first try to resolve them directly with your host
                  through our messaging system. If that doesn't work, contact our customer support team through the Help
                  Center or by calling our 24/7 support line. In case of serious issues that make the property
                  uninhabitable, we offer a rebooking service or refund depending on the circumstances.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  You can contact our customer support team through several channels:
                </p>
                <ul className="ml-6 mt-2 list-disc text-muted-foreground">
                  <li>Email: support@staycation.com</li>
                  <li>Phone: +1 (800) 123-4567 (available 24/7)</li>
                  <li>Live Chat: Available on our website and mobile app</li>
                  <li>Help Center: Submit a request through our online form</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  For urgent issues requiring immediate assistance, we recommend calling our support line.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="rounded-lg bg-muted p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Still need help?</h3>
          <p className="mb-4 text-muted-foreground">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:support@staycation.com">Email Us</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

