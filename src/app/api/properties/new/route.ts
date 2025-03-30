import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

export const POST = async (req: Request) => {
  try {
    const userID = (await cookies()).get("userID")?.value;
    if (!userID)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    // Save property data with image URLs
    const propertyRef = doc(collection(fstore, "property"));
    await setDoc(propertyRef, {
      ...data,
      owner: userID,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, propertyId: propertyRef.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
