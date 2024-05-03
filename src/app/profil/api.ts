import prisma from "@/libs/prisma";
import Jwt from "@/services/jwt";
import Session from "@/services/session";
import { UserToken } from "@/types";

export const getUser = async () => {
  try {
    const currentUser = Jwt().verifyToken(Session().get()) as UserToken;

    if (!currentUser) {
      throw new Error("Invalid token. User not found");
    }

    const user = await prisma.users.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    return user;
  } catch (error) {
    console.error("getUser error: ", error);
  }
};
