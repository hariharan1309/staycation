// app/booking-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function getSessionDetails() {
      if (!sessionId) return;

      try {
        const response = await fetch(
          `/api/booking/verify?session_id=${sessionId}`
        );
        if (!response.ok) throw new Error("Payment verification failed");

        const data = await response.json();
        setBookingDetails(data.paymentDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          {bookingDetails && (
            <div className="space-y-4">
              <p>
                Your booking has been successfully confirmed and payment has
                been processed.
              </p>

              <div className="pt-4">
                <Button
                  onClick={() => router.push("/properties")}
                  className="w-full"
                >
                  Browse More Properties
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
