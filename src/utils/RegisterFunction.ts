import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, fstore } from "@/lib/firebase"; // Your client-side Firebase config

type UserType = "host" | "guest";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agreeTerms: boolean;
  receiveUpdates: boolean;
}

export async function registerUser(
  userData: UserData,
  userType: UserType
): Promise<{
  success: boolean;
  message: string;
  userId?: string;
  error?: string;
}> {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      agreeTerms,
      receiveUpdates,
    } = userData;

    // Determine the collection based on user type
    const collectionName = userType === "host" ? "owner" : "user";

    // Check if user already exists
    const userQuery = query(
      collection(fstore, collectionName),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: `${userType === "host" ? "Owner" : "User"} already exists`,
        error: `${
          userType === "host" ? "Owner" : "User"
        } with this email already exists`,
      };
    }

    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store additional user data in Firestore
    const userDocData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      agreeTerms,
      receiveUpdates,
      createdAt: new Date(),
      userId: userCredential.user.uid,
    };

    await setDoc(
      doc(fstore, collectionName, userCredential.user.uid),
      userDocData
    );

    return {
      success: true,
      message: `${userType === "host" ? "Owner" : "User"} created successfully`,
      userId: userCredential.user.uid,
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed",
      error: error.message || "Something went wrong during registration",
    };
  }
}
