"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Contact Us
          </h1>
          <p className="text-muted-foreground">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">Message Sent!</h2>
                  <p className="mb-6 text-muted-foreground">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:p-8">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <address className="not-italic text-muted-foreground text-sm">
                      123 Vacation Street
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground text-sm">
                      <Link
                        href="mailto:support@staycation.com"
                        className="hover:underline"
                      >
                        support@staycation.com
                      </Link>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <Link
                        href="mailto:info@staycation.com"
                        className="hover:underline"
                      >
                        info@staycation.com
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground text-sm">
                      <Link href="tel:+18001234567" className="hover:underline">
                        +1 (800) 123-4567
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Monday-Friday: 9am-6pm PT
                      <br />
                      Saturday: 10am-4pm PT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Connect With Us</h3>
                <div className="flex gap-4">
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground hover:text-foreground"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find quick answers to common questions. If you can't find what
            you're looking for, please don't hesitate to contact us.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">How do I cancel a booking?</h3>
              <p className="text-sm text-muted-foreground">
                You can cancel a booking from your account dashboard. Go to "My
                Trips," find the booking you want to cancel, and click "Cancel
                Booking." Refund policies vary by property.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">How do I become a host?</h3>
              <p className="text-sm text-muted-foreground">
                To become a host, create an account and click "Become a Host" in
                your dashboard. You'll need to provide details about your
                property, set pricing, and upload photos.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">
                How are payments processed?
              </h3>
              <p className="text-sm text-muted-foreground">
                We use secure payment processing through Stripe. Guests pay when
                booking, and hosts receive payment 24 hours after check-in,
                minus our service fee.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">
                What if there's an issue with my stay?
              </h3>
              <p className="text-sm text-muted-foreground">
                If you encounter any issues during your stay, please contact the
                host first. If the issue isn't resolved, our 24/7 customer
                support team is available to help.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            For more detailed information, please visit our{" "}
            <Link href="/help" className="text-primary hover:underline">
              Help Center
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
