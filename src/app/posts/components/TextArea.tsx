import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { TextAreaProps, Textarea } from "@nextui-org/react";

type Props = {
  serverAction: (
    _: unknown,
    formData: FormData
  ) => Promise<{
    success: boolean;
    error: string;
    invalidElement: string | number;
  }>;
  children: React.ReactNode;
} & TextAreaProps;

const TextArea = ({ serverAction, children, ...props }: Props) => {
  const [state, formAction] = useFormState(serverAction, {
    success: false,
    error: "",
    invalidElement: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <Textarea
        autoFocus
        variant="bordered"
        radius="sm"
        isInvalid={Boolean(state.error)}
        errorMessage={state.error}
        {...props}
      />

      {children}
    </form>
  );
};

export default TextArea;
