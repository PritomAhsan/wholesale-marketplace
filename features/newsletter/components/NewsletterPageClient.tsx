"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { subscribeToNewsletter } from "@/features/newsletter/api";

const TOPICS = [
  { key: "inventory_opportunities", label: "Inventory opportunities" },
  { key: "category_trends", label: "Category trends" },
  { key: "buying_margin_guidance", label: "Buying and margin guidance" },
  { key: "platform_supplier_updates", label: "Platform and supplier updates" },
];

export default function NewsletterPageClient() {
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<"weekly" | "twice_monthly">(
    "twice_monthly"
  );
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function toggleTopic(key: string) {
    setTopics((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await subscribeToNewsletter({ email, topics, frequency });
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to subscribe"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sapphire">
            Wholesale Insights Newsletter
          </p>
          <h1 className="mt-4 text-4xl font-bold text-obsidian sm:text-5xl">
            Wholesale intelligence for independent retail.
          </h1>
          <p className="mt-4 text-base text-obsidian/60">
            Receive category movement, sourcing guidance and new Bulkare
            inventory highlights.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-white p-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-sapphire" />
              <h2 className="text-lg font-semibold text-obsidian">
                You&apos;re subscribed
              </h2>
              <p className="text-sm text-obsidian/60">
                Recommended frequency is twice monthly. You can change this
                or unsubscribe from any email we send.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-obsidian">
                  Business email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="h-12 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-obsidian">
                  Topics
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {TOPICS.map((topic) => (
                    <label
                      key={topic.key}
                      className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-obsidian/80 has-[:checked]:border-sapphire has-[:checked]:bg-sapphire-soft"
                    >
                      <input
                        type="checkbox"
                        checked={topics.includes(topic.key)}
                        onChange={() => toggleTopic(topic.key)}
                        className="h-4 w-4 accent-sapphire"
                      />
                      {topic.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-obsidian">
                  Frequency
                </p>
                <div className="flex gap-2">
                  {(["twice_monthly", "weekly"] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        frequency === freq
                          ? "border-sapphire bg-sapphire-soft text-sapphire-strong"
                          : "border-border text-obsidian/60 hover:border-sapphire"
                      }`}
                    >
                      {freq === "twice_monthly" ? "Twice monthly" : "Weekly"}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-3 text-xs text-obsidian/60">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-sapphire"
                />
                I consent to receive wholesale insights emails from Bulkare.
                Transactional account emails are separate and are not
                affected by this preference. Unsubscribe anytime.
              </label>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <AppButton
                type="submit"
                variant="primary"
                className="w-full justify-center"
                disabled={submitting || !consent}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </AppButton>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
