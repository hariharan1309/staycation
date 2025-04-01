// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const body = await req.json();
    const {
      propertyId,
      propertyTitle,
      nights,
      guests,
      totalAmount,
      guestId,
      checkIn,
      checkOut,
      ownerId,
    } = body;

    // console.log(`${origin}/success?session_id={CHECKOUT_SESSION_ID}`);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking for ${propertyTitle}`,
              description: `${nights} night stay for ${guests} guests`,
            },
            unit_amount: Math.round(totalAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/properties/${propertyId}?canceled=true`,
      metadata: {
        propertyId,
        nights,
        guests,
        totalAmount: totalAmount.toString(),
        guestId,
        ownerId,
        checkIn: checkIn.toString(),
        checkOut: checkOut.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
