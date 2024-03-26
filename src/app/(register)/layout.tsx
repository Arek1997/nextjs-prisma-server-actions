import Session from "@/services/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const RegisterLayout = ({ children }: PropsWithChildren) => {
  const hasSession = Session().get();

  if (hasSession) {
    redirect("/");
  }

  return <>{children}</>;
};

export default RegisterLayout;
