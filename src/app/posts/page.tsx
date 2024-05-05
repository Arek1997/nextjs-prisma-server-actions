import NewPosts from "./components/NewPost";
import Post from "./components/Post";
import { getPosts } from "./api";
import { notFound } from "next/navigation";
import Response from "@/components/Response";
import { getUserToken } from "../actions/getUser";

const PostsPage = async () => {
  const posts = await getPosts();

  if (!posts) {
    notFound();
  }

  const user = await getUserToken();

  return (
    <section className="grid justify-center">
      <div className="mb-8 flex items-center justify-between gap-6">
        <h1>Posts ({posts.length})</h1>
        <NewPosts />
      </div>
      {posts.length === 0 ? (
        <Response>No posts right now</Response>
      ) : (
        posts.map((data) => (
          <Post key={data.id} loggedUserId={user.id} {...data} />
        ))
      )}
    </section>
  );
};

export default PostsPage;
