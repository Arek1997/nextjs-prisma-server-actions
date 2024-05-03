"use server";

import prisma from "@/libs/prisma";
import Session from "@/services/session";
import { revalidatePath } from "next/cache";
import Jwt from "@/services/jwt";
import { z } from "zod";
import { UserToken } from "@/types";

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

export const createPost = async (_: unknown, formData: FormData) => {
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
    const user = Jwt().verifyToken(Session().get()) as UserToken;
    await prisma.posts.create({
      data: {
        user_id: user.id,
        title,
        message,
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    console.error(error);
  } finally {
    return { error: "", invalidElement: "" };
  }
};

export const deletePost = async (postId: string) => {
  const user = Jwt().verifyToken(Session().get()) as UserToken;

  await prisma.posts.delete({
    where: {
      id: postId,

      AND: {
        user_id: user.id,
      },
    },
  });
  revalidatePath("/posts");
};
