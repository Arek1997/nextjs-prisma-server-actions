"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserToken } from "../actions/getUser";

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

const comment = z
  .string({
    required_error: "Comment can not be empty",
  })
  .min(3, {
    message: "Comment has to be at least 3 characters",
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
    const user = await getUserToken();
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

export const editPost = async (_: unknown, formData: FormData) => {
  const result = post.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      success: false,
      error: message,
      invalidElement: path[0],
    };
  }

  const { title, message } = result.data;
  const postID = formData.get("post-id") as string;

  try {
    const user = await getUserToken();
    await prisma.posts.update({
      where: {
        id: postID,
        AND: {
          user_id: user.id,
        },
      },

      data: {
        title,
        message,
        edited: true,
      },
    });

    revalidatePath(`/posts/${postID}`);
    return {
      success: true,
      error: "",
      invalidElement: "",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Some error occurred. Please try again.",
      invalidElement: "general",
    };
  }
};

export const deletePost = async (postId: string) => {
  const user = await getUserToken();

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

export const addComment = async (_: unknown, formData: FormData) => {
  const result = comment.safeParse(formData.get("comment"));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return { success: false, error: message, invalidElement: path[0] };
  }

  try {
    const postID = formData.get("post-id") as string;
    const userID = formData.get("user-id") as string;
    const commentMesage = result.data;

    await prisma.comments.create({
      data: {
        message: commentMesage,
        posts_id: postID,
        user_id: userID,
      },
    });
    revalidatePath(`/posts/${postID}`);
    return {
      success: true,
      error: "",
      invalidElement: "",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Faild to send comment, some error occurred. Try again.",
      invalidElement: "",
    };
  }
};

export const editComment = async (_: unknown, formData: FormData) => {
  const result = comment.safeParse(formData.get("comment"));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return { success: false, error: message, invalidElement: path[0] };
  }

  try {
    const postID = formData.get("post-id") as string;
    const commentID = formData.get("comment-id") as string;
    const commentMesage = result.data;

    await prisma.comments.update({
      where: {
        id: commentID,
      },
      data: {
        message: commentMesage,
      },
    });

    revalidatePath(`/posts/${postID}`);
    return {
      success: true,
      error: "",
      invalidElement: "",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Faild to edit comment, some error occurred. Try again.",
      invalidElement: "",
    };
  }
};

export const deleteComment = async (commentId: string, postId: string) => {
  const user = await getUserToken();

  await prisma.comments.delete({
    where: {
      id: commentId,
      AND: {
        user_id: user.id,
      },
    },
  });
  revalidatePath(`/posts/${postId}`);
};
