import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoggedInUser } from "@/lib/appwrite/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard")) {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (path.startsWith("/admin")) {
    const user = await getLoggedInUser();
    const isAdmin = user?.labels?.includes("ADMIN");

    if (!user || !isAdmin) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
