"use server"

import { Query } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "../appwrite/server";

export async function getAllUsers(limit = 10000, offset = 0) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized", total: 0 };
        }

        const client = await createAdminClient();

        const queries = [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc("$createdAt")
        ];

        const response = await client.users.list(queries);

        // Return only serializable properties of each user
        return {
            data: response.users,
            total: response.total
        };
    } catch (error) {
        console.error("Error getting users:", error);
        return { error: "Failed to get user accounts", total: 0 };
    }
}
