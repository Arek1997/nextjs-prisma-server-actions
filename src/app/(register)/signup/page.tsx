"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { createAccount } from "./actions";
import InputWithEye from "@/components/InputWithEye";
import ForgotPassword from "../components/ForgotPassword";
import SubmitButton from "@/components/SubmitButton";

const Signup = () => {
  const [state, formAction] = useFormState(createAccount, {
    error: "",
    invalidElement: "",
  });

  return (
    <div className="mx-auto mt-20 max-w-[500px] rounded-xl p-5 md:p-14">
      <h1 className="mb-8">Create a new account</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <Input
            label="User Name"
            name="name"
            isInvalid={state?.invalidElement === "name"}
            errorMessage={state?.invalidElement === "name" && state?.error}
            isRequired
          />
        </div>
        <div>
          <Input
            label="Email"
            name="email"
            isInvalid={state?.invalidElement === "email"}
            errorMessage={state?.invalidElement === "email" && state?.error}
            isRequired
          />
        </div>
        <div>
          <InputWithEye
            label="Password"
            name="password"
            isInvalid={state?.invalidElement === "password"}
            errorMessage={state?.invalidElement === "password" && state?.error}
            isRequired
          />
        </div>
        <div>
          <InputWithEye
            label="Repeat Password"
            name="repeatPassword"
            isInvalid={state?.invalidElement === "repeatPassword"}
            errorMessage={
              state?.invalidElement === "repeatPassword" && state?.error
            }
            isRequired
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            Have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
            <ForgotPassword />
          </p>

          <SubmitButton
            color="secondary"
            className="ml-auto flex"
            text="Create"
            pendingText="Creating"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
