"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useVoting } from "@/hooks/useVoting";
import { SubscribePanel } from "@/components/features/voting/SubscribePanel";
import { VotePanel } from "@/components/features/voting/VotePanel";
import { Card, Button } from "@/components/ui";
import type { DessertInSession } from "@/types/voting";
import type { Dessert } from "@/types/dessert";
import { api } from "@/lib/api";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = Number(params.id);
  const { subscribeDessert, castVote } = useVoting();

  const [session, setSession] = useState<{
    id: number;
    year: number;
    isOpenToVote: boolean;
    isOpenToSubscribe: boolean;
    desserts: DessertInSession[];
  } | null>(null);
  const [available, setAvailable] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sessionRes, dessertsRes] = await Promise.all([
        api.get(`/voting/${sessionId}`),
        api.get("/desserts"),
      ]);
      setSession(sessionRes.data);
      setAvailable(dessertsRes.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load session";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleSubscribe = useCallback(
    async (dessertId: number) => {
      await subscribeDessert(sessionId, dessertId);
      await loadData();
    },
    [sessionId, subscribeDessert, loadData]
  );

  const handleVote = useCallback(
    async (dessertId: number) => {
      await castVote(sessionId, dessertId);
    },
    [sessionId, castVote]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-zinc-200" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadData}
          className="mt-2 text-sm text-green-600 underline hover:text-green-700"
        >
          Try again
        </button>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="text-center">
        <p className="text-zinc-500">Session not found.</p>
      </Card>
    );
  }

  const subscribed = session.desserts?.filter((d) => d.subscribed) ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Christmas {session.year}
          </h1>
          <div className="mt-1 flex gap-2">
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
          </div>
        </div>
        <Link href={`/voting/${sessionId}/results`}>
          <Button variant="secondary">View Results</Button>
        </Link>
      </div>

      <SubscribePanel
        subscribed={subscribed}
        available={available}
        loading={loading}
        sessionOpen={session.isOpenToSubscribe}
        onSubscribe={handleSubscribe}
      />

      <VotePanel
        subscribed={subscribed}
        loading={loading}
        sessionOpen={session.isOpenToVote}
        onVote={handleVote}
      />
    </div>
  );
}
