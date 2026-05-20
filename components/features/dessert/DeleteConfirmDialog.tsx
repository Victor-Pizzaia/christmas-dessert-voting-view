"use client";

import { Button } from "@/components/ui";

interface DeleteConfirmDialogProps {
  dessertName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirmDialog({
  dessertName,
  onConfirm,
  onCancel,
  loading = false,
}: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-zinc-900">
          Delete dessert
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-zinc-900">{dessertName}</span>?
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
