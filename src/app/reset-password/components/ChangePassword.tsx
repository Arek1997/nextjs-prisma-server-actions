"use client";

import { Button } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { resetPassword } from "../actions";
import InputWithEye from "@/components/InputWithEye";
import Response from "@/components/Response";

type Props = {
  token: string;
};

const ChangePassword = ({ token }: Props) => {
  const [state, formAction] = useFormState(resetPassword, {
    error: "",
    success: "",
  });

  return (
    <div className="mx-auto mt-4 max-w-[300px] space-y-4 text-left">
      <h1 className="font-bold">Reset password</h1>
      <form action={formAction}>
        <InputWithEye
          label="New password"
          name="new-password"
          variant="underlined"
          isInvalid={Boolean(state.error)}
          errorMessage={state.error}
          autoFocus
          isRequired
        />

        <input type="hidden" name="token" value={token} />
        {state.success && <Response success>{state.success}</Response>}
        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4"
      variant="ghost"
      isLoading={pending}
      isDisabled={pending}
    >
      {pending ? "Processing" : "Set"}
    </Button>
  );
};

export default ChangePassword;
