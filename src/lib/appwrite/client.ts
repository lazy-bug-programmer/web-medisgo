import { Account, Client, Databases, Storage, Avatars, ID } from "appwrite";

// Create a singleton client for better realtime performance
let client: Client | null = null;
let account: Account | null = null;
let databases: Databases | null = null;
let storage: Storage | null = null;
let avatars: Avatars | null = null;

export function createClient() {
  // Initialize client if it doesn't exist yet
  if (!client) {
    console.log("Creating new Appwrite client instance");
    client = new Client();

    // Configure client with environment variables
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    // Initialize services
    account = new Account(client);
    databases = new Databases(client);
    storage = new Storage(client);
    avatars = new Avatars(client);
  }

  return {
    client,
    account: account!,
    databases: databases!,
    storage: storage!,
    avatars: avatars!,
    id: ID, // Export ID for easier generation of unique IDs
  };
}

// Reset client (useful for testing or when switching accounts)
export function resetClient() {
  client = null;
  account = null;
  databases = null;
  storage = null;
  avatars = null;
}
