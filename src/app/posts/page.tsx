import NewPosts from "@/components/NewPost";
import Post, { PostInterface } from "@/components/Post";

const getPosts = async (): Promise<PostInterface[]> => {
  return [
    {
      _id: crypto.randomUUID(),
      author: "Adam Maj",
      date: "04.11.2022",
      title: "Izabel",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos eos veniam ullam ratione quisquam porro saepe tempora neque excepturi explicabo. ",
      image: "images/girl.jpeg",
      imageAlt: "Girl",
    },
  ];
};

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <section className="grid justify-center">
      <h1 className="mb-5">Posts ({posts.length})</h1>
      <NewPosts />
      {posts.map((data) => (
        <Post {...data} key={data.content} />
      ))}
    </section>
  );
};

export default PostsPage;
