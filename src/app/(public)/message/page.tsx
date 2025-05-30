/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Plus, Headset, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserChats, adminGetAllChats } from "@/lib/actions/chats.action";
import { getLoggedInUser } from "@/lib/appwrite/server";
import { useRouter } from "next/navigation";
import { Models, RealtimeResponseEvent } from "appwrite";
import { Chat, Message, parseMessages } from "@/lib/domains/chats.domain";
import { createClient } from "@/lib/appwrite/client";
import { getOrCreateSupportChat } from "@/lib/actions/message.action";
import { getAllUsers } from "@/lib/actions/user.action";

// Default admin chat if no conversations exist
const defaultAdminChat = {
  $id: "admin",
  participant: {
    name: "MediCare Support",
    role: "Customer Support",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  lastMessage: {
    content: "Welcome to MediCare! How can we help you today?",
    timestamp: "Just now",
    unread: true,
  },
  unreadCount: 1,
};

// Type for processed chats for display
interface ProcessedChat {
  $id: string;
  participant: {
    name: string;
    role: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    unread: boolean;
  };
  unreadCount: number;
}

// Custom avatar component for users
const UserAvatar = ({ user, online }: { user: any; online: boolean }) => {
  return (
    <div className="relative">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={user.avatar || "/api/avatar?name=User"}
          alt={user.name}
        />
        <AvatarFallback className="bg-blue-100 text-blue-600">
          {user.name?.charAt(0) || <User className="h-6 w-6" />}
        </AvatarFallback>
      </Avatar>
      {online && (
        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

function ChatList({
  chats,
  loading,
}: {
  chats: ProcessedChat[];
  loading: boolean;
}) {
  if (loading) {
    return <MessagesLoading />;
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No conversations
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Start a conversation with our support team
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {chats.map((chat) => (
        <Link
          key={chat.$id}
          href={`/message/${chat.$id}`}
          className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <UserAvatar
              user={chat.participant}
              online={chat.participant.online}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.participant.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.participant.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {chat.unreadCount > 0 && (
                    <Badge variant="default" className="bg-blue-600 text-white">
                      {chat.unreadCount}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">
                    {chat.lastMessage.timestamp}
                  </span>
                </div>
              </div>

              <p
                className={`text-sm mt-1 truncate ${
                  chat.lastMessage.unread
                    ? "text-gray-900 font-medium"
                    : "text-gray-600"
                }`}
              >
                {chat.lastMessage.content}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function MessagesLoading() {
  return (
    <div className="space-y-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MessagesPage() {
  const client = createClient();
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [chats, setChats] = useState<ProcessedChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDetails, setUserDetails] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  // Process raw chat data into display format
  const processChats = async (rawChats: Chat[], isAdminUser = false) => {
    if (!rawChats || rawChats.length === 0) {
      return isAdminUser ? [] : [defaultAdminChat];
    }

    // For admin view, get all user details first to avoid multiple API calls
    if (isAdminUser) {
      try {
        const usersResult = await getAllUsers();
        if (!usersResult.error && usersResult.data) {
          const usersMap: { [key: string]: any } = {};

          // Create a map of user IDs to user details
          usersResult.data.forEach((user: any) => {
            usersMap[user.$id] = {
              name:
                user.name ||
                `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                user.email.split("@")[0],
              email: user.email || "",
              avatar: `/api/avatar?name=${encodeURIComponent(
                user.name || user.email
              )}`,
            };
          });

          // Update the user details state
          setUserDetails(usersMap);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    // Process each chat
    return rawChats.map((chat) => {
      // Parse messages from JSON string
      const messages = parseMessages(chat.messages || "[]");
      const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;

      // Count unread messages where sender is not the current user
      const unreadCount = messages.filter(
        (msg: Message) => !msg.is_read && msg.sender_id !== currentUser?.$id
      ).length;

      if (isAdminUser) {
        // For admin users, show the actual user information
        const userInfo = userDetails[chat.user_id] || {
          name: `User (${chat.user_id.substring(0, 8)}...)`,
          email: "",
          avatar: `/api/avatar?name=User`,
        };

        return {
          $id: chat.$id,
          participant: {
            name: userInfo.name,
            role: userInfo.email || "Patient",
            avatar: userInfo.avatar,
            online: false,
          },
          lastMessage: {
            content: lastMessage?.content || "No messages yet",
            timestamp: lastMessage
              ? formatTimestamp(new Date(lastMessage.timestamp))
              : "Never",
            unread: lastMessage
              ? !lastMessage.is_read &&
                lastMessage.sender_id !== currentUser?.$id
              : false,
          },
          unreadCount,
        };
      } else {
        // For regular users, always show the admin as the participant
        return {
          $id: chat.$id,
          participant: {
            name: "MediCare Support",
            role: "Customer Support",
            avatar: "/placeholder.svg?height=40&width=40",
            online: true,
          },
          lastMessage: {
            content: lastMessage?.content || "No messages yet",
            timestamp: lastMessage
              ? formatTimestamp(new Date(lastMessage.timestamp))
              : "Never",
            unread: lastMessage
              ? !lastMessage.is_read &&
                lastMessage.sender_id !== currentUser?.$id
              : false,
          },
          unreadCount,
        };
      }
    });
  };

  // Format timestamp to relative time
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  };

  // Start a new chat with admin/support
  const startAdminChat = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // Use the helper function to get or create a support chat
      const result = await getOrCreateSupportChat();

      if (result.data) {
        router.push(`/message/${result.data.$id}`);
      } else {
        console.error("Failed to create chat:", result.error);
      }
    } catch (error) {
      console.error("Error creating admin chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  const checkIsAdmin = async (user: Models.User<Models.Preferences>) => {
    // Check if user email is admin@web.com (as defined in your message.action.ts)
    return user.email === "admin@web.com";
  };

  // Fetch user and chats on component mount
  useEffect(() => {
    const fetchUserAndChats = async () => {
      try {
        setLoading(true);
        const user = await getLoggedInUser();
        setCurrentUser(user);

        if (user) {
          const userIsAdmin = await checkIsAdmin(user);
          setIsAdmin(userIsAdmin);

          if (userIsAdmin) {
            // For admin users, fetch all chats
            const result = await adminGetAllChats();
            if (result.data && result.data.length > 0) {
              const processedChats = await processChats(
                result.data as unknown as Chat[],
                true
              );
              setChats(processedChats);
            } else {
              setChats([]);
            }
          } else {
            // For regular users, fetch only their chats
            const result = await getUserChats();
            if (result.data && result.data.length > 0) {
              const processedChats = await processChats(
                result.data as unknown as Chat[]
              );
              setChats(processedChats);
            } else {
              // Show default admin chat if no chats exist for regular users
              setChats([defaultAdminChat]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChats([defaultAdminChat]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndChats();
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    if (!currentUser) return;

    // Subscribe to changes in the Chats collection
    const unsubscribe = client.client.subscribe<Models.Document>(
      `databases.Core.collections.Chats.documents`,
      async (response: RealtimeResponseEvent<Models.Document>) => {
        // Refresh chats when changes occur
        if (isAdmin) {
          // For admin, refresh all chats
          const result = await adminGetAllChats();
          if (result.data) {
            const processedChats = await processChats(
              result.data as unknown as Chat[],
              true
            );
            setChats(processedChats);
          }
        } else {
          // For regular users, only process events related to their chats
          const chatDoc = response.payload;
          if (chatDoc.user_id === currentUser.$id) {
            getUserChats().then((result) => {
              if (result.data) {
                const processedChats = processChats(
                  result.data as unknown as Chat[]
                );
                setChats(processedChats as unknown as ProcessedChat[]);
              }
            });
          }
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [currentUser, isAdmin, client.client]);

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Headset className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">
                  {isAdmin ? "All Support Conversations" : "Support Chat"}
                </h1>
                {totalUnread > 0 && (
                  <Badge variant="default" className="bg-blue-600 text-white">
                    {totalUnread}
                  </Badge>
                )}
              </div>
            </div>

            {!isAdmin && chats.length > 0 && chats[0].$id !== "admin" && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={startAdminChat}
              >
                <Plus className="h-4 w-4" />
                <span>New Conversation</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Chat List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">
              {isAdmin ? "Patient Conversations" : "MediCare Support"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isAdmin
                ? `${chats.length} conversation${chats.length !== 1 ? "s" : ""}`
                : chats.length > 0 && chats[0].$id !== "admin"
                ? `${chats.length} conversation${chats.length !== 1 ? "s" : ""}`
                : "Start a conversation with our support team"}
              {totalUnread > 0 &&
                ` • ${totalUnread} unread message${
                  totalUnread !== 1 ? "s" : ""
                }`}
            </p>
          </div>

          <ChatList chats={chats} loading={loading} />

          {/* Default action to start a chat if none exists - only for non-admin users */}
          {!isAdmin &&
            (!chats.length ||
              (chats.length === 1 && chats[0].$id === "admin")) &&
            !loading && (
              <div className="p-6 text-center">
                <Button
                  onClick={startAdminChat}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start chatting with support
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
