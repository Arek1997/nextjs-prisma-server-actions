import crypto from "crypto";

export const wait = async (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const generateRandomToken = () => crypto.randomBytes(32).toString("hex");
