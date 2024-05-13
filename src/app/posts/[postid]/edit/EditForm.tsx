"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/react";
import Response from "@/components/Response";
import SubmitButton from "@/components/SubmitButton";
import { editPost } from "../../actions";

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
      <SubmitButton
        color="primary"
        variant="flat"
        text="Save"
        pendingText="Saving"
      />
    </form>
  );
};

export default EditForm;
