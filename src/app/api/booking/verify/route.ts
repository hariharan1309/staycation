// app/api/verify-payment/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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

    // Format dates for better readability
    const checkInDate = new Date(checkIn).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const checkOutDate = new Date(checkOut).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Get user and owner details
    const userDetails = (await getDoc(doc(fstore, "user", guestId))).data();

    const ownerDetails = (await getDoc(doc(fstore, "owner", ownerId))).data();

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

    // Company info
    const companyName = "Staycation";
    const companyAddress = "India";
    const companyPhone = "+91 123 456 7890";
    const companyWebsite = "www.staycation.com";
    // Send confirmation email to the guest
    await transporter.sendMail({
      from: `"${companyName}" <${process.env.GMAIL_USER}>`,
      to: userDetails?.email,
      cc: "hariharana1309@gmail.com",
      subject: `🏠 Your Staycation Booking is Confirmed! #${bookingRef.id.slice(
        0,
        8
      )}`,
      text: `Thank you for your booking! Your confirmation number is ${bookingRef.id}. You're scheduled to check in on ${checkInDate} and check out on ${checkOutDate}.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px; background-color: #4CAF50; padding: 15px; border-radius: 5px;">
            <h1 style="color: white; margin: 0;">Staycation</h1>
          </div>
          
          <div style="background-color: #f8f8f8; border-radius: 5px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <h2 style="color: #4CAF50; margin-top: 0;">Your Booking is Confirmed!</h2>
            <p>Dear ${userDetails?.firstName || name || "Guest"},</p>
            <p>Thank you for choosing Staycation! We're excited to confirm your upcoming stay.</p>
            
            <div style="background-color: white; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Reservation Details</h3>
              <p><strong>Confirmation Number:</strong> ${bookingRef.id}</p>
              <p><strong>Check-in:</strong> ${checkInDate}</p>
              <p><strong>Check-out:</strong> ${checkOutDate} </p>
              ${guests ? `<p><strong>Guests:</strong> ${guests}</p>` : ""}
              ${
                totalAmount
                  ? `<p><strong>Total Amount:</strong> $ ${totalAmount}</p>`
                  : ""
              }
            </div>
            
            <!-- Payment Details Section -->
            <div style="background-color: #f1f8e9; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid #8bc34a;">
              <h3 style="margin-top: 0; color: #33691e; border-bottom: 1px solid #dcedc8; padding-bottom: 10px;">Payment Confirmation</h3>
              <p><strong>Payment Status:</strong> <span style="color: #4CAF50; background-color: #e8f5e9; padding: 3px 8px; border-radius: 3px; font-weight: bold;">Successful</span></p>
              <p><strong>Transaction ID:</strong> ${
                stripeSession.payment_intent
              }</p>
              <p><strong>Payment Method:</strong> ${
                stripeSession.payment_method_types?.[0]?.toUpperCase() || "Card"
              }</p>
              <p><strong>Date of Payment:</strong> ${new Date().toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}</p>
              <div style="background-color: white; border-radius: 3px; padding: 10px; margin-top: 10px; border: 1px dashed #dcedc8;">
                <p style="margin: 0; font-size: 14px;"><strong>Amount Breakdown:</strong></p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #f0f0f0;">
                    <td style="padding: 5px 0;">Accommodation (${nights} nights)</td>
                    <td style="text-align: right; padding: 5px 0;">$${
                      parseFloat(totalAmount) - parseFloat(totalAmount) * 0.1
                    }</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f0f0f0;">
                    <td style="padding: 5px 0;">Service Fee</td>
                    <td style="text-align: right; padding: 5px 0;">$${
                      parseFloat(totalAmount) * 0.1
                    }</td>
                  </tr>
                  <tr style="font-weight: bold;">
                    <td style="padding: 5px 0;">Total Paid</td>
                    <td style="text-align: right; padding: 5px 0;">$${totalAmount}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div style="background-color: white; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Contact Details</h3>
              <p><strong>Host:</strong> ${
                ownerDetails?.firstName || "Your host"
              } ${ownerDetails?.lastName || ""}</p>
              <p><strong>Contact:</strong> ${
                ownerDetails?.phoneNumber || "Contact your host through the app"
              }</p>
            </div>
            
            <div style="background-color: #fffaf0; border-radius: 5px; padding: 15px; margin: 20px 0; border-left: 4px solid #FFA500;">
              <h3 style="margin-top: 0; color: #FFA500;">Important Information</h3>
              <ul style="padding-left: 20px;">
                <li>Check-in time: After 3:00 PM</li>
                <li>Check-out time: Before 11:00 AM</li>
                <li>Photo ID will be required at check-in</li>
              </ul>
            </div>
            
            <p>If you need to modify your reservation or have any questions, please contact your host or our support team at ${companyPhone}.</p>
            
            <p>We hope you have a wonderful stay!</p>
            
            <p>Best regards,<br>
            The Staycation Team</p>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px;">
            <p>${companyName}<br>
            ${companyAddress}<br>
            ${companyPhone}<br>
            <a href="https://${companyWebsite}" style="color: #4CAF50;">${companyWebsite}</a></p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      headers: {
        "X-Entity-Ref-ID": bookingRef.id,
        "List-Unsubscribe": `<mailto:unsubscribe@${companyWebsite}?subject=unsubscribe>`,
        Precedence: "bulk",
        "MIME-Version": "1.0",
      },
    });

    // Send notification email to the owner
    await transporter.sendMail({
      from: `"${companyName}" <${process.env.GMAIL_USER}>`,
      to: ownerDetails?.email || "hariharana1309@gmail.com",
      cc: "hariharana1309@gmail.com",
      subject: `🏠 New Booking Alert! #${bookingRef.id.slice(0, 8)}`,
      text: `You have a new booking! Booking ID: ${bookingRef.id}. Guest will check in on ${checkInDate} and check out on ${checkOutDate}.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Notification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px; background-color: #4CAF50; padding: 15px; border-radius: 5px;">
            <h1 style="color: white; margin: 0;">Staycation</h1>
          </div>
          
          <div style="background-color: #f8f8f8; border-radius: 5px; padding: 25px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <h2 style="color: #4CAF50; margin-top: 0;">New Booking Alert!</h2>
            <p>Dear ${ownerDetails?.firstName || "Property Owner"},</p>
            <p>Great news! You have a new booking for your property.</p>
            
            <div style="background-color: white; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Booking Details</h3>
              <p><strong>Booking ID:</strong> ${bookingRef.id}</p>
              <p><strong>Check-in:</strong> ${checkInDate}</p>
              <p><strong>Check-out:</strong> ${checkOutDate}</p>
              ${
                guests
                  ? `<p><strong>Number of Guests:</strong> ${guests}</p>`
                  : ""
              }
              ${
                totalAmount
                  ? `<p><strong>Total Amount:</strong> $${totalAmount}</p>`
                  : ""
              }
            </div>
            
            <!-- Payment Details Section -->
            <div style="background-color: #e8f5e9; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-left: 4px solid #4CAF50;">
              <h3 style="margin-top: 0; color: #2e7d32; border-bottom: 1px solid #c8e6c9; padding-bottom: 10px;">Payment Information</h3>
              <p><strong>Payment Status:</strong> <span style="color: #4CAF50; background-color: #e8f5e9; padding: 3px 8px; border-radius: 3px; font-weight: bold;">Completed</span></p>
              <p><strong>Transaction ID:</strong> ${
                stripeSession.payment_intent
              }</p>
              <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background-color: white; border-radius: 3px; padding: 5px;">
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 8px;">Accommodation</td>
                  <td style="text-align: right; padding: 8px;">$${
                    parseFloat(totalAmount) - parseFloat(totalAmount) * 0.1
                  }</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 8px;">Service Fee</td>
                  <td style="text-align: right; padding: 8px;">$${
                    parseFloat(totalAmount) * 0.1
                  }</td>
                </tr>
                <tr style="font-weight: bold; background-color: #fafafa;">
                  <td style="padding: 8px;">Total</td>
                  <td style="text-align: right; padding: 8px;">$${totalAmount}</td>
                </tr>
              </table>
              <p style="font-size: 13px; color: #666; margin-top: 10px;">Payout will be processed according to your payment schedule.</p>
            </div>
            
            <div style="background-color: white; border-radius: 5px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Guest Information</h3>
              <p><strong>Name:</strong> ${
                userDetails?.firstName || name || ""
              } ${userDetails?.lastName || ""}</p>
              <p><strong>Email:</strong> ${userDetails?.email || ""}</p>
              <p><strong>Phone:</strong> ${userDetails?.phoneNumber || ""}</p>
            </div>
            
            <p>Please ensure your property is ready for the guest's arrival. You can contact the guest directly if you need to communicate any specific instructions.</p>
            
            <div style="background-color: #e6f7ff; border-radius: 5px; padding: 15px; margin: 20px 0; border-left: 4px solid #1890ff;">
              <h3 style="margin-top: 0; color: #1890ff;">Next Steps</h3>
              <ol style="padding-left: 20px;">
                <li>Review the booking details</li>
                <li>Prepare your property for the guest's arrival</li>
                <li>Contact the guest if you need any additional information</li>
                <li>Ensure a smooth check-in process</li>
              </ol>
            </div>
            
            <p>Thank you for being a valued host on Staycation!</p>
            
            <p>Best regards,<br>
            The Staycation Team</p>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px;">
            <p>${companyName}<br>
            ${companyAddress}<br>
            ${companyPhone}<br>
            <a href="https://${companyWebsite}" style="color: #4CAF50;">${companyWebsite}</a></p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      headers: {
        "X-Entity-Ref-ID": bookingRef.id,
        "List-Unsubscribe": `<mailto:unsubscribe@${companyWebsite}?subject=unsubscribe>`,
        Precedence: "bulk",
        "MIME-Version": "1.0",
      },
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
