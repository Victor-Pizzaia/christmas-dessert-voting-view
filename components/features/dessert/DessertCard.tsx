"use client";

import type { Dessert } from "@/types/dessert";
import { Button } from "@/components/ui";

interface DessertCardProps {
  dessert: Dessert;
  onDelete: (dessert: Dessert) => void;
}

export function DessertCard({ dessert, onDelete }: DessertCardProps) {
  return (
    <div
      className={`relative rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
        dessert.subscribed
          ? "border-l-4 border-l-green-500"
          : "border border-zinc-200"
      }`}
    >
      {dessert.subscribed && (
        <span className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          Subscribed
        </span>
      )}

      <h3 className="font-semibold text-zinc-900">{dessert.name}</h3>

      {dessert.description && (
        <p className="mt-1 text-sm text-zinc-500">{dessert.description}</p>
      )}

      {dessert.owner && (
        <p className="mt-2 text-xs text-zinc-400">
          Owner: {dessert.owner.name}
        </p>
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
