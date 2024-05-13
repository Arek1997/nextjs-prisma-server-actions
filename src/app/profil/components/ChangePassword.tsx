import { useFormState } from "react-dom";
import InputWithEye from "@/components/InputWithEye";
import SubmitButton from "@/components/SubmitButton";
import { changePassword } from "../actions";

const ChangePassword = () => {
  const [state, formAction] = useFormState(changePassword, {
    error: "",
    invalidElement: "",
  });

  return (
    <div className="mx-auto mt-8 space-y-4 text-left">
      <p className="text-xs font-bold underline">
        After success password change, you will be logged out.
      </p>

      <form action={formAction}>
        <InputWithEye
          name="old-password"
          label="Current password"
          variant="underlined"
          isInvalid={state?.invalidElement === "old-password"}
          errorMessage={
            state?.invalidElement === "old-password" && state?.error
          }
          autoFocus
          isRequired
        />
        <InputWithEye
          name="new-password"
          label="New password"
          variant="underlined"
          isInvalid={state?.invalidElement === "new-password"}
          errorMessage={
            state?.invalidElement === "new-password" && state?.error
          }
          isRequired
        />

        <SubmitButton className="mt-4" text="Change" pendingText="Changing" />
      </form>
    </div>
  );
};

export default ChangePassword;
