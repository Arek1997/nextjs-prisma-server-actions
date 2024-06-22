import { Button } from "@nextui-org/react";
import { addComment } from "../actions";
import TextArea from "./TextArea";
import { useFormStatus } from "react-dom";

type Props = {
  userId: string;
  postId: string;
};

const AddComment = ({ userId, postId }: Props) => {
  return (
    <TextArea
      serverAction={addComment}
      name="comment"
      placeholder="Enter your comment"
    >
      <input type="hidden" name="post-id" value={postId} />
      <input type="hidden" name="user-id" value={userId} />
      <SubmitButton />
    </TextArea>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      color="secondary"
      radius="sm"
      className="mt-2"
      isLoading={pending}
    >
      Add
    </Button>
  );
};

export default AddComment;
