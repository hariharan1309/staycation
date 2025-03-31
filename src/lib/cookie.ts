"use server";

import { cookies } from "next/headers";

export const getCookieVal = async () => {
  const cookie = (await cookies()).get("userID");
  return cookie;
};
