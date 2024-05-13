import { useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/react";
import SubmitButton from "@/components/SubmitButton";
import { deleteProfile } from "../actions";

type Props = {
  userEmail: string;
};

const DeleteProfile = ({ userEmail }: Props) => {
  const [emailInput, setEmailInput] = useState("");
  const [state, formAction] = useFormState(deleteProfile, {
    error: "",
    invalidElement: "",
  });

  const isCorrect = emailInput === userEmail;

  return (
    <div className="mx-auto mt-8 space-y-4 text-left">
      <p className="">
        Type your email address: <b>{userEmail}</b> to confirm profile deletion.
        <span className="font-bold text-danger">
          {" "}
          This operation is irreversible.
        </span>
      </p>

      <form action={formAction}>
        <Input
          type="email"
          name="email"
          label="Email address"
          variant="underlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          isInvalid={state?.invalidElement === "old-password"}
          errorMessage={
            state?.invalidElement === "old-password" && state?.error
          }
          autoFocus
          isRequired
        />

        <SubmitButton
          className="mt-4"
          color="danger"
          text="Delete"
          pendingText="Deleting"
          isDisabled={!isCorrect}
        />
      </form>
    </div>
  );
};

export default DeleteProfile;
