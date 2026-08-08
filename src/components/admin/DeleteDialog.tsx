"use client";

import { useState } from "react";

interface DeleteDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel }: DeleteDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-sm rounded border border-white/15 bg-panel p-6">
        <h3 className="font-display text-xl font-semibold text-paper uppercase">{title}</h3>
        <p className="mt-3 font-mono text-sm text-mist">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-mist hover:border-white/30 hover:text-paper"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="rounded bg-red-600 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-paper hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
