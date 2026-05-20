"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useVoting } from "@/hooks/useVoting";
import { SessionList } from "@/components/features/voting/SessionList";
import { Button } from "@/components/ui";

export default function VotingPage() {
  const { sessions, loading, error, isEmpty, fetchSessions } = useVoting();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Voting Sessions</h1>
        <Link href="/voting/create">
          <Button>New Session</Button>
        </Link>
      </div>

      <SessionList
        sessions={sessions}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        onRetry={fetchSessions}
      />
    </div>
  );
}
