import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import TextArea from "./TextArea";

type Props = {
  postID: string;
  commentID: string;
  value: string;
  onSave: (
    _: unknown,
    formData: FormData
  ) => Promise<{
    success: boolean;
    error: string;
    invalidElement: string | number;
  }>;
  onCancel: () => void;
};

const EditComment = ({ postID, commentID, value, onSave, onCancel }: Props) => {
  return (
    <>
      <TextArea serverAction={onSave} name="comment" defaultValue={value}>
        <input type="hidden" name="post-id" value={postID} />
        <input type="hidden" name="comment-id" value={commentID} />
        <div className="mr-2 mt-2 flex items-center justify-end gap-2">
          <Button type="button" radius="sm" size="sm" onPress={onCancel}>
            Cancel
          </Button>
          <SubmitButton onClick={onCancel} />
        </div>
      </TextArea>
    </>
  );
};

const SubmitButton = ({ onClick }: { onClick: () => void }) => {
  const { pending } = useFormStatus();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }

    if (!pending) {
      onClick();
    }
  }, [pending]);

  return (
    <Button
      type="submit"
      color="secondary"
      radius="sm"
      size="sm"
      isLoading={pending}
    >
      Save
    </Button>
  );
};

export default EditComment;
