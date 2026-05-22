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
            <div className="h-4 w-2/3 animate-pulse rounded bg-rose" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-rose" />
            <div className="mt-4 h-8 w-24 animate-pulse rounded bg-rose" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center">
        <p className="text-cherry">{error}</p>
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-cherry underline hover:text-dark-choc"
        >
          Tentar novamente
        </button>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className="text-center">
        <p className="text-milk-choc">Nenhuma votação encontrada.</p>
        <p className="mt-1 text-sm text-milk-choc/60">
          Crie sua primeira votação para começar.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <h3 className="font-semibold text-dark-choc">{session.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {!session.isOpenToVote && (
              <span className="rounded-full bg-lavender/50 px-2 py-0.5 text-xs font-medium text-dark-choc">
                Inscrições abertas
              </span>
            )}
            {session.isOpenToVote && (
              <span className="rounded-full bg-strawberry/30 px-2 py-0.5 text-xs font-medium text-cherry">
                Votação aberta
              </span>
            )}
            <span className="rounded-full bg-caramel/50 px-2 py-0.5 text-xs font-medium text-milk-choc">
              {session.numberOfParticipants} participantes
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/voting/${session.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-strawberry px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cherry"
            >
              Ver
            </Link>
            <Link
              href={`/voting/${session.id}/results`}
              className="inline-flex items-center justify-center rounded-lg bg-caramel px-3 py-1.5 text-xs font-medium text-dark-choc transition-colors hover:bg-rose"
            >
              Resultados
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
