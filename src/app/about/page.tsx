import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container px-4 py-8 md:px-6 md:py-12">
      <section className="mb-12 md:mb-20">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              About StayCation
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              We're on a mission to make travel more accessible, authentic, and
              memorable for everyone. Founded in 2023, StayCation connects
              travelers with unique accommodations around the world.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/properties">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-square">
            <Image
              src="/team.png?height=600&width=600"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-20">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Story</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            StayCation was born from a simple idea: travel should be personal,
            authentic, and accessible to everyone.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
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
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                2023: The Beginning
              </h3>
              <p className="text-muted-foreground">
                Our founders, avid travelers themselves, recognized a gap in the
                market for a platform that truly connected travelers with
                unique, local experiences.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
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
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">2024: Rapid Growth</h3>
              <p className="text-muted-foreground">
                Within our first year, we expanded to over 50 countries,
                partnering with thousands of property owners who shared our
                vision for authentic travel experiences.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Today: Our Mission</h3>
              <p className="text-muted-foreground">
                Today, we continue to innovate and expand, always staying true
                to our core mission: connecting travelers with authentic,
                memorable experiences around the world.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12 md:mb-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-square">
            <Image
              src="/value.png?height=600&width=600"
              alt="Our values"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Our Values
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We believe in real experiences and connections. Every
                    property on our platform offers something unique and
                    authentic.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Travel should be for everyone. We work to make unique
                    accommodations available at a range of price points.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-muted-foreground">
                    We foster a global community of travelers and hosts who
                    share experiences, stories, and a passion for exploration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to promoting sustainable travel practices
                    that respect local communities and the environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-20">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Our Team</h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
            Meet the passionate individuals behind StayCation who are dedicated
            to transforming the way people travel.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Sarah Johnson", role: "CEO & Co-Founder" },
            { name: "Michael Chen", role: "CTO & Co-Founder" },
            { name: "Emma Rodriguez", role: "Head of Operations" },
            { name: "David Kim", role: "Head of Marketing" },
            { name: "Olivia Smith", role: "Head of Customer Experience" },
            { name: "James Wilson", role: "Lead Developer" },
            { name: "Sophia Garcia", role: "Finance Director" },
            { name: "Robert Taylor", role: "Community Manager" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 aspect-square w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-muted p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Join Our Community
            </h2>
            <p className="mb-6 text-muted-foreground">
              Whether you're looking to book your next adventure or share your
              property with travelers from around the world, we invite you to
              join our growing community.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/auth/signup">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/host/signup">Become a Host</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <Image
              src="/join.png?height=400&width=400"
              alt="Join Us"
              fill
              sizes="200"
              className="object-cover h-32 w-32 rounded-lg  md:h-48 md:w-48"
            />
            {/* <Image
              src={}
              className="h-32 w-32 text-primary/20 md:h-48 md:w-48"
            /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
