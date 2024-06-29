"use server";

import { signOut } from "@/auth";

export const logOutHandler = async () => {
  await signOut({
    redirectTo: "/login",
  });
};
