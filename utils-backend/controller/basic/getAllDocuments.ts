import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { ITodoDocumentProps, IUserDocumentProps } from "@/interfaces/global";

export default async function getAllDocuments({
  modelName
}: IController.IBasic): Promise<NextResponse> {
  // * connect to mongodb
  await connection.mongodb();

  // * get all documents from mongodb
  const documents = (await model.collection[modelName].find({})) as (
    | IUserDocumentProps
    | ITodoDocumentProps
  )[];

  // * return all documents with status code 200
  return NextResponse.json({ data: documents }, { status: 200 });
}
