"use server";

import prisma from "@/libs/prisma";
import { z } from "zod";
import bcript from "bcrypt";
import { redirect } from "next/navigation";
import { login } from "@/libs/session";
import { emailSchema } from "@/schema/email";
import { passwordSchema } from "@/schema/password";

const newAccount = z.object({
  name: z.string({
    required_error: "User name required",
  }),
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: z.string(),
});

export const createAccount = async (_: unknown, formData: FormData) => {
  const result = newAccount.safeParse(Object.fromEntries(formData.entries()));

  console.log(result);

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      error: message,
      invalidElement: path[0],
    };
  }

  const { name, email, password, repeatPassword } = result.data;

  if (password !== repeatPassword) {
    return {
      error: "Password and repeat password does not match",
      invalidElement: "repeatPassword",
    };
  }

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return {
      error: email + " already in use",
      invalidElement: "email",
    };
  }

  const hashedPassword = await bcript.hash(password, 10);

  const User = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  login(User);

  redirect("/posts");
};
