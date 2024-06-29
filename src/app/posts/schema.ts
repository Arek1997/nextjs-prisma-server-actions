import { z } from "zod";

export const post = z.object({
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

export const comment = z
  .string({
    required_error: "Comment can not be empty",
  })
  .min(3, {
    message: "Comment has to be at least 3 characters",
  });
