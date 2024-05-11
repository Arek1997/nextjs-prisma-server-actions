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
  currentUserId: string;
  postId: string;
  postAuthorId: string;
  comments: CommentsWithUser[];
};

const CommentsSection = ({
  currentUserId,
  postId,
  postAuthorId,
  comments,
}: Props) => {
  return (
    <div className="my-14 border-t pt-5 text-right">
      <h2 className="mb-4 text-left">Comments ({comments.length})</h2>

      {comments.map((item) => {
        return (
          <Comment
            key={item.id}
            currentUserId={currentUserId}
            isAuthor={item.user_id === postAuthorId}
            {...item}
          >
            {item.message}
          </Comment>
        );
      })}

      <AddComment userId={currentUserId} postId={postId} />
    </div>
  );
};

export default CommentsSection;
