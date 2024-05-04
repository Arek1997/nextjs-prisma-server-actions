import Image from "next/image";
import { getPostWithId } from "../api";

type Props = {
  params: { postid: string };
};

const PostDetailsPage = async ({ params: { postid } }: Props) => {
  const post = await getPostWithId(postid);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <article className="mx-auto mt-20 md:max-w-[80%] xl:max-w-[90%]">
      <header className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl">{post.title}</h1>
        <time
          className="text-sm underline"
          dateTime={new Date(post.createdAt).toLocaleDateString()}
        >
          {new Date(post.createdAt).toDateString()}
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

      <p className="text-left">{post.message}</p>

      <footer className="my-8">
        <p className="text-right text-sm">
          Author <span className="italic underline">{post.user.name}</span>
        </p>
      </footer>
    </article>
  );
};

export default PostDetailsPage;
