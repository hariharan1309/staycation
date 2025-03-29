import { auth, fstore } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, query } from "firebase/firestore";

export default async function LoginFunction({
  email,
  password,
  userType,
}: {
  email: string;
  password: string;
  userType: "host" | "guest";
}) {
  console.log(userType);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      console.log(userCredential.user);
      const userDetail = await getDoc(
        doc(
          fstore,
          userType === "host" ? "owner" : "user",
          userCredential.user.uid
        )
      );
      const userValue = userDetail.data();
      console.log(userValue);
      if (userValue) {
        return {
          success: true,
          message: "Login successful",
          user: userValue,
        };
      } else {
        return {
          success: false,
          message: `Login failed Account not found`,
        };
      }
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: "Registration failed",
      error: error.message || "Something went wrong during registration",
    };
  }
}
