"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { userLogin } from "./actions";
import InputWithEye from "@/components/InputWithEye";

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
          <p className="text-sm text-red-400">{state?.error}</p>
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
          </p>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="secondary"
      type="submit"
      className="ml-auto flex"
      isLoading={pending}
      isDisabled={pending}
    >
      Login
    </Button>
  );
};

export default Login;
