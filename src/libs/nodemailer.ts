import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_OWNER_EMAIL,
    pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
  },
});

export default transporter;
