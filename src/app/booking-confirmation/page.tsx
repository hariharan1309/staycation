// app/booking-confirmation/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fstore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bookingId = searchParams.get("id");

  useEffect(() => {
    async function getBookingDetails() {
      if (!bookingId) return;

      try {
        const bookingDoc = await getDoc(doc(fstore, "bookings", bookingId));
        if (bookingDoc.exists()) {
          setBooking({ id: bookingDoc?.id, ...bookingDoc.data() });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="container py-12 text-center">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return <div className="container py-12 text-center">Booking not found</div>;
  }

  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Booking Reserved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Your booking has been reserved. Payment is pending.</p>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{booking.nights} nights</span>
            </div>

            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>{booking.guests} guests</span>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => router.push("/properties")}
                className="w-full"
              >
                Browse More Properties
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
