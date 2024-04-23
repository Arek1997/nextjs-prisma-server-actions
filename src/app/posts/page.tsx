import NewPosts from "./components/NewPost";
import Post from "./components/Post";
import { getPosts } from "./api";
import { notFound } from "next/navigation";
import Jwt from "@/services/jwt";
import Session from "@/services/session";
import type { users } from "@prisma/client";

const PostsPage = async () => {
  const posts = await getPosts();

  if (!posts) {
    notFound();
  }

  const user = Jwt().verifyToken(Session().get()) as users;

  return (
    <section className="grid justify-center">
      <div className="mb-8 flex items-center justify-between gap-6">
        <h1>Posts ({posts.length})</h1>
        <NewPosts />
      </div>
      {posts.length === 0
        ? "No posts right now"
        : posts.map((data) => (
            <Post key={data.id} loggedUser={user} {...data} />
          ))}
    </section>
  );
};

export default PostsPage;
