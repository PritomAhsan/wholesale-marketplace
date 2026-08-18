"use client";

import { useEffect, useState } from "react";
import { Clock, MessageSquare } from "lucide-react";

import { useAuth } from "@/features/auth/AuthContext";
import { fetchMyRfqs, MyRfq } from "../api";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  responded: "bg-sapphire-soft text-sapphire-strong",
  closed: "bg-muted text-obsidian/50",
};

export default function MyRfqs() {
  const { user, token } = useAuth();
  const [rfqs, setRfqs] = useState<MyRfq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMyRfqs(token)
      .then(setRfqs)
      .catch(() => setRfqs([]))
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) return null;
  if (!loading && rfqs.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-border bg-white p-5">
      <h3 className="text-lg font-bold text-obsidian">Your requests</h3>
      <p className="mt-1 text-sm text-obsidian/50">
        Status and any response Bulkare has recorded for your past requests.
      </p>

      {loading ? (
        <div className="mt-4 space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg border border-border bg-muted"
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 divide-y divide-border">
          {rfqs.map((rfq) => (
            <div key={rfq.uuid} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-obsidian">
                  {rfq.product_name}
                </p>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                    STATUS_STYLES[rfq.status] ?? "bg-muted text-obsidian/50"
                  }`}
                >
                  {rfq.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-obsidian/50">
                {rfq.quantity} {rfq.unit} · {rfq.destination_country} ·{" "}
                {new Date(rfq.created_at).toLocaleDateString()}
              </p>

              {rfq.admin_response ? (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-sapphire-soft p-3 text-sm text-sapphire-strong">
                  <MessageSquare size={15} className="mt-0.5 shrink-0" />
                  <p>{rfq.admin_response}</p>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-2 text-xs text-obsidian/40">
                  <Clock size={13} />
                  Waiting on a response
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
