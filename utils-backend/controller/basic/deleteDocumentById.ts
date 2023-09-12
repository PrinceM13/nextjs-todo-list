import { Types } from "mongoose";
import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";

export default async function deleteDocumentById({
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

  // * delete document by id
  const response = await model.collection[modelName].deleteOne(new Types.ObjectId(id));

  // * check if response is acknowledged and return error response with status code 500
  if (!response.acknowledged) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }

  // * check if any document was deleted and return error response with status code 404
  if (response.deletedCount === 0) {
    return NextResponse.json("Document not found or already deleted", { status: 404 });
  }

  // * return response with status code 200
  return NextResponse.json("Document deleted successfully", { status: 200 });
}
