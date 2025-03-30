"use server";

import { cookies } from "next/headers";

export async function clearAuthCookie() {
  (await cookies()).set("userID", "", { expires: new Date(0) });
}
