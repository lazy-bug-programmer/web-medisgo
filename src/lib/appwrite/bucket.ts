/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { ID } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "./server";

const STORAGE_BUCKET_ID = 'Core';

export async function uploadImage(file: File) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { storage } = await createAdminClient();

        // Upload file to storage
        const fileId = ID.unique();

        // Create file input for Appwrite
        await storage.createFile(
            STORAGE_BUCKET_ID,
            fileId,
            file,
        );

        return {
            data: {
                fileId
            }
        };
    } catch (error: any) {
        console.error("Error uploading doctor image:", error);
        return { error: error.message || "Failed to upload doctor image" };
    }
}

export async function getImage(id: string) {
    try {
        const { storage } = await createAdminClient();

        const file = await storage.getFileDownload(STORAGE_BUCKET_ID, id);

        return {
            data: {
                file
            }
        };
    } catch (error: any) {
        console.error("Error getting doctor image:", error);
        return { error: error.message || "Failed to get doctor image" };
    }
}