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
        <h2 className="text-lg font-semibold text-zinc-800">
          Add new dessert
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="dessert-name"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>
          <input
            id="dessert-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chocolate Cake"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="dessert-description"
            className="text-sm font-medium text-zinc-700"
          >
            Description
          </label>
          <textarea
            id="dessert-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </Card>
  );
}
