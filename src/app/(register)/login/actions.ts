"use server";

import prisma from "@/libs/prisma";
import { z } from "zod";
import bcript from "bcrypt";
import { redirect } from "next/navigation";
import Session from "@/services/session";
import { emailSchema } from "@/schema/email";
import { passwordSchema } from "@/schema/password";

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

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  const passwordMatch = await bcript.compare(password, user?.password || "");

  if (!user || !passwordMatch) {
    return {
      error: `Invalid credentials`,
      invalidElement: "response",
    };
  }

  Session().create(user);
  redirect(process.env.DEFAULT_ROUTE!);
};
