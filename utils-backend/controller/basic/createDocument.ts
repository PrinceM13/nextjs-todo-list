import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { Document } from "mongoose";
import type { IController } from "@/interfaces/backend";

export default async function createRecord({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  // * get document from request body
  const document: Document = await request?.json();

  // * connect to mongodb
  await connection.mongodb();

  // * create document in mongodb
  const createdDocument: Document = await model.collection[modelName].create(document);

  // * return created document with status code 201
  return NextResponse.json(createdDocument, { status: 201 });
}
