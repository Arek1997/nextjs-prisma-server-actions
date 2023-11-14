import type { Post as PostInterface } from "@/types/post";

class Post {
  private _id: string = "";
  private author: string = "";
  private date: string = "";
  private title: string = "";
  private content: string = "";
  private image: string = "";
  private imageAlt: string = "";

  constructor(data: Omit<PostInterface, "_id" | "date" | "imageAlt">) {
    const { title, content } = data;
    this._id = crypto.randomUUID();
    this.title = title;
    this.content = content;
    this.date = new Date().toISOString();
  }
}

export default Post;
