"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { api } from "@/lib/api";

interface Dessert {
  id: number;
  name: string;
  description?: string;
}

export default function DessertsPage() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function fetchDesserts() {
    const response = await api.get("/desserts");
    setDesserts(response.data);
  }

  useEffect(() => {
    fetchDesserts();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    await api.post("/desserts", { name, description });
    setName("");
    setDescription("");
    fetchDesserts();
  }

  async function handleDelete(id: number) {
    await api.delete(`/desserts/${id}`);
    fetchDesserts();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-zinc-900">Desserts</h1>

      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-lg bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-zinc-800">
          Add new dessert
        </h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Create
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {desserts.map((dessert) => (
          <div
            key={dessert.id}
            className="rounded-lg bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-zinc-900">{dessert.name}</h3>
            {dessert.description && (
              <p className="mt-1 text-sm text-zinc-500">
                {dessert.description}
              </p>
            )}
            <button
              onClick={() => handleDelete(dessert.id)}
              className="mt-3 text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
