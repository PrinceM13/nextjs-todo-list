import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { Document } from "mongoose";
import type { IController } from "@/interfaces/backend";

export default async function getAllDocuments({
  modelName
}: IController.IBasic): Promise<NextResponse> {
  // * connect to mongodb
  await connection.mongodb();

  // * get all documents from mongodb
  const documents: Document[] = await model.collection[modelName].find({});

  // * return all documents with status code 200
  return NextResponse.json(documents, { status: 200 });
}
