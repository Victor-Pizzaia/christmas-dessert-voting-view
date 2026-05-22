"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { Dessert, CreateDessertRequest } from "@/types/dessert";

export function useDesserts() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDesserts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Dessert[]>("/desserts");
      setDesserts(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch desserts";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createDessert = useCallback(async (data: CreateDessertRequest) => {
    const response = await api.post<Dessert>("/desserts", data);
    return response.data;
  }, []);

  const deleteDessert = useCallback(async (id: string) => {
    try {
      await api.delete(`/desserts/${id}`);
      setDesserts((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setDesserts((prev) => prev.filter((d) => d.id !== id));
    }
  }, []);

  return {
    desserts,
    loading,
    error,
    isEmpty: !loading && !error && desserts.length === 0,
    fetchDesserts,
    createDessert,
    deleteDessert,
  };
}
