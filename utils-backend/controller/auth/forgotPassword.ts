import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { connection, model, sendEmail } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function forgotPassword({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  const url: URL = new URL(request?.url ?? "");

  // * get searchs from query
  const email = url.searchParams.get("email");

  // check if email is provided and return error response with status code 400
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // check if email is already in use and return error response with status code 400
  const user: IUserDocumentProps | null = await model.collection[modelName].findOne({ email });

  // check if email is not exist and return error response with status code 400
  if (!user) {
    return NextResponse.json({ message: "Email is not exist" }, { status: 400 });
  }

  // * generate reset password token
  user.resetPasswordToken = randomUUID().replace(/-/g, "");
  // * set verification token expires at 24 hours
  user.resetPasswordTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // * update document in mongodb
  const currentDocument: IUserDocumentProps | null = await model.collection[
    modelName
  ].findOneAndUpdate({ email }, user);

  // * check if document is null and return error response with status code 404
  if (!currentDocument) {
    return NextResponse.json({ message: "Document not found" }, { status: 404 });
  }

  // * find document by email
  const updatedDocument: IUserDocumentProps | null = await model.collection[modelName].findOne({
    email
  });

  // * send verification email
  try {
    if (!updatedDocument) {
      return NextResponse.json({ message: "Error sending verification email" }, { status: 400 });
    }
    sendEmail.nodemailer.sendResetPasswordEmail(
      updatedDocument.email ?? "",
      updatedDocument.displayName ?? "",
      updatedDocument.resetPasswordToken ?? ""
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending reset password email" }, { status: 400 });
  }

  // * return response with status code 201
  return NextResponse.json(
    { message: "Reset password email has been sent, please check your email" },
    {
      status: 200
    }
  );
}
