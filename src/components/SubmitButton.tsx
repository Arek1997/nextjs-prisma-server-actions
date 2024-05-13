"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  pendingText?: string;
} & ButtonProps;

const SubmitButton = ({ text, pendingText, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      className={className}
      isLoading={pending}
      isDisabled={pending}
      {...props}
    >
      {pending ? pendingText || text : text}
    </Button>
  );
};

export default SubmitButton;
