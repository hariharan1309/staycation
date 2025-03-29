"use server";
import { cookies } from "next/headers";
import { auth, fstore } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; //
// Define types for better type safety
type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAge: number;
};
const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: REFRESH_TOKEN_MAX_AGE,
});

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
      // console.log(userCredential.user);
      const userDetail = await getDoc(
        doc(
          fstore,
          userType === "host" ? "owner" : "user",
          userCredential.user.uid
        )
      );
      const userValue = userDetail.data();
      // console.log(userValue);
      if (userValue) {
        (await cookies()).set(
          "userID",
          userCredential.user.uid,
          getCookieOptions()
        );
        return {
          success: true,
          message: `Welcome ${userValue.firstName}...`,
          user: JSON.parse(JSON.stringify(userValue)),
        };
      } else {
        return {
          success: false,
          message: `Login Failed.Account not found ...!`,
        };
      }
    }
    return {
      success: false,
      message: `Login Failed ...!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message.includes("invalid-credential")
        ? "Invalid Credentials"
        : "Login Failed",
      error: error.message || "Something went wrong during registration",
    };
  }
}
