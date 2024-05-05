"use client";

import { PropsWithChildren, useEffect } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import { useFormState } from "react-dom";
import { addComment } from "../actions";
import { useRouter } from "next/navigation";

type CommentsWithUser = Prisma.commentsGetPayload<{
  include: {
    user: true;
  };
}>;

type Props = {
  userId: string;
  postId: string;
  comments: CommentsWithUser[];
};

const Comments = ({ userId, postId, comments }: Props) => {
  const router = useRouter();
  const [state, formAction] = useFormState(addComment, {
    success: false,
    error: "",
    invalidElement: "",
  });

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state]);

  return (
    <div className="mt-14 border-t pt-5 text-right">
      <h2 className="mb-4 text-left">Comments ({comments.length})</h2>

      {comments.map((item) => {
        return (
          <Comment key={item.id} {...item}>
            {item.message}
          </Comment>
        );
      })}

      <form action={formAction}>
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
    </div>
  );
};

const Comment = ({
  createdAt,
  user,
  children,
}: CommentsWithUser & PropsWithChildren) => {
  return (
    <div className="mb-6 rounded-lg border p-4 text-left">
      <div className="mb-2 flex items-center justify-start gap-4 text-xs">
        <span>{user.name}</span>
        <time
          className="underline"
          dateTime={new Date(createdAt).toLocaleDateString()}
        >
          {new Date(createdAt).toDateString()}
        </time>
      </div>

      <p>{children}</p>
    </div>
  );
};

export default Comments;
