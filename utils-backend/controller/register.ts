import bcrypt from "bcryptjs";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { ITodoDocumentProps, IUserDocumentProps } from "@/interfaces/global";

export default async function register({
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

  // check if email is already in use and return error response with status code 400
  const isEmailInUse: IUserDocumentProps[] = await model.collection[modelName].find({
    email: document.email
  });
  if (isEmailInUse.length > 0) {
    return NextResponse.json("Email already in use", { status: 400 });
  }

  // * hash password with bcrypt
  document.password = await bcrypt.hash(document.password, 12);

  // * create document in mongodb
  const createdDocument = (await model.collection[modelName].create(document)) as
    | IUserDocumentProps
    | ITodoDocumentProps;

  // * return response with status code 201
  return NextResponse.json("User created successfully, waiting for verification", {
    status: 201
  });
  // * for debugging purposes
  // return NextResponse.json(createdDocument, { status: 201 });
}
