import transporter from "@/libs/nodemailer";
import { Options } from "nodemailer/lib/mailer";

export default function Email() {
  const ownerEmail = process.env.NODEMAILER_OWNER_EMAIL;

  async function send(email: string, options: Options) {
    await transporter.sendMail({
      from: ownerEmail,
      to: email,
      ...options,
    });
  }

  return { send };
}
