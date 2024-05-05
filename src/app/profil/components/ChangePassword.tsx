import { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import InputWithEye from "@/components/InputWithEye";
import { changePassword } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

const ChangePassword = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [state, formAction] = useFormState(changePassword, {
    error: "",
    invalidElement: "",
  });

  return (
    <div className="mx-auto mt-4 space-y-4 text-left">
      <Button
        variant="ghost"
        disableAnimation
        onPress={() => setShowInputs((prevState) => !prevState)}
      >
        Change password
      </Button>

      <p className="text-xs font-bold underline">
        After success password change, you will be logged out.
      </p>

      <AnimatePresence>
        {showInputs && (
          <motion.form
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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

            <SubmitButton />
          </motion.form>
        )}
      </AnimatePresence>
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
      {pending ? "Changing" : "Change"}
    </Button>
  );
};

export default ChangePassword;
