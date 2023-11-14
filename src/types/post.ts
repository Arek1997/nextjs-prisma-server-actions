export interface Post {
  _id: string;
  author?: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
}

export interface NewPost {
  title: string;
  content: string;
  image?: string;
}
