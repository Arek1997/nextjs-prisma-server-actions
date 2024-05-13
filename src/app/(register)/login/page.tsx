"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { userLogin } from "./actions";
import InputWithEye from "@/components/InputWithEye";
import ForgotPassword from "../components/ForgotPassword";
import Response from "@/components/Response";
import SubmitButton from "@/components/SubmitButton";

const Login = () => {
  const [state, formAction] = useFormState(userLogin, {
    error: "",
    invalidElement: "",
  });

  return (
    <div className="mx-auto mt-20 max-w-[500px] rounded-xl p-5 md:p-14">
      <h1 className="mb-8">Login</h1>

      <form action={formAction} className="space-y-4">
        {state?.invalidElement === "response" && (
          <Response error>{state?.error}</Response>
        )}
        <div>
          <Input
            label="Email"
            name="email"
            defaultValue="janek@email.pl"
            isInvalid={state?.invalidElement === "email"}
            errorMessage={state?.invalidElement === "email" && state?.error}
            isRequired
          />
        </div>
        <div>
          <InputWithEye
            label="Password"
            name="password"
            defaultValue="11111111"
            isInvalid={state?.invalidElement === "password"}
            errorMessage={state?.invalidElement === "password" && state?.error}
            isRequired
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            Have not an account?{" "}
            <Link href="/signup" className="underline">
              Signup
            </Link>
            <ForgotPassword />
          </p>

          <SubmitButton color="primary" text="Login" className="ml-auto flex" />
        </div>
      </form>
    </div>
  );
};

export default Login;
