"use client";

import type { VoteResult } from "@/types/voting";
import { Card } from "@/components/ui";

interface ResultsPanelProps {
  results: VoteResult[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry: () => void;
}

export function ResultsPanel({
  results,
  loading,
  error,
  isEmpty,
  onRetry,
}: ResultsPanelProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="flex items-center gap-4">
              <div className="h-4 w-1/3 animate-pulse rounded bg-rose" />
              <div className="h-4 w-16 animate-pulse rounded bg-rose" />
            </div>
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
        <p className="text-milk-choc">Nenhum resultado disponível ainda.</p>
        <p className="mt-1 text-sm text-milk-choc/60">
          Os resultados aparecerão quando a votação for encerrada.
        </p>
      </Card>
    );
  }

  const sorted = [...results].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted.length > 0 ? sorted[0].votes : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-dark-choc">Resultados</h2>
      <div className="space-y-3">
        {sorted.map((result, index) => (
          <Card key={result.dessertId}>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-milk-choc">
                #{index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-choc">
                    {result.dessertName}
                  </h3>
                  <span className="text-sm font-medium text-milk-choc">
                    {result.votes} {result.votes === 1 ? "voto" : "votos"}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-rose">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      index === 0
                        ? "bg-strawberry"
                        : index === 1
                          ? "bg-lavender"
                          : index === 2
                            ? "bg-caramel"
                            : "bg-sage"
                    }`}
                    style={{
                      width:
                        maxVotes > 0
                          ? `${(result.votes / maxVotes) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
              {index === 0 && <span className="text-xl">👑</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
