import { fstore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    if (type === "host") {
      const data = await getDoc(doc(fstore, "owner", id!));
      const ownerDetails = data.data();
      return new NextResponse(
        JSON.stringify({
          message: "Retrieved Successfully",
          data: ownerDetails,
        })
      );
    } else {
      const data = await getDoc(doc(fstore, "user", id!));
      const userDetails = data.data();
      return new NextResponse(
        JSON.stringify({
          message: "Retrieved Successfully",
          data: userDetails,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Error" }));
  }
};
