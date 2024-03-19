"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const post = z.object({
  title: z
    .string({
      required_error: "Post title required",
    })
    .min(5, {
      message: "Title has to be at least 5 characters",
    }),
  image: z.string().optional(),
  message: z
    .string({
      required_error: "Post message required",
    })
    .min(10, {
      message: "Title has to be at least 10 characters",
    }),
});

export const createPost = async (prevState: any, formData: FormData) => {
  const result = post.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      error: message,
      invalidElement: path[0],
    };
  }

  const { title, message } = result.data;

  try {
    const response = await prisma.posts.create({
      data: {
        user_id: "59b99db4cfa9a34dcd7885b6",
        date: new Date().toISOString(),
        title,
        message,
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await prisma.posts.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
