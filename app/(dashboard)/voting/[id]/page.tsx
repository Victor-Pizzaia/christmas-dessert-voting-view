"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useVoting } from "@/hooks/useVoting";
import { SubscribePanel } from "@/components/features/voting/SubscribePanel";
import { VotePanel } from "@/components/features/voting/VotePanel";
import { Card, Button } from "@/components/ui";
import type { SessionDetails } from "@/types/voting";
import type { Dessert } from "@/types/dessert";
import { api } from "@/lib/api";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params.id as string;
  const { subscribeDessert, castVote } = useVoting();

  const [session, setSession] = useState<SessionDetails | null>(null);
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
        err instanceof Error ? err.message : "Falha ao carregar sessão";
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
    async (dessertId: string, name: string) => {
      await subscribeDessert(sessionId, dessertId, name);
      await loadData();
    },
    [sessionId, subscribeDessert, loadData]
  );

  const handleVote = useCallback(
    async (dessertId: string) => {
      await castVote(sessionId, dessertId);
    },
    [sessionId, castVote]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-rose" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="h-4 w-3/4 animate-pulse rounded bg-rose" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-rose" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <p className="text-cherry">{error}</p>
        <button
          onClick={loadData}
          className="mt-2 text-sm text-cherry underline hover:text-dark-choc"
        >
          Tentar novamente
        </button>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card className="text-center">
        <p className="text-milk-choc">Sessão não encontrada.</p>
      </Card>
    );
  }

  const subscribedDesserts = session.subscribedDesserts?.map((sd) => ({
    id: sd.dessertId,
    name: sd.name,
    subscribed: true,
  })) ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-choc">
            {session.name}
          </h1>
          <div className="mt-1 flex gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              session.isOpenToVote
                ? "bg-strawberry/30 text-cherry"
                : "bg-lavender/50 text-dark-choc"
            }`}>
              {session.isOpenToVote ? "Votação Aberta" : "Inscrições Abertas"}
            </span>
            <span className="rounded-full bg-caramel/50 px-2 py-0.5 text-xs font-medium text-milk-choc">
              {session.numberOfParticipants} participantes
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/voting/${sessionId}`
              );
            }}
          >
            Copiar Link
          </Button>
          <Link href={`/voting/${sessionId}/results`}>
            <Button variant="secondary">Resultados</Button>
          </Link>
        </div>
      </div>

      <SubscribePanel
        subscribed={subscribedDesserts}
        available={available}
        loading={loading}
        sessionOpen={!session.isOpenToVote}
        onSubscribe={handleSubscribe}
      />

      <VotePanel
        subscribed={subscribedDesserts}
        loading={loading}
        sessionOpen={session.isOpenToVote}
        onVote={handleVote}
      />
    </div>
  );
}
