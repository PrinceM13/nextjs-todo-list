import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { ITodoDocumentProps, IUserDocumentProps } from "@/interfaces/global";

export default async function createRecord({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  // * get document from request body
  const document = (await request?.json()) as IUserDocumentProps | ITodoDocumentProps;

  // * connect to mongodb
  await connection.mongodb();

  // * create document in mongodb
  const createdDocument = (await model.collection[modelName].create(document)) as
    | IUserDocumentProps
    | ITodoDocumentProps;

  // * return created document with status code 201
  return NextResponse.json({ data: createdDocument }, { status: 201 });
}
