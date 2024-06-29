"use server";

import { auth } from "@/auth";
import prisma from "@/libs/prisma";

export const getUserById = async (id?: string) => {
  let userId;

  try {
    if (!id) {
      const token = await auth();
      userId = token?.user?.id;
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
