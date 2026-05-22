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
        <h2 className="text-lg font-semibold text-zinc-800">
          New Voting Session
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="session-name"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>
          <input
            id="session-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Christmas Dessert Contest 2026"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="session-description"
            className="text-sm font-medium text-zinc-700"
          >
            Description
          </label>
          <textarea
            id="session-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="session-closing-date"
            className="text-sm font-medium text-zinc-700"
          >
            Closing Date
          </label>
          <input
            id="session-closing-date"
            type="text"
            required
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            placeholder="dd/MM/yyyy HH:mm:ss"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Session"}
        </Button>
      </form>
    </Card>
  );
}
