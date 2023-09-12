import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { connection, model, nodemailer } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function register({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  // * get document from request body
  const document: IUserDocumentProps = await request?.json();

  // check if document is null and return error response with status code 400
  if (!document) {
    return NextResponse.json({ message: "Document not found" }, { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // check if email is already in use and return error response with status code 400
  const user: IUserDocumentProps | null = await model.collection[modelName].findOne({
    email: document.email
  });

  if (user) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 });
  }

  // * hash password with bcrypt
  document.password = await bcrypt.hash(document.password, 12);

  // * generate verification token
  document.verificationToken = randomUUID().replace(/-/g, "");
  // * set verification token expires at 24 hours
  document.verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // * create document in mongodb
  const createdDocument: IUserDocumentProps = await model.collection[modelName].create(document);

  // * send verification email
  try {
    // * don't need to await for sending email, if wrong email is provided, user should figure it out by themselves
    // await nodemailer.sendVerificationEmail(
    nodemailer.sendVerificationEmail(
      createdDocument.email,
      createdDocument.displayName ?? "",
      createdDocument.verificationToken ?? ""
    );
  } catch (error) {
    console.error(error);
    // * user should figure it out by themselves, so don't need to return error response with status code 400
    // return NextResponse.json({ message: "Error sending verification email" }, { status: 400 });
  }

  // * return response with status code 201
  return NextResponse.json(
    { message: "Thank you for signing up, please check your email to verify your account" },
    {
      status: 201
    }
  );
  // * for debugging purposes
  // return NextResponse.json(createdDocument, { status: 201 });
}
