"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { DISPUTE_REASONS, Dispute, DisputeApiError, openDispute } from "../api";

interface Props {
  token: string;
  sellerOrderUuid: string;
}

export default function DisputeSection({ token, sellerOrderUuid }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState(DISPUTE_REASONS[0].value);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dispute, setDispute] = useState<Dispute | null>(null);

  async function handleSubmit() {
    if (!description.trim()) {
      setError("Please describe what went wrong.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await openDispute(token, sellerOrderUuid, {
        reason,
        description,
        images,
      });

      setDispute(result);
      setShowForm(false);
    } catch (err) {
      setError(
        err instanceof DisputeApiError
          ? err.message
          : "Unable to submit your report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (dispute) {
    return (
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Report submitted — our team will review it and follow up. Status:{" "}
          <span className="font-medium capitalize">{dispute.status}</span>.
        </span>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-sm font-medium text-obsidian/60 underline decoration-dotted underline-offset-4 hover:text-obsidian"
        >
          Report an issue with this order
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-border bg-ivory p-4">
      <label className="block text-sm font-medium text-obsidian/80">
        What went wrong?
      </label>

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-white p-2.5 text-sm"
      >
        {DISPUTE_REASONS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      <label className="mt-3 block text-sm font-medium text-obsidian/80">
        Details
      </label>

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell us what happened..."
        className="mt-2 w-full rounded-xl border border-border p-3 text-sm"
      />

      <label className="mt-3 block text-sm font-medium text-obsidian/80">
        Photos (optional)
      </label>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files ?? []).slice(0, 5))}
        className="mt-2 w-full text-sm"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex justify-end gap-3">
        <AppButton
          variant="ghost"
          onClick={() => setShowForm(false)}
          disabled={submitting}
        >
          Never mind
        </AppButton>

        <AppButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </AppButton>
      </div>
    </div>
  );
}
