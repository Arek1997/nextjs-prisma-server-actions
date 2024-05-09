"use client";

import { Prisma } from "@prisma/client";
import Comment from "./Comment";
import AddComment from "./AddComment";

export type CommentsWithUser = Prisma.commentsGetPayload<{
  include: {
    user: true;
  };
}>;

type Props = {
  userId: string;
  postId: string;
  postAuthorId: string;
  comments: CommentsWithUser[];
};

const CommentsSection = ({ userId, postId, postAuthorId, comments }: Props) => {
  return (
    <div className="my-14 border-t pt-5 text-right">
      <h2 className="mb-4 text-left">Comments ({comments.length})</h2>

      {comments.map((item) => {
        return (
          <Comment key={item.id} postAuthorId={postAuthorId} {...item}>
            {item.message}
          </Comment>
        );
      })}

      <AddComment userId={userId} postId={postId} />
    </div>
  );
};

export default CommentsSection;
