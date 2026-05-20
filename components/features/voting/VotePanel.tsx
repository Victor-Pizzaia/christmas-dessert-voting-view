"use client";

import type { DessertInSession } from "@/types/voting";
import { Card, Button } from "@/components/ui";

interface VotePanelProps {
  subscribed: DessertInSession[];
  loading: boolean;
  sessionOpen: boolean;
  onVote: (dessertId: number) => Promise<void>;
}

export function VotePanel({
  subscribed,
  loading,
  sessionOpen,
  onVote,
}: VotePanelProps) {
  if (!sessionOpen) {
    return (
      <Card className="text-center">
        <p className="text-zinc-500">Voting is closed for this session.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-zinc-200" />
          </Card>
        ))}
      </div>
    );
  }

  if (subscribed.length === 0) {
    return (
      <Card className="text-center">
        <p className="text-zinc-500">
          No desserts subscribed yet. Wait for subscriptions to open.
        </p>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800">
        Cast Your Vote
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscribed.map((dessert) => (
          <Card key={dessert.id}>
            <h3 className="font-semibold text-zinc-900">{dessert.name}</h3>
            {dessert.description && (
              <p className="mt-1 text-sm text-zinc-500">
                {dessert.description}
              </p>
            )}
            <div className="mt-3">
              <Button size="sm" onClick={() => onVote(dessert.id)}>
                Vote
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
