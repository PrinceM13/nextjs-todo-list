import connectMongo from "@/utils-backend/connection/mongodb";
import { collection } from "@/utils-backend/model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, detail, dueDate, member, status } = await req.json();
  await connectMongo();
  await collection.TodoModel.create({
    topic,
    detail,
    dueDate,
    member,
    status
  });

  try {
    return NextResponse.json({ success: "note created !" });
  } catch (error) {
    console.log(error);
  }
}
