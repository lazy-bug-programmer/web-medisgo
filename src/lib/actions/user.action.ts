/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { Query } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "../appwrite/server";

export async function getAllUsers(limit = 10000, offset = 0) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized", total: 0 };
        }

        const { users } = await createAdminClient();

        const queries = [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc("$createdAt")
        ];

        const response = await users.list(queries);

        // Return only serializable properties of each user
        return {
            data: response.users,
            total: response.total
        };
    } catch (error: any) {
        console.error("Error getting users:", error);
        return { error: error.message || "Failed to get user accounts", total: 0 };
    }
}

export async function getUserById(userId: string) {
    try {
        const currentUser = await getLoggedInUser();
        if (!currentUser) {
            return { error: "Not authorized" };
        }

        // If requesting own profile or user is admin
        if (currentUser.$id === userId || currentUser.email === 'admin@web.com') {
            const { users } = await createAdminClient();
            const user = await users.get(userId);

            return { data: user };
        }

        return { error: "Not authorized to view this user" };
    } catch (error: any) {
        console.error("Error getting user:", error);
        return { error: error.message || "Failed to get user" };
    }
}
