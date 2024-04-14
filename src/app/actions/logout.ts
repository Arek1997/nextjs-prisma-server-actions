"use server";

import Session from "@/services/session";
import { redirect } from "next/navigation";

export const logOutHandler = () => {
  Session().destroy();
  redirect("/login");
};
