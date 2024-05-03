"use server";

import bcript from "bcrypt";
import { emailSchema } from "@/schema/email";
import { passwordSchema } from "@/schema/password";
import prisma from "@/libs/prisma";
import { getUserByEmail } from "../actions/getUser";
import { generateRandomToken } from "@/utils/functions";
import Email from "@/services/email";

export const sendResetEmail = async (_: unknown, formData: FormData) => {
  const result = emailSchema.safeParse(formData.get("email"));

  if (!result.success) {
    const { message } = result.error.issues[0];

    return {
      error: message,
      success: "",
    };
  }

  const email = result.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "Account with provided email address does not exist.",
      success: "",
    };
  }

  const resetPasswordToken = generateRandomToken();

  await prisma.users.update({
    where: { email },
    data: { resetPasswordToken },
  });

  await Email().send(email, {
    subject: "Password reset",
    html: `<p>We received a password reset request. Click on the link below to reset your password.</p>
      <a href="http://localhost:3000/reset-password?token=${resetPasswordToken}" target="_blank">Reset password</a>
      `,
  });

  return {
    error: "",
    success: "Email has been sent on provided email address.",
  };
};

export const resetPassword = async (_: unknown, formData: FormData) => {
  const result = passwordSchema.safeParse(formData.get("new-password"));

  if (!result.success) {
    const { message } = result.error.issues[0];

    return {
      error: message,
      success: "",
    };
  }

  const newPassword = result.data;
  const token = formData.get("token") as string;

  const user = await prisma.users.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });

  if (!user) {
    return {
      error:
        "Token invalid or expired. Please try resending your password reset email.",
      success: "",
    };
  }

  const hashedPassword = await bcript.hash(newPassword, 10);

  await prisma.users.update({
    where: {
      id: user.id,
    },

    data: {
      password: hashedPassword,
      resetPasswordToken: "",
    },
  });

  return {
    error: "",
    success: "Password has been changed.",
  };
};
