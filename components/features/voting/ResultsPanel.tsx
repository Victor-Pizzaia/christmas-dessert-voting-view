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
              <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />
            </div>
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
        <p className="text-zinc-500">No results available yet.</p>
        <p className="mt-1 text-sm text-zinc-400">
          Results will appear once voting has started.
        </p>
      </Card>
    );
  }

  const sorted = [...results].sort((a, b) => b.votes - a.votes);
  const maxVotes = sorted.length > 0 ? sorted[0].votes : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800">Results</h2>
      <div className="space-y-3">
        {sorted.map((result, index) => (
          <Card key={result.dessertId}>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-zinc-400">
                #{index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900">
                    {result.dessertName}
                  </h3>
                  <span className="text-sm font-medium text-zinc-600">
                    {result.votes} {result.votes === 1 ? "vote" : "votes"}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-zinc-200">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                          ? "bg-blue-500"
                          : index === 2
                            ? "bg-amber-500"
                            : "bg-zinc-400"
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
