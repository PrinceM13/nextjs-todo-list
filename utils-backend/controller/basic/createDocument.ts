import { connection, model } from "@/utils-backend";
import type { Document } from "mongoose";
import type { NextRequest } from "next/server";

export default async function createRecord(
  modelName: "TodoModel" | "UserModel",
  request: NextRequest
) {
  // * get document from request body
  const document: Document = await request.json();

  // * connect to mongodb
  await connection.mongodb();

  // * create document in mongodb
  await model.collection[modelName].create(document);
}
