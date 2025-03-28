import { fstore } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const { email, userType } = body;
    if (userType === "host") {
      // check if user is already a host
      const hostRef = collection(fstore, "hosts"); // creating the reference
      const hosts = await getDocs(hostRef); // fetching the data
      hosts.forEach((doc) => {
        if (doc.data().email === email) {
          return new NextResponse(
            JSON.stringify({ error: "User already exists" })
          );
        }
      });
      const user = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
        agreeTerms: body.agreeTerms,
        receiveUpdates: body.receiveUpdates,
      };
      // create a new host
      await addDoc(collection(fstore, "owner"), user);
    }

    return new NextResponse(JSON.stringify({ message: "User created" }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong.." })
    );
  }
};
