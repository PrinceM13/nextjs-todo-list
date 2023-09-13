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

  // * aggregattion quiz
  // * ------------------------------------------------

  const aggregateCount = async () => {
    return await model.collection[modelName].aggregate([
      {
        $unwind: { path: "$member" }
      },
      {
        $project: { name: "$member.displayName" }
      },
      {
        $group: { _id: "$name", count: { $sum: 1 } }
      }
    ]);
  };
  console.log("No.1 ------------------------");
  console.log(await aggregateCount());

  // * aggregate to get document that 'dueDate' is between Sep 2023 adn Dec 2023
  const aggregateDueDate = async (startDate: Date, endDate: Date) => {
    return await model.collection[modelName].aggregate([
      {
        $match: {
          dueDate: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      { $sort: { dueDate: 1 } },
      {
        $project: {
          _id: 0, // * specify field to show, 0 is hide, 1 is show
          topic: 1,
          view: 1
        }
      }
    ]);
  };

  console.log("No.2 ------------------------");
  console.log(
    " Sep 2023 - Dec 2023",
    await aggregateDueDate(new Date("2023-09-01"), new Date("2023-12-31"))
  );

  // * aggregate to get document that 'dueDate' is pass and group by displayName and count for each displayName
  const aggregatePassDueDate = async () => {
    return await model.collection[modelName].aggregate([
      {
        $match: { dueDate: { $lt: new Date() } }
      },
      {
        $unwind: { path: "$member" }
      },
      {
        $project: { name: "$member.displayName" }
      },
      {
        $group: { _id: "$name", count: { $sum: 1 } }
      }
    ]);
  };

  console.log("No.3 ------------------------");
  console.log(await aggregatePassDueDate());

  // * ------------------------------------------------

  // * return all documents with status code 200
  return NextResponse.json({ data: documents }, { status: 200 });
}
