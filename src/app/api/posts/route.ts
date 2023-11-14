import { NewPost } from "@/types/post";

const posts = [
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

export async function GET() {
  return Response.json({ posts });
}

export async function POST(req: Request, res: Response) {
  const { title, content } = (await req.json()) as NewPost;

  console.log(title);
  console.log(content);

  return Response.json({ message: "Post has been created." });
}
