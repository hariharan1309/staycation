import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function LoginFunction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      console.log(userCredential.user);
    }
  } catch (error) {
    console.error(error);
  }
}
