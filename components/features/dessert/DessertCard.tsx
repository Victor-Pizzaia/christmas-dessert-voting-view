"use client";

import type { Dessert } from "@/types/dessert";
import { Button } from "@/components/ui";

interface DessertCardProps {
  dessert: Dessert;
  onDelete: (dessert: Dessert) => void;
}

export function DessertCard({ dessert, onDelete }: DessertCardProps) {
  return (
    <div className="relative rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md border border-zinc-200">
      <h3 className="font-semibold text-zinc-900">{dessert.name}</h3>

      {dessert.description && (
        <p className="mt-1 text-sm text-zinc-500">{dessert.description}</p>
      )}

      {dessert.recipe && (
        <p className="mt-1 text-xs text-zinc-400">Recipe: {dessert.recipe}</p>
      )}

      <div className="mt-3">
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(dessert)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
