import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const RegisterLayout = async ({ children }: PropsWithChildren) => {
  const hasSession = await auth();

  if (hasSession) {
    redirect("/profil");
  }

  return <>{children}</>;
};

export default RegisterLayout;
