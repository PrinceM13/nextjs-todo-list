import type { NextRequest } from "next/server";

export interface IBasic {
  modelName: "TodoModel" | "UserModel";
  request?: NextRequest;
}
