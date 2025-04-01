// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";
// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // app password, not your regular Gmail password
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const bookingRef = await addDoc(collection(fstore, "bookings"), {
      ...body,
      createdAt: serverTimestamp(),
      checkIn: body.checkIn.toString(),
      checkOut: body.checkOut.toString(),
    });

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `hariharana1309@gmail.com`,
      subject: "Booking Confirmation",
      html: `
        <h1>Booking Confirmation</h1>
        <p>Thank you for your booking!</p>
        <p><strong>Booking ID:</strong> ${bookingRef.id}</p>
        <p><strong>Check-in Date:</strong> ${body.checkIn}</p>
        <p><strong>Check-out Date:</strong> ${body.checkOut}</p>
        <p>We look forward to welcoming you soon!</p>
      `,
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
