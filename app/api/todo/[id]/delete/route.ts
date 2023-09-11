import { controller } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { IApi } from "@/interfaces/backend";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, context: IApi.IContext) {
  try {
    // * get all todos from mongodb
    const response: NextResponse = await controller.basic.deleteDocumentById({
      modelName: "TodoModel",
      request,
      context
    });

    // * return response from controller
    return response;
  } catch (error: any) {
    // * log error to console
    console.log(error);

    // * return error response with proper status code
    return NextResponse.json({ message: error.message }, { status: error.status ?? 400 });
  }
}
