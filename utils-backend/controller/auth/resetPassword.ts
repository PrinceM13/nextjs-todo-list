import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function resetPassword({
  modelName,
  request,
  context
}: IController.IBasic): Promise<NextResponse> {
  // * get token from context
  const token = context?.params.token;

  // * check if token is null and return error response with status code 400
  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 400 });
  }

  // * check if body contains password and return error response with status code 400
  const document: IUserDocumentProps = await request?.json();

  // check if document is null and return error response with status code 400
  if (!document || !document.password) {
    return NextResponse.json({ message: "Document not found" }, { status: 400 });
  }

  // * hash password with bcrypt
  const newPassword: string = await bcrypt.hash(document.password, 12);

  // * connect to mongodb
  await connection.mongodb();

  // * check if token is valid and return error response with status code 400
  const user: IUserDocumentProps | null = await model.collection[modelName].findOne({
    resetPasswordToken: token
  });
  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  // TODO: how to handle when token is expired
  // * check if token is expired and return error response with status code 400
  if (user.resetPasswordTokenExpiresAt && user.resetPasswordTokenExpiresAt < new Date()) {
    return NextResponse.json({ message: "Token expired" }, { status: 400 });
  }

  // * set update content
  const updateContent = {
    password: newPassword,
    resetPasswordToken: null,
    resetPasswordTokenExpiresAt: null
  } as {
    password: string;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiresAt: Date | null;
  };

  // * find document by id and update resetPasswordToken and resetPasswordTokenExpiresAt
  const currentDocument: IUserDocumentProps | null = await model.collection[
    modelName
  ].findByIdAndUpdate(new Types.ObjectId(user._id), updateContent);

  // * check if document is null and return error response with status code 404
  if (!currentDocument) {
    return NextResponse.json({ message: "Document not found" }, { status: 404 });
  }

  // * find document by id and return it
  const updatedDocument: IUserDocumentProps | null = await model.collection[modelName].findById(
    new Types.ObjectId(user._id)
  );

  // * return updated document with status code 200
  return NextResponse.json(
    { message: `Done! Your password has been reset successfully` },
    { status: 200 }
  );
}
