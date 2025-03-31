// app/api/verify-payment/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { fstore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!stripeSession || stripeSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Extract details from metadata
    const {
      propertyId,
      nights,
      guests,
      totalAmount,
      guestId,
      checkIn,
      checkOut,
      ownerId,
    } = stripeSession.metadata || {};

    // Create a booking in Firebase with completed payment status
    const bookingRef = await addDoc(collection(fstore, "bookings"), {
      propertyId,
      nights: parseInt(nights || "1"),
      guests: parseInt(guests || "1"),
      totalAmount: parseFloat(totalAmount || "0"),
      stripeSessionId: sessionId,
      paymentStatus: "completed",
      guestId,
      checkIn: checkIn.toString(),
      checkOut: checkOut.toString(),
      ownerId,
      paidAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      bookingId: bookingRef.id,
      paymentDetails: {
        amount: stripeSession.amount_total! / 100,
        currency: stripeSession.currency,
        paymentStatus: stripeSession.payment_status,
      },
    });
  } catch (err: any) {
    console.error("Error verifying payment:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
