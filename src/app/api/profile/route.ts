import { fstore } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
export const PUT = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const body = await req.json();
    const id = searchParams.get("id");
    console.log(type, id);
    if (type === "host") {
      const docRef = doc(fstore, "owner", id!);
      const data = await getDoc(docRef);
      const ownerDetails = data.data();
      const updatedDetails = { ...ownerDetails, ...body };
      console.log(updatedDetails);
      await updateDoc(docRef, updatedDetails);
      return new NextResponse(
        JSON.stringify({
          message: "Retrieved Successfully",
          data: ownerDetails,
        })
      );
    } else {
      const docRef = doc(fstore, "user", id!);
      const data = await getDoc(docRef);
      const userDetails = data.data();
      const updatedDetails = { ...userDetails, ...body };
      console.log(updatedDetails);
      await updateDoc(docRef, updatedDetails);

      return new NextResponse(
        JSON.stringify({
          message: "Retrieved Successfully",
          data: updatedDetails,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Error" }));
  }
};
