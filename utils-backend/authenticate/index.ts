import jwt from "jsonwebtoken";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { config } from "..";

export default function authenticate() {
  const headersList = headers();
  const authorization = headersList.get("authorization");

  // * check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer "))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // * get token
  const token = authorization?.split(" ")[1];

  try {
    // * verify token
    const payload = jwt.verify(token, config.jwt.secretKey);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
