import { controller } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // * get all todos from mongodb
    const response: NextResponse = await controller.basic.getAllDocuments({
      modelName: "UserModel",
      request
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
