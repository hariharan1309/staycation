import { NextResponse } from "next/server";
import { fstore } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const DELETE = async (req: Request, context: any) => {
  try {
    const { id } = await context.params;
    const propertyRef = doc(fstore, "property", id);
    await deleteDoc(propertyRef);

    return NextResponse.json({
      success: true,
      message: " Deleted Successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
