import NewPosts from "./components/NewPost";
import Post from "./components/Post";
import { getPosts } from "./api";
import { notFound } from "next/navigation";

const PostsPage = async () => {
  const posts = await getPosts();

  if (!posts) {
    notFound();
  }

  return (
    <section className="grid justify-center">
      <h1 className="mb-5">Posts ({posts.length})</h1>
      <NewPosts />
      {posts.map((data) => (
        <Post {...data} key={data.id} />
      ))}
    </section>
  );
};

export default PostsPage;
