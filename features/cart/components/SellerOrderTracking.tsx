"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import { fetchTracking, TrackingResult } from "@/features/cart/api";

interface Props {
  token: string;
  sellerOrderUuid: string;
  trackingNumber: string;
  shippingCarrier: string;
}

export default function SellerOrderTracking({
  token,
  sellerOrderUuid,
  trackingNumber,
  shippingCarrier,
}: Props) {
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleTrack() {
    setLoading(true);
    setError(false);
    setResult(null);

    const data = await fetchTracking(token, sellerOrderUuid);

    if (!data) {
      setError(true);
    } else {
      setResult(data);
    }

    setLoading(false);
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-obsidian/70">
          <span className="font-medium text-obsidian">
            {shippingCarrier}
          </span>{" "}
          — {trackingNumber}
        </p>

        <AppButton
          type="button"
          variant="outline"
          onClick={handleTrack}
          disabled={loading}
        >
          <Truck size={16} className="mr-1" />
          {loading ? "Tracking..." : "Track Package"}
        </AppButton>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          Unable to fetch tracking status right now.
        </p>
      )}

      {result && !result.available && (
        <p className="mt-3 text-sm text-obsidian/50">
          Live tracking isn&apos;t available for this shipment right now.
        </p>
      )}

      {result?.available && result.tracking && (
        <div className="mt-4 rounded-lg bg-muted p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-obsidian">
              {result.tracking.statusDescription}
            </p>
            {result.tracking.estimatedDelivery && (
              <p className="text-sm text-obsidian/50">
                Est. delivery: {result.tracking.estimatedDelivery}
              </p>
            )}
          </div>

          {result.tracking.events.length > 0 && (
            <ol className="mt-3 space-y-3 border-t border-border pt-3">
              {result.tracking.events.map((event, i) => (
                <li key={i} className="text-sm">
                  <p className="font-medium text-obsidian">
                    {event.description}
                  </p>
                  <p className="text-obsidian/50">
                    {[event.location, event.timestamp]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
