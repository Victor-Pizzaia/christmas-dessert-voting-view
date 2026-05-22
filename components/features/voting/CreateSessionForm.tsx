"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

interface CreateSessionFormProps {
  onSubmit: (name: string, description: string, closingDate: string) => Promise<void>;
}

export function CreateSessionForm({ onSubmit }: CreateSessionFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !closingDate.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(name.trim(), description.trim(), closingDate.trim());
      setName("");
      setDescription("");
      setClosingDate("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-bold text-dark-choc">
          Nova Votação
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="session-name"
            className="text-sm font-medium text-dark-choc"
          >
            Nome
          </label>
          <input
            id="session-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Concurso de Panetone 2026"
            className="w-full rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="session-description"
            className="text-sm font-medium text-dark-choc"
          >
            Descrição
          </label>
          <textarea
            id="session-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição opcional..."
            rows={3}
            className="w-full resize-none rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="session-closing-date"
            className="text-sm font-medium text-dark-choc"
          >
            Data de Encerramento
          </label>
          <input
            id="session-closing-date"
            type="text"
            required
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            placeholder="dd/MM/yyyy HH:mm:ss"
            className="w-full rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry"
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Criando..." : "Criar Votação"}
        </Button>
      </form>
    </Card>
  );
}
