"use server";

import { z } from "zod";
import bcript from "bcrypt";
import { passwordSchema } from "@/schema/password";
import Session from "@/services/session";
import { users } from "@prisma/client";
import Jwt from "@/services/jwt";
import prisma from "@/libs/prisma";
import { logOutHandler } from "../actions/logout";

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

  const oldPassword = result.data["old-password"];

  const user = Jwt().verifyToken(Session().get()) as users;
  const userPassword = await prisma.users
    .findUnique({
      where: {
        id: user.id,
      },
    })
    .then((user) => user?.password);

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

  logOutHandler();
};
