import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const PUT = async (req: Request, context: any) => {
  try {
    const { id } = await context.params;
    const data = await req.json();
    // Save property data with image URLs
    const propertyRef = doc(fstore, "property", id);
    await updateDoc(propertyRef, data);

    return NextResponse.json(
      { success: true, message: " Updated Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
