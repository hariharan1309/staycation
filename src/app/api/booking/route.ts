// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import nodemailer from "nodemailer";

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
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

    // Format dates for better readability
    const checkInDate = new Date(body.checkIn).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const checkOutDate = new Date(body.checkOut).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    // Company info for legitimacy
    const companyName = "Staycation";
    const companyAddress = "India";
    const companyPhone = "+91 123 456 7890";
    const companyWebsite = "www.staycation.com";

    // Send confirmation email with improved template
    await transporter.sendMail({
      from: `"${companyName}" <${process.env.GMAIL_USER}>`,
      to: body.email,
      cc: "hariharana1309@gmail.com", // Send a copy to your email
      subject: `Booking Confirmation #${bookingRef.id.slice(0, 8)}`,
      text: `Thank you for your booking! Your confirmation number is ${bookingRef.id}. You're scheduled to check in on ${checkInDate} and check out on ${checkOutDate}.`, // Plain text alternative
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${
              process.env.LOGO_URL || "https://yourwebsite.com/logo.png"
            }" alt="${companyName}" style="max-width: 150px; height: auto;">
          </div>
          
          <div style="background-color: #f8f8f8; border-radius: 5px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <h2 style="color: #4CAF50; margin-top: 0;">Booking Confirmed!</h2>
            <p>Dear ${body.name || "Guest"},</p>
            <p>Thank you for choosing ${companyName}. We're delighted to confirm your upcoming stay with us.</p>
            
            <div style="background-color: white; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Reservation Details</h3>
              <p><strong>Confirmation Number:</strong> ${bookingRef.id}</p>
              <p><strong>Check-in:</strong> ${checkInDate} (after 3:00 PM)</p>
              <p><strong>Check-out:</strong> ${checkOutDate} (before 11:00 AM)</p>
              ${
                body.guests
                  ? `<p><strong>Guests:</strong> ${body.guests}</p>`
                  : ""
              }
              ${
                body.roomType
                  ? `<p><strong>Room Type:</strong> ${body.roomType}</p>`
                  : ""
              }
            </div>
            
            <h3>What's Next?</h3>
            <p>No further action is required. Simply present your confirmation number upon arrival.</p>
            
            <div style="background-color: #fffaf0; border-radius: 5px; padding: 15px; margin: 20px 0; border-left: 4px solid #FFA500;">
              <h3 style="margin-top: 0; color: #FFA500;">Important Information</h3>
              <ul style="padding-left: 20px;">
                <li>Check-in time: After 3:00 PM</li>
                <li>Check-out time: Before 11:00 AM</li>
                <li>Photo ID will be required at check-in</li>
                ${
                  body.specialInstructions
                    ? `<li>Special instructions: ${body.specialInstructions}</li>`
                    : ""
                }
              </ul>
            </div>
            
            <p>If you have any questions or need to modify your reservation, please contact us at ${companyPhone}.</p>
            
            <p>We look forward to welcoming you soon!</p>
            
            <p>Best regards,<br>
            The ${companyName} Team</p>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px;">
            <p>${companyName}<br>
            ${companyAddress}<br>
            ${companyPhone}<br>
            <a href="https://${companyWebsite}" style="color: #4CAF50;">${companyWebsite}</a></p>
            <p>This email was sent to confirm your booking. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      headers: {
        "X-Entity-Ref-ID": bookingRef.id, // Helps prevent the email from being marked as spam
        "List-Unsubscribe": `<mailto:unsubscribe@${companyWebsite}?subject=unsubscribe>`, // Improves deliverability
      },
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
