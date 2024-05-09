import { formatDate } from "@/utils/functions";
import { type CommentsWithUser } from "./CommentsSection";

type CommentProps = {
  postAuthorId: string;
  children: React.ReactNode;
} & CommentsWithUser;

const Comment = ({ createdAt, user, postAuthorId, children }: CommentProps) => {
  const isAuthor = postAuthorId === user.id;

  return (
    <div className="mb-6 rounded-lg border p-4 text-left">
      <div className="mb-2 flex items-center justify-between gap-4 text-xs">
        <p className="space-x-2">
          <span>{user.name}</span>
          {isAuthor && <span>(Author)</span>}
        </p>
        <time className="underline" dateTime={formatDate(createdAt)}>
          {formatDate(createdAt)}
        </time>
      </div>

      <p>{children}</p>
    </div>
  );
};

export default Comment;
