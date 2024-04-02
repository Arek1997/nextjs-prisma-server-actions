import Session from "@/services/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  Session().destroy();
  redirect("/login");
  // return NextResponse.redirect(new URL("/login", request.url));
}
