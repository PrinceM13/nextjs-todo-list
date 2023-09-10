import { Types } from "mongoose";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { Document } from "mongoose";
import type { IController } from "@/interfaces/backend";

export default async function getDocumentById({
  modelName,
  context
}: IController.IBasic): Promise<NextResponse> {
  // * get id from context
  const id = context?.params.id;

  // * check if id is valid mongodb id and return error response with status code 400
  if (id && !Types.ObjectId.isValid(id)) {
    return NextResponse.json("Invalid id", { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // * get document from mongodb
  const document: Document | null = await model.collection[modelName].findById(
    new Types.ObjectId(id)
  );

  // * check if document is null and return error response with status code 404
  if (!document) {
    return NextResponse.json("Document not found", { status: 404 });
  }

  // * return all documents with status code 200
  return NextResponse.json(document, { status: 200 });
}
