import { NewPost } from "@/types/post";

export async function POST(req: Request, res: Response) {
  const { title, content } = (await req.json()) as NewPost;

  console.log(title);
  console.log(content);

  return Response.json({ message: "Post has been created." });
}
