"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/desserts"
          className="text-lg font-bold text-green-700"
        >
          Christmas Dessert Voting
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/desserts"
            className="text-zinc-600 hover:text-zinc-900"
          >
            Desserts
          </Link>
          <Link
            href="/voting"
            className="text-zinc-600 hover:text-zinc-900"
          >
            Voting
          </Link>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">{user.name}</span>
              <button
                onClick={logout}
                className="rounded bg-zinc-100 px-3 py-1 text-zinc-700 hover:bg-zinc-200"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
