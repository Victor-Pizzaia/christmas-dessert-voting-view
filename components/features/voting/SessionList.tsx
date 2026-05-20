"use client";

import Link from "next/link";
import type { VotingSession } from "@/types/voting";
import { Card } from "@/components/ui";

interface SessionListProps {
  sessions: VotingSession[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
}

export function SessionList({
  sessions,
  loading,
  error,
  isEmpty,
  onRetry,
}: SessionListProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-zinc-200" />
            <div className="mt-4 h-8 w-24 animate-pulse rounded bg-zinc-200" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-green-600 underline hover:text-green-700"
        >
          Try again
        </button>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className="text-center">
        <p className="text-zinc-500">No voting sessions yet.</p>
        <p className="mt-1 text-sm text-zinc-400">
          Create your first voting session to get started.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <h3 className="font-semibold text-zinc-900">
            Christmas {session.year}
          </h3>
          <div className="mt-2 flex gap-2">
            {session.isOpenToSubscribe && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                Subscriptions open
              </span>
            )}
            {session.isOpenToVote && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Voting open
              </span>
            )}
            {!session.isOpenToSubscribe && !session.isOpenToVote && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
                Closed
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/voting/${session.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
            >
              View
            </Link>
            <Link
              href={`/voting/${session.id}/results`}
              className="inline-flex items-center justify-center rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
            >
              Results
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
