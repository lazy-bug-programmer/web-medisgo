"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Models } from "appwrite";
import { getLoggedInUser } from "@/lib/appwrite/server";
import { createClient } from "@/lib/appwrite/client";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/lib/actions/auth.action";
import { toast } from "sonner";

export function UserDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const client = createClient();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      setUser(user);
    };

    getUser();

    const unsubscribe = client.client.subscribe(`account`, (response) => {
      if (response.events.includes("users.*.sessions.*.create")) {
        client.account.get().then(
          (user) => setUser(user),
          () => setUser(null)
        );
      }

      if (response.events.includes("users.*.sessions.*.delete")) {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      try {
        await client.account.deleteSession("current");
      } catch {}

      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/auth/login");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setDropdownOpen(false);
  };

  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user || !user.name) return "?";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white"
            aria-label="User menu"
          >
            {getUserInitial()}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-20 border">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user.name || user.email}
              </div>
              {user.labels.includes("ADMIN") && (
                <Link
                  href="/admin"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                href="/dashboard"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/auth/login"
          className="text-sm font-medium px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
}
