import crypto from "crypto";

export const wait = async (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const generateRandomToken = () => crypto.randomBytes(32).toString("hex");

export const formatDate = (date: Date | string) => {
  return new Date(date).toUTCString().split("GMT")[0];
};
