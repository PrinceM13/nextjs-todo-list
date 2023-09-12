import { connection, model } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IController } from "@/interfaces/backend";
import type { ITodoDocumentProps } from "@/interfaces/global";

export default async function showAllTodosWithFilters({
  modelName,
  request
}: IController.IBasic): Promise<NextResponse> {
  const url: URL = new URL(request?.url ?? "");

  // * get searchs from query
  const name = url.searchParams.get("name");
  const names: string[] = name?.split(",") ?? [];

  // * get status from query
  const status = url.searchParams.get("status");

  // * create a pattern from searchs ex. (ck)|(ma)|(ss)
  const pattern = names.map((el) => `(${el})`).join("|");
  // * create a regex from pattern ex. /(ck)|(ma)|(ss)/i
  const regex = new RegExp(pattern, "i");

  // * create a query for status and displayName
  const statusQuery = { isCompleted: status === "true" ? true : false };
  const displayNameQuery = { "member.displayName": { $regex: regex } };
  // * join query with $and
  const query = { $and: [displayNameQuery, status ? statusQuery : {}] };

  // * connect to mongodb
  await connection.mongodb();

  let documents: ITodoDocumentProps[] = [];
  if (!name && !status) {
    documents = (await model.collection[modelName].find({})) as ITodoDocumentProps[];
  } else {
    documents = (await model.collection[modelName].find(query)) as ITodoDocumentProps[];
  }

  // * return all documents with status code 200
  return NextResponse.json({ data: documents }, { status: 200 });
}
