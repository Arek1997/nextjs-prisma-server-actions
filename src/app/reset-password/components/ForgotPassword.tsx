"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { sendResetEmail } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import Response from "@/components/Response";

const ForgotPassword = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [state, formAction] = useFormState(sendResetEmail, {
    error: "",
    success: "",
  });

  return (
    <div className="space-y-4 text-left">
      <Button
        variant="ghost"
        disableAnimation
        onPress={() => setShowInputs((prevState) => !prevState)}
      >
        Forgot password
      </Button>

      <p className="text-xs font-bold underline">
        We will send you reset password email on provided email address
      </p>

      <AnimatePresence>
        {showInputs && (
          <motion.form
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Input
              type="email"
              name="email"
              label="Email"
              variant="underlined"
              isInvalid={Boolean(state?.error)}
              errorMessage={state?.error}
              autoFocus
              isRequired
            />
            {state?.success && <Response success>{state.success}</Response>}
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
      {pending ? "Sending" : "Send"}
    </Button>
  );
};

export default ForgotPassword;
