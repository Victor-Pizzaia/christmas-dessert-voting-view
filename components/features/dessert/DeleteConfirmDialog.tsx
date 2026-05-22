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
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-vanilla p-6 shadow-xl border border-rose">
        <h3 className="text-lg font-bold text-dark-choc">
          Excluir doce
        </h3>
        <p className="mt-2 text-sm text-milk-choc">
          Tem certeza que deseja excluir{" "}
          <span className="font-medium text-dark-choc">{dessertName}</span>?
          Esta ação não pode ser desfeita.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>
    </div>
  );
}
