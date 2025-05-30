/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "../appwrite/server";
import { Query } from "node-appwrite";
import { parseMessages } from "../domains/chats.domain";

const DATABASE_ID = 'Core';
const CHATS_COLLECTION_ID = 'Chats';
const ADMIN_EMAIL = 'admin@web.com';

// Get the default admin for new users to chat with - simplified to avoid DB query
export async function getDefaultAdmin() {
    try {
        // Return hardcoded admin info since we're only using one admin
        return {
            data: {
                $id: ADMIN_EMAIL,
                name: "MediCare Support",
                email: ADMIN_EMAIL
            }
        };
    } catch (error: any) {
        console.error("Error getting admin:", error);
        return { error: error.message || "Failed to get admin" };
    }
}

// Get participant info for the admin user
export async function getAdminInfo() {
    return {
        data: {
            name: "MediCare Support",
            role: "Customer Support",
            avatar: `/api/avatar?name=Support`,
            online: true,
        }
    };
}

// Initialize a chat with the admin if none exists
export async function ensureDefaultAdminChat() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authenticated" };
        }

        const { databases } = await createAdminClient();

        // Check if user already has any chats with the admin
        const existingChats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [
                Query.equal("user_id", user.$id),
                Query.equal("admin_id", ADMIN_EMAIL),
                Query.limit(1)
            ]
        );

        // If user already has a chat with admin, return it
        if (existingChats.total > 0) {
            return { data: existingChats.documents[0] };
        }

        // Create chat with admin
        const initialMessages = [{
            $id: crypto.randomUUID(),
            sender_id: ADMIN_EMAIL,
            content: "Welcome to MediCare! I'm your support assistant. How can I help you today?",
            timestamp: new Date(),
            is_read: false
        }];

        const newChat = await databases.createDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            "unique()",
            {
                user_id: user.$id,
                admin_id: ADMIN_EMAIL,
                messages: JSON.stringify(initialMessages)
            }
        );

        return { data: newChat };
    } catch (error: any) {
        console.error("Error ensuring default chat:", error);
        return { error: error.message || "Failed to create default chat" };
    }
}

// Create a new support chat for the user
export async function createSupportChat() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authenticated" };
        }

        const { databases } = await createAdminClient();

        // Check if user already has any chats with admin
        const existingChats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [
                Query.equal("user_id", user.$id),
                Query.equal("admin_id", ADMIN_EMAIL),
                Query.limit(1)
            ]
        );

        // If user already has a support chat, return it
        if (existingChats.total > 0) {
            return { data: existingChats.documents[0] };
        }

        // Create a new support chat
        const initialMessages = [{
            $id: crypto.randomUUID(),
            sender_id: ADMIN_EMAIL,
            content: "Hello! Welcome to MediCare support. How can we help you today?",
            timestamp: new Date(),
            is_read: false
        }];

        try {
            const newChat = await databases.createDocument(
                DATABASE_ID,
                CHATS_COLLECTION_ID,
                "unique()",
                {
                    user_id: user.$id,
                    admin_id: ADMIN_EMAIL,
                    messages: JSON.stringify(initialMessages)
                }
            );

            return { data: newChat };
        } catch (createError) {
            console.error("Error creating support chat document:", createError);
            return { error: "Failed to create support chat. Please try again." };
        }
    } catch (error: any) {
        console.error("Error creating support chat:", error);
        return { error: error.message || "Failed to create support chat" };
    }
}

// Get or create a support chat (ensures user always has a support chat)
export async function getOrCreateSupportChat() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authenticated" };
        }

        const { databases } = await createAdminClient();

        // Check if user already has any chats with admin
        const existingChats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [
                Query.equal("user_id", user.$id),
                Query.equal("admin_id", ADMIN_EMAIL),
                Query.limit(1)
            ]
        );

        // If user already has a support chat, return it
        if (existingChats.total > 0) {
            return { data: existingChats.documents[0] };
        }

        // Create a new support chat
        return await createSupportChat();
    } catch (error: any) {
        console.error("Error getting/creating support chat:", error);
        return { error: error.message || "Failed to get/create support chat" };
    }
}

// Mark all messages in a support chat as read
export async function markSupportChatAsRead(chatId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authenticated" };
        }

        const { databases } = await createAdminClient();

        // Get the current chat
        const chatResult = await databases.getDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        // Verify this is a chat the user is part of
        if (chatResult.user_id !== user.$id && chatResult.admin_id !== user.$id) {
            return { error: "Not authorized to access this chat" };
        }

        // Parse messages using the imported function
        const messages = parseMessages(chatResult.messages || "[]");

        // Only mark messages from the other participant as read
        let updated = false;
        const updatedMessages = messages.map((msg: any) => {
            // If the message is not from the current user and is unread, mark it as read
            if (msg.sender_id !== user.$id && !msg.is_read) {
                updated = true;
                return { ...msg, is_read: true };
            }
            return msg;
        });

        // Only update if there were unread messages
        if (updated) {
            await databases.updateDocument(
                DATABASE_ID,
                CHATS_COLLECTION_ID,
                chatId,
                { messages: JSON.stringify(updatedMessages) }
            );

            console.log("Marked messages as read in chat:", chatId);
        }

        return { success: true, updated };
    } catch (error: any) {
        console.error("Error marking chat as read:", error);
        return { error: error.message || "Failed to mark chat as read" };
    }
}
