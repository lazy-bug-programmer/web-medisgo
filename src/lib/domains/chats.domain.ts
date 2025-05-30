export interface Chat {
    $id: string;
    user_id: string;
    admin_id: string;
    messages: string; // JSON stringified array of messages
}

export interface Message {
    $id: string;
    is_read: boolean; // whether the message has been read
    sender_id: string; // user_id or admin_id
    content: string; // message content
    timestamp: Date; // when the message was sent
}

// Helper functions to ensure consistent message handling
export function parseMessages(messagesJson: string): Message[] {
    try {
        const parsed = JSON.parse(messagesJson || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Error parsing messages:", error);
        return [];
    }
}

export function stringifyMessages(messages: Message[]): string {
    try {
        return JSON.stringify(messages || []);
    } catch (error) {
        console.error("Error stringifying messages:", error);
        return "[]";
    }
}