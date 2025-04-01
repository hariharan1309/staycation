"use server";

import { cookies } from "next/headers";

export const getCookieVal = async () => {
  const cookie = (await cookies()).get("userID");
  return cookie;
};

export const setCookieVal = async (value: string) => {
  (await cookies()).set("userID", value);
}