import prisma from "@/libs/prisma";

export const getPosts = async () => {
  try {
    const posts = await prisma.posts.findMany({
      where: {
        user_id: "59b99db4cfa9a34dcd7885b6",
      },
      include: {
        user: true,
      },
    });
    console.log("posts: ", posts);
    return posts;
  } catch (error) {
    console.error("Faild to fetch posts. Error: ", error);
  }
};
