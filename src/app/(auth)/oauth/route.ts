import { createAdminClient, createClient } from "@/lib/appwrite/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");

    if (!userId || !secret) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const { account } = await createAdminClient();

    try {
      const session = await account.createSession(userId, secret);
      console.log(session);

      (await cookies()).set("user-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      (await cookies()).set("user-session-id", session.$id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      const client = await createClient();
      client.client.setSession(session.secret);
      await client.account.get();

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.type === "user_more_factors_required") {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_URL!}/login/mfa`
        );
      }

      console.error("Session creation failed:", err);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("OAuth route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
