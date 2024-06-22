import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/utils/functions";
import { type CommentsWithUser } from "./CommentsSection";
import { useDisclosure } from "@nextui-org/react";
import CommentOptions from "./CommentOptions";
import EditComment from "./EditComment";
import { deleteComment, editComment } from "../actions";
import DeleteModal from "./DeleteModal";

type CommentProps = {
  isAuthor: boolean;
  currentUserId: string;
  children: React.ReactNode;
} & CommentsWithUser;

const MAX_COMMENT_HEIGHT = 100;

const Comment = ({
  createdAt,
  user,
  isAuthor,
  currentUserId,
  id,
  posts_id,
  children,
}: CommentProps) => {
  const [longComment, setLongComment] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const showEditOption = currentUserId === user.id;

  useEffect(() => {
    if (textRef.current?.scrollHeight) {
      setLongComment(textRef.current?.scrollHeight > MAX_COMMENT_HEIGHT);
    }
  }, [isEditting]);

  return (
    <>
      <div className="group mb-6 rounded-lg border p-4 text-left">
        <div className="mb-8 flex items-center justify-between gap-4 text-xs">
          <p className="space-x-2">
            <span>{user.name}</span>
            {isAuthor && <span>(Author)</span>}
          </p>
          <div className="flex items-center gap-4">
            {showEditOption && !isEditting && (
              <CommentOptions
                onEdit={() => setIsEditting(true)}
                onDelete={onOpen}
              />
            )}
            <time className="underline" dateTime={formatDate(createdAt)}>
              {formatDate(createdAt)}
            </time>
          </div>
        </div>

        {isEditting ? (
          <EditComment
            postID={posts_id}
            commentID={id}
            value={String(children)}
            onSave={editComment}
            onCancel={() => setIsEditting(false)}
          />
        ) : (
          <p
            ref={textRef}
            className={showMore ? "line-clamp-none" : "line-clamp-4"}
          >
            {children}
          </p>
        )}
        {longComment && (
          <button
            className="text-xs font-bold"
            onClick={() => setShowMore((prevState) => !prevState)}
          >
            Show {showMore ? "less" : "more"}
          </button>
        )}
      </div>
      <DeleteModal
        title="Delete comment"
        isOpen={isOpen}
        onDeleteHandler={() => deleteComment(id, posts_id)}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Comment;
