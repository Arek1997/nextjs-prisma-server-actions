"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { editPost } from "../../actions";
import Response from "@/components/Response";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  postid: string;
  title: string;
  message: string;
};

const EditForm = ({ postid, title, message }: Props) => {
  const router = useRouter();
  const [state, formAction] = useFormState(editPost, {
    success: false,
    error: "",
    invalidElement: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push(`/posts/${postid}`);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-10 text-right">
      <Input
        type="text"
        name="title"
        label="TITLE"
        variant="underlined"
        defaultValue={title}
        isInvalid={state?.invalidElement === "title"}
        errorMessage={state?.invalidElement === "title" && state?.error}
        isRequired
      />
      <Textarea
        variant="underlined"
        name="message"
        label="Message"
        defaultValue={message}
        isInvalid={state?.invalidElement === "message"}
        errorMessage={state?.invalidElement === "message" && state?.error}
        isRequired
      />
      <input type="hidden" name="post-id" value={postid} />
      {state.invalidElement === "general" && (
        <Response error>{state.error}</Response>
      )}
      <SubmitForm />
    </form>
  );
};

const SubmitForm = () => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      color="primary"
      variant="flat"
      isLoading={status.pending}
    >
      {status.pending ? "Saving" : "Save"}
    </Button>
  );
};

export default EditForm;
