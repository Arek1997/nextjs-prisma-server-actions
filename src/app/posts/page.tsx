import NewPosts from "./components/NewPost";
import Post from "./components/Post";
import { getPosts } from "./api";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import Session from "@/services/session";
import type { users } from "@prisma/client";

const PostsPage = async () => {
  const posts = await getPosts();

  if (!posts) {
    notFound();
  }

  const user = jwt.decode(Session().get()!) as users;

  return (
    <section className="grid justify-center">
      <div className="mb-4 flex items-center justify-between gap-6">
        <h1>Posts ({posts.length})</h1>
        <NewPosts />
      </div>
      {posts.map((data) => (
        <Post key={data.id} modify={user.id === data.user_id} {...data} />
      ))}
    </section>
  );
};

export default PostsPage;
