"use server";

import {
    createAdminClient,
    createSessionClient,
} from "@/lib/appwrite/server";
import { uuidv4 } from "@/lib/guid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signUpUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
) {
    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const client = await createAdminClient();
        const user = await client.account.create(uuidv4(), email, password);

        await client.users.updateName(user.$id, `${firstName} ${lastName}`);
        await client.users.updateLabels(user.$id, ['GUEST']);

        return { message: "Account created successfully" };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err) {
            switch (err.type) {
                case "user_already_exists":
                    return { error: "User already exists" };
            }
        }
        return { error: "Create account failed" };
    }
}

export async function signUpWithGoogle() {
    const client = await createAdminClient();

    const redirectUrl = await client.account.createOAuth2Token(
        OAuthProvider.Google,
        `${process.env.NEXT_PUBLIC_URL!}/oauth`,
        `${process.env.NEXT_PUBLIC_URL!}/register`
    );

    return redirect(redirectUrl);
}

export async function logoutUser() {
    try {
        const client = await createSessionClient();
        const sessionId = ((await cookies()).get("user-session-id"));
        (await cookies()).delete("user-session");
        (await cookies()).delete("user-session-id");
        await client.account.deleteSession(sessionId!.value);
        return { message: "Logout successful" };
    } catch {
        return { error: "Logout failed" };
    }
}
