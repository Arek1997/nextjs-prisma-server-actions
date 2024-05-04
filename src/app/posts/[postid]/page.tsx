import Image from "next/image";
import { getPostWithId } from "../api";
import Comments from "../components/Comments";
import { getUserById } from "@/app/actions/getUser";
import { logOutHandler } from "@/app/actions/logout";

type Props = {
  params: { postid: string };
};

const PostDetailsPage = async ({ params: { postid } }: Props) => {
  const [post, user] = await Promise.allSettled([
    getPostWithId(postid),
    getUserById(),
  ]);

  if (post.status === "rejected" || !post.value) {
    return <p>Post not found.</p>;
  }

  if (user.status === "rejected" || !user.value) {
    return logOutHandler();
  }

  return (
    <section className="mx-auto mt-20 md:max-w-[80%] xl:max-w-[90%]">
      <article>
        <header className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl">{post.value.title}</h1>
          <time
            className="text-sm underline"
            dateTime={new Date(post.value.createdAt).toLocaleDateString()}
          >
            {new Date(post.value.createdAt).toDateString()}
          </time>
        </header>
        <div className="float-right p-10">
          <Image
            src="/images/girl.jpeg"
            alt="Girl image"
            width={600}
            height={400}
          />
        </div>

        <p className="text-left">{post.value.message}</p>

        <footer className="my-8">
          <p className="text-right text-sm">
            Author{" "}
            <span className="italic underline">{post.value.user.name}</span>
          </p>
        </footer>
      </article>

      <Comments
        userId={user.value.id}
        postId={post.value.id}
        comments={post.value.comments}
      />
    </section>
  );
};

export default PostDetailsPage;
