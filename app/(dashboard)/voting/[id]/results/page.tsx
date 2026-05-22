"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ResultsPanel } from "@/components/features/voting/ResultsPanel";
import { Button } from "@/components/ui";
import type { VoteResult } from "@/types/voting";
import { api } from "@/lib/api";

export default function ResultsPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [results, setResults] = useState<VoteResult[]>([]);
  const [session, setSession] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resultsData, sessionRes] = await Promise.all([
        api.get<VoteResult[]>(`/voting/${sessionId}/results`),
        api.get(`/voting/${sessionId}`),
      ]);
      setResults(resultsData.data);
      setSession(sessionRes.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao carregar resultados";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-choc">
            Resultados{session ? ` — ${session.name}` : ""}
          </h1>
        </div>
        <Link href={`/voting/${sessionId}`}>
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      <ResultsPanel
        results={results}
        loading={loading}
        error={error}
        isEmpty={!loading && !error && results.length === 0}
        onRetry={loadData}
      />
    </div>
  );
}
