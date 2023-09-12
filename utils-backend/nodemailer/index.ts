import nodemailer from "nodemailer";

import { config } from "@/utils-backend";
import { verificationEmailTemplate } from "./emailTemplate";
import { resetPasswordEmailTemplate } from "./emailTemplate/resetPassword";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.email,
    pass: config.email.password
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: config.email.email,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (to: string, name: string, token: string) => {
  const subject = "Verify Your Email and Complete Your Todo List Registration";
  const html = verificationEmailTemplate(name, token);

  await sendEmail(to, subject, html);
};

export const sendResetPasswordEmail = async (to: string, name: string, token: string) => {
  const subject = "Reset Your Todo List Password";
  const html = resetPasswordEmailTemplate(name, token);

  await sendEmail(to, subject, html);
};
