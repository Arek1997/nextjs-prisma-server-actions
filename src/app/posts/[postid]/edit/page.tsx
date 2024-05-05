import { notFound } from "next/navigation";
import { getPostWithId } from "../../api";
import EditForm from "./EditForm";
import { getUserToken } from "@/app/actions/getUser";

type Props = {
  params: { postid: string };
};

const EditPostPage = async ({ params: { postid } }: Props) => {
  const post = await getPostWithId(postid);
  const userId = (await getUserToken()).id;

  if (!post || post.user.id !== userId) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-4 text-xl">Edit post page</h1>
      <EditForm postid={post.id} title={post.title} message={post.message} />
    </>
  );
};

export default EditPostPage;
