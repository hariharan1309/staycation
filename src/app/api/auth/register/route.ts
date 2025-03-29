import { auth, fstore } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const { email, userType, password } = body;
    if (userType === "host") {
      // check if user is already a host
      const hostRef = collection(fstore, "owner"); // creating the reference
      const hosts = await getDocs(hostRef); // fetching the data
      hosts.forEach((doc) => {
        if (doc.data().email === email) {
          return new NextResponse(
            JSON.stringify({ error: "Owner already exists" })
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
      // create authentication for user
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // create a new host with setDoc instead of addDoc
      // because we want to use the user's uid as the document id
      await setDoc(doc(fstore, "owner", userAuth.user.uid), user);
      return new NextResponse(
        JSON.stringify({
          message: "Owner created successfully",
          ID: userAuth.user.uid,
          status: 201,
        })
      );
    } else {
      {
        // check if user is already a host
        const hostRef = collection(fstore, "user"); // creating the reference
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
        // create authentication for user
        const userAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // create a new host with setDoc instead of addDoc
        // because we want to use the user's uid as the document id
        await setDoc(doc(fstore, "user", userAuth.user.uid), user);
        return new NextResponse(
          JSON.stringify({
            message: "User created successfully",
            ID: userAuth.user.uid,
            status: 201,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong.." })
    );
  }
};
