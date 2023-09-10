import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { config, connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function login({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  // * get document from request body
  const document: IUserDocumentProps = await request?.json();

  // check if document is null and return error response with status code 400
  if (!document) {
    return NextResponse.json("Document not found", { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // TODO: refactor this to use a function and reuse it in register.ts
  // * check if email exists in mongodb and return error response with status code 400
  const user: IUserDocumentProps | null = await model.collection[modelName].findOne({
    email: document.email
  });
  if (!user) {
    return NextResponse.json("Invalid Email or Password", { status: 400 });
  }

  // * check if password is correct and return error response with status code 400
  const isCorrect = await bcrypt.compare(document.password, user.password);
  if (!isCorrect) {
    return NextResponse.json("Invalid Email or Password", { status: 400 });
  }

  // * check if user is active and return error response with status code 422
  if (!user.isActive) {
    return NextResponse.json("User is not active please verify your email", { status: 422 });
  }

  // * create access token with jwt
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, displayName: user.displayName, isActive: user.isActive },
    config.jwt.secretKey,
    { expiresIn: config.jwt.expiresIn }
  );

  // * return access token with status code 200
  return NextResponse.json({ accessToken }, { status: 200 });
}
