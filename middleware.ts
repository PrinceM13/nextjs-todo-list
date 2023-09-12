import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// * set matcher to match all routes under /api
export const config = {
  matcher: "/api/:function*"
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
  }

  // * if request url starts with /api/auth, will not run the middleware
  if (request.nextUrl.pathname.startsWith("/api/auth")) return NextResponse.next();

  // * authenticate
  const res = authenticate();

  // * if authenticate failed, will throw error and stop the middleware (will not run the next middleware)
  return res;
}

function authenticate() {
  const headersList = headers();
  const authorization = headersList.get("authorization");

  // * check if authorization header exists
  if (!authorization || !authorization.startsWith("Bearer "))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // TODO: edge runtimes not support crypto, so just check if token is valid and will try other way to verify token
  //   // * get token
  //   const token = authorization?.split(" ")[1];

  //   try {
  //     // * verify token
  //     const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  //     console.log("payload ----------> ", payload);
  //   } catch (err: any) {
  //     console.log(err);
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }
}
