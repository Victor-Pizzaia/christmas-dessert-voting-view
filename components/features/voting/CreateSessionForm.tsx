"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button, Card } from "@/components/ui";

interface CreateSessionFormProps {
  onSubmit: (year: number) => Promise<void>;
}

export function CreateSessionForm({ onSubmit }: CreateSessionFormProps) {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const yearNum = parseInt(year, 10);
    if (!year.trim() || isNaN(yearNum)) return;
    setSubmitting(true);
    try {
      await onSubmit(yearNum);
      setYear(new Date().getFullYear().toString());
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
            htmlFor="session-year"
            className="text-sm font-medium text-zinc-700"
          >
            Year
          </label>
          <input
            id="session-year"
            type="number"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2024"
            min={2020}
            max={2100}
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
