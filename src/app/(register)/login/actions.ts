"use server";

import { z } from "zod";
import { emailSchema } from "@/schema/email";
import { passwordSchema } from "@/schema/password";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const userLogin = async (_: unknown, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      error: message,
      invalidElement: path[0],
    };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      error: `Invalid credentials`,
      invalidElement: "response",
    };
  }
};
