"use client";

import type { Dessert } from "@/types/dessert";
import { Card, Button } from "@/components/ui";

interface SubscribedItem {
  id: string;
  name: string;
  subscribed?: boolean;
}

interface SubscribePanelProps {
  subscribed: SubscribedItem[];
  available: Dessert[];
  loading: boolean;
  sessionOpen: boolean;
  onSubscribe: (dessertId: string, name: string) => Promise<void>;
}

export function SubscribePanel({
  subscribed,
  available,
  loading,
  sessionOpen,
  onSubscribe,
}: SubscribePanelProps) {
  const unsubscribed = available.filter(
    (d) => !subscribed.find((s) => s.id === d.id)
  );

  if (!sessionOpen) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-dark-choc">
        Doces Inscritos
      </h2>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2].map((i) => (
            <Card key={i}>
              <div className="h-4 w-3/4 animate-pulse rounded bg-rose" />
            </Card>
          ))}
        </div>
      ) : subscribed.length === 0 ? (
        <Card className="text-center">
          <p className="text-milk-choc">Nenhum doce inscrito ainda.</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscribed.map((dessert) => (
            <Card key={dessert.id}>
              <h3 className="font-semibold text-dark-choc">{dessert.name}</h3>
              <span className="mt-1 inline-block rounded-full bg-lavender/50 px-2 py-0.5 text-xs text-milk-choc">
                Inscrito
              </span>
            </Card>
          ))}
        </div>
      )}

      {unsubscribed.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-medium text-dark-choc">
            Doces Disponíveis
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unsubscribed.map((dessert) => (
              <Card key={dessert.id}>
                <h3 className="font-semibold text-dark-choc">{dessert.name}</h3>
                {dessert.description && (
                  <p className="mt-1 text-sm text-milk-choc">
                    {dessert.description}
                  </p>
                )}
                <div className="mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onSubscribe(dessert.id, dessert.name)}
                  >
                    Inscrever
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
