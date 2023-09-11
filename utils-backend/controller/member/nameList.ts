import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { IUserDocumentProps } from "@/interfaces/global";

export default async function showAllTodosWithFilters({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  const url: URL = new URL(request?.url ?? "");

  // * get searchs from query
  const name = url.searchParams.get("name");
  const names: string[] = name?.split(",") ?? [];

  // * create a pattern from searchs ex. (ck)|(ma)|(ss)
  const pattern = names.map((el) => `(${el})`).join("|");
  // * create a regex from pattern ex. /(ck)|(ma)|(ss)/i
  const regex = new RegExp(pattern, "i");

  // * create a query for displayName
  const displayNameQuery = { displayName: { $regex: regex } };

  // * connect to mongodb
  await connection.mongodb();

  let documents: IUserDocumentProps[] = [];

  // * if name is not empty, return all documents that match the regex
  if (name) {
    documents = (await model.collection[modelName]
      .find(displayNameQuery)
      .select("_id displayName")) as IUserDocumentProps[];
  }

  // * return all documents with status code 200
  return NextResponse.json({ data: documents }, { status: 200 });
}
