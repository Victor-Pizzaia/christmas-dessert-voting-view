"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

interface CreateDessertFormProps {
  onSubmit: (name: string, description: string) => Promise<void>;
}

export function CreateDessertForm({ onSubmit }: CreateDessertFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(name.trim(), description.trim());
      setName("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-bold text-dark-choc">
          Adicionar novo doce
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="dessert-name"
            className="text-sm font-medium text-dark-choc"
          >
            Nome
          </label>
          <input
            id="dessert-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Bolo de Chocolate"
            className="w-full rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="dessert-description"
            className="text-sm font-medium text-dark-choc"
          >
            Descrição
          </label>
          <textarea
            id="dessert-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição opcional..."
            rows={3}
            className="w-full resize-none rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry"
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Criando..." : "Criar Doce"}
        </Button>
      </form>
    </Card>
  );
}
