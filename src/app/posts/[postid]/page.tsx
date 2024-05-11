import Image from "next/image";
import { getPostWithComments } from "../api";
import CommentsSection from "../components/CommentsSection";
import { getUserToken } from "@/app/actions/getUser";
import { logOutHandler } from "@/app/actions/logout";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/functions";

type Props = {
  params: { postid: string };
};

const PostDetailsPage = async ({ params: { postid } }: Props) => {
  const [post, user] = await Promise.allSettled([
    getPostWithComments(postid),
    getUserToken(),
  ]);

  if (post.status === "rejected" || !post.value) {
    notFound();
  }

  if (user.status === "rejected" || !user.value) {
    return logOutHandler();
  }

  return (
    <>
      <article>
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl">{post.value.title}</h1>
          <time
            className="text-sm underline"
            dateTime={formatDate(post.value.createdAt)}
          >
            {formatDate(post.value.createdAt)}
          </time>
        </header>
        <div className="p-10">
          <Image
            src="/images/girl.jpeg"
            alt="Girl image"
            className="mx-auto"
            width={600}
            height={400}
          />
        </div>

        <p className="text-left">{post.value.message}</p>

        <footer className="my-8 space-y-1 text-right text-xs">
          <p className="underline">
            Author: <span className="italic">{post.value.user.name}</span>
          </p>
          {post.value.edited && (
            <p className="underline">
              Last modification:{" "}
              <time
                className="italic"
                dateTime={formatDate(post.value.modifiedAt)}
              >
                {formatDate(post.value.modifiedAt)}
              </time>
            </p>
          )}
        </footer>
      </article>

      <CommentsSection
        currentUserId={user.value.id}
        postId={post.value.id}
        postAuthorId={post.value.user_id}
        comments={post.value.comments}
      />
    </>
  );
};

export default PostDetailsPage;
