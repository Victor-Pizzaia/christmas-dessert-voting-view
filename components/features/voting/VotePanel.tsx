"use client";

import { Card, Button } from "@/components/ui";

interface SubscribedItem {
  id: string;
  name: string;
}

interface VotePanelProps {
  subscribed: SubscribedItem[];
  loading: boolean;
  sessionOpen: boolean;
  onVote: (dessertId: string) => Promise<void>;
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
        <p className="text-milk-choc">A votação está fechada para esta sessão.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="h-4 w-3/4 animate-pulse rounded bg-rose" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-rose" />
          </Card>
        ))}
      </div>
    );
  }

  if (subscribed.length === 0) {
    return (
      <Card className="text-center">
        <p className="text-milk-choc">
          Nenhum doce inscrito ainda. Aguarde a fase de inscrições.
        </p>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-dark-choc">
        Vote no seu favorito
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscribed.map((dessert) => (
          <Card key={dessert.id}>
            <h3 className="font-semibold text-dark-choc">{dessert.name}</h3>
            <div className="mt-3">
              <Button size="sm" onClick={() => onVote(dessert.id)}>
                Votar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
