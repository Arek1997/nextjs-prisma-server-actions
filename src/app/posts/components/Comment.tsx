import { formatDate } from "@/utils/functions";
import { type CommentsWithUser } from "./CommentsSection";
import { cn } from "@nextui-org/react";
import CommentOptions from "./CommentOptions";

type CommentProps = {
  isAuthor: boolean;
  currentUserId: string;
  children: React.ReactNode;
} & CommentsWithUser;

const Comment = ({
  createdAt,
  user,
  isAuthor,
  currentUserId,
  children,
}: CommentProps) => {
  const showEditOption = currentUserId === user.id;

  return (
    <div
      className={cn(
        "mb-6 rounded-lg border p-4 text-left",
        showEditOption && "relative"
      )}
    >
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

      {showEditOption && <CommentOptions />}
    </div>
  );
};

export default Comment;
