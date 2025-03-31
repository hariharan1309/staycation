// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase"; // Adjust import based on your Firebase setup
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Add booking to Firebase
    const bookingRef = await addDoc(collection(fstore, "bookings"), {
      ...body,
      createdAt: serverTimestamp(),
      // Convert JS dates to strings for Firestore
      checkIn: body.checkIn.toString(),
      checkOut: body.checkOut.toString(),
    });

    return NextResponse.json({
      success: true,
      bookingId: bookingRef.id,
    });
  } catch (err: any) {
    console.error("Error creating booking:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
