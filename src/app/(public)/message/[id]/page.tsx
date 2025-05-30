/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, Headset, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getChatById, addMessage } from "@/lib/actions/chats.action";
import {
  markSupportChatAsRead,
  createSupportChat,
  getOrCreateSupportChat,
} from "@/lib/actions/message.action";
import { getLoggedInUser } from "@/lib/appwrite/server";
import { Models, RealtimeResponseEvent } from "appwrite";
import { createClient } from "@/lib/appwrite/client";
import { Message, parseMessages } from "@/lib/domains/chats.domain";
import { format } from "date-fns";
import { getAllUsers } from "@/lib/actions/user.action";

// Admin information
const ADMIN_INFO = {
  name: "MediCare Support",
  role: "Customer Support",
  avatar: "/placeholder.svg?height=40&width=40",
  online: true,
};

// Admin email for identification
const ADMIN_EMAIL = "admin@web.com";

function MessageBubble({
  message,
  isOwn,
  isAdmin,
  userName = "",
}: {
  message: any;
  isOwn: boolean;
  isAdmin: boolean;
  userName?: string;
}) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Show username for admin when viewing user messages */}
        {isAdmin && !isOwn && (
          <div className="flex items-center mb-1 text-xs text-gray-500">
            <User className="h-3 w-3 mr-1" />
            <span>{userName || "User"}</span>
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

function MessagesLoading() {
  return (
    <div className="flex-1 p-4 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="max-w-xs lg:max-w-md">
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Format the date/time of a message
function formatMessageTime(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);

  if (messageDate.toDateString() === today.toDateString()) {
    return format(messageDate, "h:mm a"); // Today at 10:30 AM
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${format(messageDate, "h:mm a")}`; // Yesterday at 10:30 AM
  } else {
    return format(messageDate, "MMM d, h:mm a"); // Jan 1 at 10:30 AM
  }
}

// Group messages by date for display
function groupMessagesByDate(messages: Message[]): Record<string, Message[]> {
  const grouped: Record<string, Message[]> = {};

  messages.forEach((message) => {
    const date = new Date(message.timestamp);
    const dateKey = format(date, "yyyy-MM-dd");

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(message);
  });

  return grouped;
}

// Format the date key for display
function formatDateKey(dateKey: string): string {
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");

  if (dateKey === today) {
    return "Today";
  } else if (dateKey === yesterday) {
    return "Yesterday";
  } else {
    return format(new Date(dateKey), "MMMM d, yyyy");
  }
}

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const chatId = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("Patient");
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Improved scroll to bottom function with a force option
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
      console.log(
        "Scrolled to bottom:",
        messagesContainerRef.current.scrollHeight
      );
    }
  };

  // Check if current user is admin
  const checkIsAdmin = (user: Models.User<Models.Preferences>) => {
    return user.email === ADMIN_EMAIL;
  };

  // Enhanced function to fetch user information by ID
  const fetchUserInfo = async (userId: string) => {
    try {
      // First, check if we already have this user's details cached
      if (userDetails[userId]) {
        return userDetails[userId];
      }

      // Otherwise, fetch user details from the server
      const result = await getAllUsers();

      if (result.error || !result.data) {
        return { name: `User (${userId.substring(0, 8)}...)`, email: "" };
      }

      // Find user in the response
      const usersList = result.data;
      const user = usersList.find((u: any) => u.$id === userId);

      if (!user) {
        return { name: `User (${userId.substring(0, 8)}...)`, email: "" };
      }

      // Create a user display info object
      const userInfo = {
        name: user.name || user.email.split("@")[0],
        email: user.email || "",
        avatar: `/api/avatar?name=${encodeURIComponent(
          user.name || user.email
        )}`,
      };

      // Cache this user's details
      setUserDetails((prev) => ({ ...prev, [userId]: userInfo }));

      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return { name: `User (${userId.substring(0, 8)}...)`, email: "" };
    }
  };

  // Fetch chat data
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);

        // Get current user
        const user = await getLoggedInUser();
        setCurrentUser(user);

        if (!user) {
          router.push("/auth/login");
          return;
        }

        // Check if user is admin
        const adminStatus = checkIsAdmin(user);
        setIsAdmin(adminStatus);

        let chatData;

        // Special case for "admin" ID - create a support chat
        if (chatId === "admin") {
          const result = await getOrCreateSupportChat();

          // Redirect to the actual chat
          if (result.data) {
            router.replace(`/message/${result.data.$id}`);
            return;
          }
        }

        // Get chat by ID
        const result = await getChatById(chatId);

        // If chat not found, try to create a support chat
        if (result.error && result.error.includes("not found")) {
          // Try to create a support chat instead
          const createResult = await createSupportChat();
          if (createResult.error) {
            setError(createResult.error);
            setLoading(false);
            return;
          }

          chatData = createResult.data;

          // If we created a new chat but we're not on its URL, redirect
          if (chatData && chatData.$id !== chatId) {
            router.replace(`/message/${chatData.$id}`);
            return;
          }
        } else if (result.error || !result.data) {
          setError(result.error || "Chat not found");
          setLoading(false);
          return;
        } else {
          chatData = result.data;
        }

        // Set chat data
        setChat(chatData);

        // For admin users, fetch the user's details
        if (adminStatus && chatData) {
          const userInfo = await fetchUserInfo(chatData.user_id);
          setUserName(userInfo.name);
        }

        // Parse messages
        const chatMessages = parseMessages(chatData!.messages || "[]");
        setMessages(chatMessages);

        // Mark messages as read
        await markSupportChatAsRead(chatData!.$id);

        setLoading(false);

        // Force scroll to bottom after chat loads
        setTimeout(() => scrollToBottom(), 100);
      } catch (error) {
        console.error("Error fetching chat:", error);
        setError("Failed to load conversation");
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId, router]);

  // Subscribe to realtime updates with improved handling
  useEffect(() => {
    if (!chatId || !currentUser) return;

    console.log("Setting up realtime subscription for chat:", chatId);

    // Create a single client instance for all subscriptions
    const client = createClient();

    // Use a more general subscription pattern to catch all updates
    const unsubscribe = client.client.subscribe(
      "databases.Core.collections.Chats.documents",
      (response: RealtimeResponseEvent<any>) => {
        // Only process events for the current chat
        if (response.payload && response.payload.$id === chatId) {
          // Update chat data
          setChat(response.payload);

          try {
            // Parse messages safely
            let updatedMessages:
              | string
              | any[]
              | ((prevState: Message[]) => Message[]) = [];
            if (response.payload.messages) {
              updatedMessages = parseMessages(response.payload.messages);
              console.log("Parsed messages:", updatedMessages.length);
            }

            // Update messages state
            setMessages(updatedMessages);

            // Mark messages as read after a short delay - consider user role
            setTimeout(() => {
              markSupportChatAsRead(chatId)
                .then((result) => {
                  if (result.error) {
                    console.error(
                      "Error marking messages as read:",
                      result.error
                    );
                  }
                })
                .catch((error) => {
                  console.error("Failed to mark messages as read:", error);
                });
            }, 500);

            // Force scroll to bottom after update
            setTimeout(() => scrollToBottom(), 100);
          } catch (error) {
            console.error("Error processing message update:", error);
          }
        }
      }
    );

    // Setup a periodic refresh as a fallback for realtime issues
    const refreshInterval = setInterval(async () => {
      try {
        const result = await getChatById(chatId);
        if (result.data && !result.error) {
          const chatData = result.data;
          setChat(chatData);

          const chatMessages = parseMessages(chatData.messages || "[]");
          if (chatMessages.length !== messages.length) {
            console.log(
              "Refreshed messages from interval:",
              chatMessages.length
            );
            setMessages(chatMessages);

            // Mark as read and scroll
            await markSupportChatAsRead(chatId);
            setTimeout(scrollToBottom, 100);
          }
        }
      } catch (error) {
        console.error("Error in refresh interval:", error);
      }
    }, 10000); // Refresh every 10 seconds

    // Clean up subscription and interval
    return () => {
      console.log("Cleaning up subscription");
      unsubscribe();
      clearInterval(refreshInterval);
    };
  }, [chatId, currentUser, messages.length]);

  // Ensure scroll to bottom when messages change or when component mounts
  useEffect(() => {
    // Force scroll to bottom on mount and when messages change
    if (!loading && messages.length > 0) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages, loading]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !chat) return;

    try {
      setSending(true);

      // Create new message with the correct format
      const message: Omit<Message, "$id"> = {
        sender_id: currentUser.$id,
        content: newMessage.trim(),
        timestamp: new Date(),
        is_read: false,
      };

      // Optimistically update the UI
      const optimisticMessage: Message = {
        ...message,
        $id: `temp-${Date.now()}`,
      };

      // Optimistically update the messages state
      setMessages((prev) => [...prev, optimisticMessage]);

      // Clear input right away for better UX
      setNewMessage("");

      // Force scroll to bottom immediately after sending
      setTimeout(() => scrollToBottom(), 50);

      // Add message to chat on the server
      const result = await addMessage(chatId, message);

      if (result.error) {
        console.error("Error sending message:", result.error);
        // Remove the optimistic message if there was an error
        setMessages((prev) =>
          prev.filter((msg) => msg.$id !== optimisticMessage.$id)
        );

        // Show error message to the user
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  // Handle enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format and group messages for display
  const groupedMessages = messages.length ? groupMessagesByDate(messages) : {};

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{error}</h2>
          <p className="text-gray-600 mt-2">
            There was a problem loading this conversation.
          </p>
          <div className="mt-6">
            <Button
              onClick={async () => {
                setLoading(true);
                setError(null);
                try {
                  // Try to create a new support chat
                  const result = await createSupportChat();
                  if (result.error) {
                    setError(result.error);
                  } else if (result.data) {
                    // Redirect to the new chat
                    router.push(`/message/${result.data.$id}`);
                  }
                } catch {
                  setError("Failed to create a new conversation");
                } finally {
                  setLoading(false);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 mb-4"
              disabled={loading}
            >
              {loading ? "Creating..." : "Start a new conversation"}
            </Button>
            <div>
              <Link
                href="/message"
                className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
              >
                ← Back to Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modify the message bubble component to show sender details
  const renderMessage = (message: Message) => {
    const isOwn = message.sender_id === currentUser?.$id;
    const messageUser = userDetails[message.sender_id] || {
      name: isOwn ? "You" : isAdmin ? userName : "Support",
    };

    return (
      <MessageBubble
        key={message.$id}
        message={{
          content: message.content,
          timestamp: formatMessageTime(new Date(message.timestamp)),
        }}
        isOwn={isOwn}
        isAdmin={isAdmin}
        userName={messageUser.name}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/message"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        isAdmin
                          ? userDetails[chat?.user_id]?.avatar ||
                            "/api/avatar?name=User"
                          : ADMIN_INFO.avatar
                      }
                      alt={isAdmin ? userName : ADMIN_INFO.name}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {isAdmin ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Headset className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {!isAdmin && ADMIN_INFO.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {isAdmin ? userName : ADMIN_INFO.name}
                  </h1>
                  <p className="text-xs text-gray-500">
                    {isAdmin
                      ? userDetails[chat?.user_id]?.email || "Patient"
                      : ADMIN_INFO.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages - Now with fixed height container */}
      <div className="flex-1 flex flex-col">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] scroll-smooth"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {loading ? (
              <MessagesLoading />
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 py-20">
                <Headset className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Start a conversation
                </h3>
                <p className="text-gray-500 text-center max-w-sm">
                  {isAdmin
                    ? "You can respond to the patient's messages here."
                    : "Send a message to our support team and they'll get back to you soon."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.keys(groupedMessages).map((dateKey) => (
                  <div key={dateKey}>
                    <div className="text-center mb-4">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {formatDateKey(dateKey)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {groupedMessages[dateKey].map((message) =>
                        renderMessage(message)
                      )}
                    </div>
                  </div>
                ))}

                {/* We still keep this ref for accessibility, but scrolling is handled by the container */}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={
                  isAdmin ? "Reply to patient..." : "Type a message..."
                }
                className="pr-10"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sending || loading}
              />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSendMessage}
              disabled={sending || loading || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
