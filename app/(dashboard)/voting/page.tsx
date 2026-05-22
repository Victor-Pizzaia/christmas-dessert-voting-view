"use client";

import { useEffect, useState } from "react";
import { useVoting } from "@/hooks/useVoting";
import { SessionList } from "@/components/features/voting/SessionList";
import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function VotingPage() {
  const { sessions, loading, error, isEmpty, fetchSessions } = useVoting();
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  function handleCreateClick() {
    if (!user) {
      setShowLoginModal(true);
    } else {
      router.push("/voting/create");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-choc">Votações</h1>
        <Button onClick={handleCreateClick}>Criar Nova Votação</Button>
      </div>

      <SessionList
        sessions={sessions}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        onRetry={fetchSessions}
      />

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-vanilla p-6 shadow-xl border border-rose">
            <h3 className="text-lg font-bold text-dark-choc">
              Faça login para criar
            </h3>
            <p className="mt-2 text-sm text-milk-choc">
              Você precisa estar logado para criar uma nova votação.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => router.push("/login")}>
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
