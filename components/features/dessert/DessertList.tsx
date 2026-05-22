"use client";

import type { Dessert } from "@/types/dessert";
import { Card } from "@/components/ui";
import { DessertCard } from "./DessertCard";

interface DessertListProps {
  desserts: Dessert[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  onDelete: (dessert: Dessert) => void;
  onRetry: () => void;
}

export function DessertList({
  desserts,
  loading,
  error,
  isEmpty,
  onDelete,
  onRetry,
}: DessertListProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="h-4 w-3/4 animate-pulse rounded bg-rose" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-rose" />
            <div className="mt-4 h-8 w-16 animate-pulse rounded bg-rose" />
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
        <p className="text-milk-choc">Nenhum doce cadastrado ainda.</p>
        <p className="mt-1 text-sm text-milk-choc/60">
          Crie seu primeiro doce acima.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {desserts.map((dessert) => (
        <DessertCard
          key={dessert.id}
          dessert={dessert}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
