import { fstore } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: { params: any }) => {
  try {
    const { propertyId } =await context.params;
    const bookingRef = collection(fstore, "bookings");
    const q = query(bookingRef, where("propertyId", "==", propertyId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({
          message: "Not Found...",
          status: 404,
          booking: [],
        })
      );
    }

    const properties = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return new NextResponse(
      JSON.stringify({
        booking: properties,
        message: "Retrieved Successfully",
        status: 200,
      })
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: "Error retrieving data",
        status: 500,
        error: error.message,
      })
    );
  }
};
