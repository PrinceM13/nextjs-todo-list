import { Resend } from "resend";

import { verificationEmailTemplate } from "../emailTemplate";
import { resetPasswordEmailTemplate } from "../emailTemplate/resetPassword";
import { config } from "@/utils-backend";

const resend = new Resend(config.resend.apiKey);

export const sendVerificationEmail = async (to: string, name: string, token: string) => {
  const subject = "Verify Your Email and Complete Your Todo List Registration";
  const html = verificationEmailTemplate(name, token);
  resend.emails.send({
    from: "noreply.todo-list@resend.dev",
    to,
    subject,
    html
  });
};

export const sendResetPasswordEmail = async (to: string, name: string, token: string) => {
  const subject = "Reset Your Todo List Password";
  const html = resetPasswordEmailTemplate(name, token);

  resend.emails.send({
    from: "noreply.todo-list@resend.dev",
    to,
    subject,
    html
  });
};
