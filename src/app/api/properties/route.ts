import { fstore } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const propertyRef = collection(fstore, "property");
    const querySnapshot = await getDocs(propertyRef);

    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({
          message: "Not Found...",
          status: 404,
          property: [],
        })
      );
    }

    const properties = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return new NextResponse(
      JSON.stringify({
        property: properties,
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
