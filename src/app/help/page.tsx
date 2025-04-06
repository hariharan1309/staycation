import type React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Help Center | StayCation",
  description:
    "Find answers to common questions and learn how to use StayCation.",
};

export default function HelpPage() {
  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Help Center
          </h1>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to use StayCation.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To create an account, click on the "Sign Up" button in the top
                  right corner of the homepage. You can sign up using your email
                  address, or through your Google or Facebook account. Follow
                  the prompts to complete your profile information.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I book a property?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To book a property, search for your desired location and
                  dates, then browse the available listings. When you find a
                  property you like, click "View Details" to see more
                  information. On the property page, select your check-in and
                  check-out dates, number of guests, and click "Reserve." Follow
                  the prompts to complete your booking and payment.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the cancellation policy?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Cancellation policies vary by property. Each listing displays
                  its specific cancellation policy, which can be Flexible,
                  Moderate, or Strict. You can view the details of each policy
                  on the property page before booking. In general, the earlier
                  you cancel, the more likely you are to receive a full or
                  partial refund.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I become a host?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  To become a host, create an account and click "Become a Host"
                  in your dashboard or on the homepage. You'll need to provide
                  details about your property, including location, type,
                  amenities, and photos. You'll also need to set your pricing,
                  availability, and house rules. Once your listing is complete,
                  submit it for review, and it will be published once approved.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do payments work?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Guests pay through our secure payment system when they book a
                  property. We hold the payment until 24 hours after check-in to
                  ensure everything is as expected. Hosts receive their payout
                  via their preferred payment method (direct deposit, PayPal,
                  etc.) after this 24-hour period, minus our service fee. All
                  transactions are protected by our secure payment system.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                What if there's an issue with my stay?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you encounter any issues during your stay, first try to
                  resolve them directly with your host through our messaging
                  system. If that doesn't work, contact our customer support
                  team through the Help Center or by calling our 24/7 support
                  line. In case of serious issues that make the property
                  uninhabitable, we offer a rebooking service or refund
                  depending on the circumstances.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                How do I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  You can contact our customer support team through several
                  channels:
                </p>
                <ul className="ml-6 mt-2 list-disc text-muted-foreground">
                  <li>Email: support@staycation.com</li>
                  <li>Phone: +1 (800) 123-4567 (available 24/7)</li>
                  <li>Live Chat: Available on our website and mobile app</li>
                  <li>Help Center: Submit a request through our online form</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  For urgent issues requiring immediate assistance, we recommend
                  calling our support line.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="rounded-lg bg-muted p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold">Still need help?</h3>
          <p className="mb-4 text-muted-foreground">
            Our support team is available 24/7 to assist you with any questions
            or issues.
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
  );
}
