"use client";

import { useEffect, useState, useCallback } from "react";
import { useDesserts } from "@/hooks/useDesserts";
import { CreateDessertForm } from "@/components/features/dessert/CreateDessertForm";
import { DessertList } from "@/components/features/dessert/DessertList";
import { DeleteConfirmDialog } from "@/components/features/dessert/DeleteConfirmDialog";
import type { Dessert } from "@/types/dessert";

export default function DessertsPage() {
  const {
    desserts,
    loading,
    error,
    isEmpty,
    fetchDesserts,
    createDessert,
    deleteDessert,
  } = useDesserts();

  const [dessertToDelete, setDessertToDelete] = useState<Dessert | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDesserts();
  }, [fetchDesserts]);

  const handleCreate = useCallback(
    async (name: string, description: string) => {
      await createDessert({ name, description });
      await fetchDesserts();
    },
    [createDessert, fetchDesserts]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!dessertToDelete) return;
    setDeleting(true);
    await deleteDessert(dessertToDelete.id);
    setDeleting(false);
    setDessertToDelete(null);
  }, [dessertToDelete, deleteDessert]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-choc">Doces</h1>

      <CreateDessertForm onSubmit={handleCreate} />

      <DessertList
        desserts={desserts}
        loading={loading}
        error={error}
        isEmpty={isEmpty}
        onDelete={setDessertToDelete}
        onRetry={fetchDesserts}
      />

      {dessertToDelete && (
        <DeleteConfirmDialog
          dessertName={dessertToDelete.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDessertToDelete(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
