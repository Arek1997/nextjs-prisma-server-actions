import prisma from "@/libs/prisma";

export const getPosts = async () => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return posts;
  } catch (error) {
    console.error("Faild to fetch posts. Error: ", error);
  }
};
