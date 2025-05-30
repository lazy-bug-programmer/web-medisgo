/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, createSessionClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Chat, Message } from "../domains/chats.domain";

const DATABASE_ID = 'Core';
const CHATS_COLLECTION_ID = 'Chats';

// CREATE
export async function createChat(chat: Omit<Chat, "$id">) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // Initialize with empty messages array
        const initialMessages: Message[] = [];

        const newChat = await databases.createDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            "unique()",
            {
                user_id: chat.user_id,
                admin_id: chat.admin_id,
                messages: JSON.stringify(initialMessages)
            }
        );

        return { data: newChat };
    } catch (error: any) {
        console.error("Error creating chat:", error);
        return { error: error.message || "Failed to create chat" };
    }
}

// READ
export async function getChats(limit = 10000) {
    try {
        const { databases } = await createSessionClient();

        const chats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("$createdAt")]
        );

        return { data: chats.documents, total: chats.total };
    } catch (error: any) {
        console.error("Error getting chats:", error);
        return { error: error.message || "Failed to get chats" };
    }
}

export async function getChatById(chatId: string) {
    try {
        const { databases } = await createClient();

        const chat = await databases.getDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        return { data: chat };
    } catch (error: any) {
        console.error("Error getting chat:", error);
        return { error: error.message || "Failed to get chat" };
    }
}

export async function getUserChats() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        const chats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [Query.equal("user_id", user.$id)]
        );

        return { data: chats.documents, total: chats.total };
    } catch (error: any) {
        console.error("Error getting user chats:", error);
        return { error: error.message || "Failed to get user chats" };
    }
}

export async function getDoctorChats(doctorId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        const chats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [Query.equal("admin_id", doctorId)]
        );

        return { data: chats.documents, total: chats.total };
    } catch (error: any) {
        console.error("Error getting doctor chats:", error);
        return { error: error.message || "Failed to get doctor chats" };
    }
}

// UPDATE
export async function addMessage(chatId: string, message: Omit<Message, "$id">) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // Get the existing chat
        const chatResult = await getChatById(chatId);
        if (chatResult.error) {
            return chatResult;
        }

        const chat = chatResult.data;

        // Ensure chat exists
        if (!chat) {
            return { error: "Chat not found" };
        }

        // Parse the existing messages
        let existingMessages: Message[] = [];
        try {
            existingMessages = JSON.parse(chat.messages || "[]");
            // Validate that it's an array
            if (!Array.isArray(existingMessages)) {
                existingMessages = [];
            }
        } catch (error) {
            console.error("Error parsing messages:", error);
            // Reset to empty array if parsing fails
            existingMessages = [];
        }

        // Add the new message with a generated ID
        const newMessage: Message = {
            $id: crypto.randomUUID(),
            is_read: false,
            sender_id: message.sender_id,
            content: message.content,
            timestamp: message.timestamp
        };

        existingMessages.push(newMessage);

        // Update the chat document
        try {
            const updatedChat = await databases.updateDocument(
                DATABASE_ID,
                CHATS_COLLECTION_ID,
                chatId,
                {
                    messages: JSON.stringify(existingMessages)
                }
            );

            return { data: updatedChat };
        } catch (updateError: any) {
            console.error("Error updating chat with new message:", updateError);
            return { error: updateError.message || "Failed to update chat with new message" };
        }
    } catch (error: any) {
        console.error("Error adding message:", error);
        return { error: error.message || "Failed to add message" };
    }
}

export async function updateChat(chatId: string, updates: Partial<Chat>) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the chat belongs to the user
        const chat = await databases.getDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        if (chat.user_id !== user.$id && chat.admin_id !== user.$id) {
            return { error: "Not authorized to update this chat" };
        }

        const updatedChat = await databases.updateDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId,
            updates
        );

        return { data: updatedChat };
    } catch (error: any) {
        console.error("Error updating chat:", error);
        return { error: error.message || "Failed to update chat" };
    }
}

// DELETE
export async function deleteChat(chatId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the chat belongs to the user
        const chat = await databases.getDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        if (chat.user_id !== user.$id && chat.admin_id !== user.$id) {
            return { error: "Not authorized to delete this chat" };
        }

        await databases.deleteDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        return { message: "Chat deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting chat:", error);
        return { error: error.message || "Failed to delete chat" };
    }
}

// Admin operations
export async function adminGetAllChats(limit = 10000) {
    try {
        const { databases } = await createAdminClient();

        const chats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("$createdAt")]
        );

        return { data: chats.documents, total: chats.total };
    } catch (error: any) {
        console.error("Error getting all chats:", error);
        return { error: error.message || "Failed to get all chats" };
    }
}

export async function adminUpdateChat(chatId: string, updates: Partial<Chat>) {
    try {
        const { databases } = await createAdminClient();

        const updatedChat = await databases.updateDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId,
            updates
        );

        return { data: updatedChat };
    } catch (error: any) {
        console.error("Error updating chat:", error);
        return { error: error.message || "Failed to update chat" };
    }
}

export async function adminDeleteChat(chatId: string) {
    try {
        const { databases } = await createAdminClient();

        await databases.deleteDocument(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            chatId
        );

        return { message: "Chat deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting chat:", error);
        return { error: error.message || "Failed to delete chat" };
    }
}

export async function getPatientChats(patientId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // Get the patient to verify ownership
        const patientResult = await databases.getDocument(
            DATABASE_ID,
            'Patients',
            patientId
        );

        // Check if the current user owns this patient
        if (patientResult.user_id !== user.$id) {
            return { error: "Not authorized to view this patient's chats" };
        }

        // Get chats where the user is the patient's user_id
        const chats = await databases.listDocuments(
            DATABASE_ID,
            CHATS_COLLECTION_ID,
            [Query.equal("user_id", patientResult.user_id)]
        );

        return { data: chats.documents, total: chats.total };
    } catch (error: any) {
        console.error("Error getting patient chats:", error);
        return { error: error.message || "Failed to get patient chats" };
    }
}

// Helper function to create a regular client - this was missing and causing errors
async function createClient() {
    const { databases } = await createAdminClient();
    return { databases };
}
