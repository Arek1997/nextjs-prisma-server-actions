import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Button, Textarea } from "@nextui-org/react";
import { addComment } from "../actions";

type Props = {
  userId: string;
  postId: string;
};

const AddComment = ({ userId, postId }: Props) => {
  const router = useRouter();
  const [state, formAction] = useFormState(addComment, {
    success: false,
    error: "",
    invalidElement: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <Textarea
        variant="faded"
        radius="sm"
        name="comment"
        placeholder="Enter your comment"
        isInvalid={Boolean(state.error)}
        errorMessage={state.error}
      />
      <input type="hidden" name="post-id" value={postId} />
      <input type="hidden" name="user-id" value={userId} />
      <Button type="submit" color="secondary" radius="sm" className="mt-2">
        Add
      </Button>
    </form>
  );
};

export default AddComment;
