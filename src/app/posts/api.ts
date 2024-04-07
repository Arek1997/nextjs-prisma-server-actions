import prisma from "@/libs/prisma";

export const getPosts = async () => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Faild to fetch posts. Error: ", error);
  }
};
