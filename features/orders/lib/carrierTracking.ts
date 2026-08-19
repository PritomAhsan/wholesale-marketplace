/**
 * Best-effort public tracking URL for known carriers. Carrier names are
 * free text entered by the supplier/admin, so this only covers the
 * common ones seen in practice — anything else just shows the number
 * without a link rather than guessing at a URL that might be wrong.
 */
const CARRIER_URL_BUILDERS: Record<string, (trackingNumber: string) => string> = {
  dhl: (n) => `https://www.dhl.com/en/express/tracking.html?AWB=${encodeURIComponent(n)}`,
  fedex: (n) => `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(n)}`,
  ups: (n) => `https://www.ups.com/track?loc=en_US&tracknum=${encodeURIComponent(n)}`,
  "maersk line": (n) => `https://www.maersk.com/tracking/${encodeURIComponent(n)}`,
  maersk: (n) => `https://www.maersk.com/tracking/${encodeURIComponent(n)}`,
  usps: (n) => `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(n)}`,
};

export function carrierTrackingUrl(
  carrier: string | null,
  trackingNumber: string | null
): string | null {
  if (!carrier || !trackingNumber) return null;

  const builder = CARRIER_URL_BUILDERS[carrier.trim().toLowerCase()];
  return builder ? builder(trackingNumber) : null;
}
