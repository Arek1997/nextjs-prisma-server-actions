"use server";

import { z } from "zod";
import bcript from "bcrypt";
import { passwordSchema } from "@/schema/password";
import { emailSchema } from "@/schema/email";
import prisma from "@/libs/prisma";
import { logOutHandler } from "../actions/logout";
import { getUserById } from "../actions/getUser";
import { auth } from "@/auth";

const changePasswordSchema = z.object({
  "old-password": passwordSchema,
  "new-password": passwordSchema,
});

export const changePassword = async (_: unknown, formData: FormData) => {
  const result = changePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      error: message,
      invalidElement: path[0],
    };
  }

  const user = await getUserById();

  if (!user) {
    console.error("user not found");
    logOutHandler();
    return;
  }

  const oldPassword = result.data["old-password"];
  const userPassword = user.password;
  const currentPasswordMatch = await bcript.compare(oldPassword, userPassword!);

  if (!currentPasswordMatch) {
    return {
      error: "Current password does not match.",
      invalidElement: "old-password",
    };
  }

  const newPassword = result.data["new-password"];
  const newHashedPassword = await bcript.hash(newPassword, 10);

  await prisma.users.update({
    data: {
      password: newHashedPassword,
    },
    where: {
      id: user.id,
    },
  });

  await logOutHandler();
};

export const deleteProfile = async (_: unknown, formData: FormData) => {
  const result = emailSchema.safeParse(formData.get("email"));

  if (!result.success) {
    const { message, path } = result.error.issues[0];

    return {
      error: message,
      invalidElement: path[0],
    };
  }

  const token = await auth();

  await prisma.users.delete({
    where: {
      email: token?.user?.email!,
    },
  });

  await logOutHandler();
};
