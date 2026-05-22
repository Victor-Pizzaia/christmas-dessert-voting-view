"use client";

import type { Dessert } from "@/types/dessert";
import { Button } from "@/components/ui";

interface DessertCardProps {
  dessert: Dessert;
  onDelete: (dessert: Dessert) => void;
}

export function DessertCard({ dessert, onDelete }: DessertCardProps) {
  return (
    <div className="relative rounded-xl bg-rose/60 p-4 shadow-sm transition-shadow hover:shadow-md border border-rose">
      <h3 className="font-semibold text-dark-choc">{dessert.name}</h3>

      {dessert.description && (
        <p className="mt-1 text-sm text-milk-choc">{dessert.description}</p>
      )}

      {dessert.recipe && (
        <p className="mt-1 text-xs text-milk-choc/60">Receita: {dessert.recipe}</p>
      )}

      <div className="mt-3">
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(dessert)}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}
