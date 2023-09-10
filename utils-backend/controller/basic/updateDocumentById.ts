import { Types } from "mongoose";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { Document } from "mongoose";
import type { IController } from "@/interfaces/backend";

export default async function updateDocumentById({
  modelName,
  request,
  context
}: IController.IBasic): Promise<NextResponse> {
  // * get document from request body
  const updateContent: Document = await request?.json();

  // * get id from context
  const id = context?.params.id;

  // * check if id is valid mongodb id and return error response with status code 400
  if (id && !Types.ObjectId.isValid(id)) {
    return NextResponse.json("Invalid id", { status: 400 });
  }

  // * connect to mongodb
  await connection.mongodb();

  // * find document by id and update it
  const currentDocument: Document | null = await model.collection[modelName].findByIdAndUpdate(
    new Types.ObjectId(id),
    updateContent
  );

  // * check if document is null and return error response with status code 404
  if (!currentDocument) {
    return NextResponse.json("Document not found", { status: 404 });
  }

  // * find document by id and return it
  const updatedDocument: Document | null = await model.collection[modelName].findById(
    new Types.ObjectId(id)
  );

  // * return all documents with status code 200
  return NextResponse.json(updatedDocument, { status: 200 });
}
