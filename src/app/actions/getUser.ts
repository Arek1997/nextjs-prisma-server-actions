"use server";

import prisma from "@/libs/prisma";
import Jwt from "@/services/jwt";
import Session from "@/services/session";
import { UserToken } from "@/types";

export const getUserById = async (id?: string) => {
  let userId;

  try {
    if (!id) {
      const user = Jwt().verifyToken(Session().get()) as UserToken;
      userId = user.id;
    } else {
      userId = id;
    }

    const myUser = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    return myUser;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const myUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    return myUser;
  } catch (error) {
    console.error(error);
  }
};
