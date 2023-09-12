import { controller, errorResponse } from "@/utils-backend";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // * create document in mongodb (await to wait for the result)
    const response: NextResponse = await controller.auth.login({
      modelName: "UserModel",
      request
    });

    // * return response from controller
    return response;
  } catch (error: any) {
    // * log error to console
    console.log(error);

    // * check if error is from mongodb and return error response with proper status code
    const { message, status } = errorResponse.mongodb(error);
    return NextResponse.json(message, { status });
  }
}
