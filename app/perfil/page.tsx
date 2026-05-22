"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useVoting } from "@/hooks/useVoting";
import { Card, Button } from "@/components/ui";

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { sessions, loading, fetchSessions } = useVoting();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchSessions();
  }, [user, router, fetchSessions]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-strawberry text-3xl font-bold text-white shadow-md">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-dark-choc">{user.name}</h1>
          {user.favorite_sweets && user.favorite_sweets.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {user.favorite_sweets.map((sweet) => (
                <span
                  key={sweet}
                  className="rounded-full bg-lavender/50 px-2 py-0.5 text-xs text-milk-choc"
                >
                  {sweet}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark-choc">
            Minhas Votações
          </h2>
          <Link href="/voting/create">
            <Button size="sm">Criar Nova</Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((i) => (
              <Card key={i}>
                <div className="h-4 w-2/3 animate-pulse rounded bg-rose" />
              </Card>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <Card className="text-center">
            <p className="text-milk-choc">Você ainda não criou nenhuma votação.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <Card key={session.id}>
                <h3 className="font-semibold text-dark-choc">{session.name}</h3>
                <div className="mt-2 flex gap-2">
                  {!session.isOpenToVote && (
                    <span className="rounded-full bg-lavender/50 px-2 py-0.5 text-xs font-medium text-dark-choc">
                      Inscrições
                    </span>
                  )}
                  {session.isOpenToVote && (
                    <span className="rounded-full bg-strawberry/30 px-2 py-0.5 text-xs font-medium text-cherry">
                      Votação
                    </span>
                  )}
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
        )}
      </section>

      <div className="flex justify-center pt-4">
        <Button variant="secondary" onClick={logout}>
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}
