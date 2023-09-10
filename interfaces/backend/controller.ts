import type { IApi } from "@/interfaces/backend";
import type { NextRequest } from "next/server";

export interface IBasic {
  modelName: "TodoModel" | "UserModel";
  request?: NextRequest;
  context?: IApi.IContext;
}
