import { Types } from "mongoose";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function verifyEmail({
  modelName,
  context
}: IController.IBasic): Promise<NextResponse> {
  // * get token from context
  const token = context?.params.token;

  // * check if token is null and return error response with status code 400
  if (!token) {
    return NextResponse.json("Token not found", { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // * check if token is valid and return error response with status code 400
  const user: IUserDocumentProps | null = await model.collection[modelName].findOne({
    verificationToken: token
  });
  if (!user) {
    return NextResponse.json("Invalid token", { status: 400 });
  }

  // TODO: how to handle when token is expired
  // * check if token is expired and return error response with status code 400
  if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
    return NextResponse.json("Token expired", { status: 400 });
  }

  // * check if user is active and return error response with status code 422
  if (user.isActive) {
    return NextResponse.json("User is already active", { status: 422 });
  }

  // * set update content
  const updateContent = {
    isActive: true,
    verificationToken: null,
    verificationTokenExpiresAt: null
  } as {
    isActive: boolean;
    verificationToken: string | null;
    verificationTokenExpiresAt: Date | null;
  };

  // * find document by id and update isActive, verificationToken and verificationTokenExpiresAt
  const currentDocument: IUserDocumentProps | null = await model.collection[
    modelName
  ].findByIdAndUpdate(new Types.ObjectId(user._id), updateContent);

  // * check if document is null and return error response with status code 404
  if (!currentDocument) {
    return NextResponse.json("Document not found", { status: 404 });
  }

  // * find document by id and return it
  const updatedDocument: IUserDocumentProps | null = await model.collection[modelName].findById(
    new Types.ObjectId(user._id)
  );

  // * return updated document with status code 200
  return NextResponse.json(
    { message: `Done! Your email: ${updatedDocument?.email} is now verified.` },
    { status: 200 }
  );
}
