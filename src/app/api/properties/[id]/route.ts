import { fstore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: { params: any }) => {
  try {
    const { id } = await context.params;
    const data = await getDoc(doc(fstore, "property", id));
    if (!data.exists()) {
      return new NextResponse(
        JSON.stringify({
          message: "Not Found...",
          status: 404,
        })
      );
    }
    const propertyData = { id: id, ...data.data() };
    return new NextResponse(
      JSON.stringify({
        property: propertyData,
        message: "Retrieved Successfully",
        status: 200,
      })
    );
  } catch (error) {
    new NextResponse(
      JSON.stringify({
        message: "Retrieved Successfully",
        status: 500,
      })
    );
  }
};
