"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileSearch,
  Package,
  ShieldAlert,
  Store,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { BRANDING } from "@/constants/branding";
import {
  ContactValidationError,
  submitContactMessage,
} from "@/features/support/api";

const REASONS = [
  {
    key: "buyer_support",
    title: "Buyer support",
    icon: Package,
    copy: "Sourcing, quotations and account questions.",
  },
  {
    key: "supplier_onboarding",
    title: "Supplier onboarding",
    icon: Store,
    copy: "Applications, verification and storefront setup.",
  },
  {
    key: "order_dispute",
    title: "Order or dispute",
    icon: FileSearch,
    copy: "An order, delivery or transaction issue.",
  },
  {
    key: "compliance_restricted_products",
    title: "Compliance and restricted products",
    icon: ShieldAlert,
    copy: "Regulated inventory or policy questions.",
  },
];

const QUICK_ACTIONS = [
  { label: "Track an order", href: "/orders" },
  { label: "Check RFQ status", href: "/rfq" },
  { label: "Apply as a supplier", href: "/become-supplier" },
];

export default function ContactPageClient() {
  const [topic, setTopic] = useState("");
  const [form, setForm] = useState({
    name: "",
    business_email: "",
    account_email: "",
    reference_number: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState("");

  const needsReference =
    topic === "order_dispute" || topic === "compliance_restricted_products";

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!topic || submitting) return;

    setSubmitting(true);
    setError("");
    setErrors({});

    try {
      const uuid = await submitContactMessage({
        topic,
        name: form.name,
        business_email: form.business_email,
        account_email: form.account_email || undefined,
        reference_number: form.reference_number || undefined,
        message: form.message,
      });
      setCaseId(uuid);
    } catch (err) {
      if (err instanceof ContactValidationError) {
        setErrors(err.errors);
        setError(err.message);
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to submit request"
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (caseId) {
    return (
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-white p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-sapphire" />
            <h1 className="mt-4 text-xl font-semibold text-obsidian">
              Support request submitted
            </h1>
            <p className="mt-2 text-sm text-obsidian/60">
              Your case reference is
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-sapphire-strong">
              {caseId}
            </p>
            <p className="mt-4 text-sm text-obsidian/60">
              We&apos;ll follow up at the email address you provided.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-white py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-sapphire">
            Contact and Support
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-bold text-obsidian">
            Get the right help, faster.
          </h1>
          <p className="mt-3 max-w-xl text-base text-obsidian/60">
            Choose the topic that best matches your request.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-obsidian/80 transition hover:border-sapphire hover:text-sapphire"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-lg font-semibold text-obsidian">
                What can we help with?
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {REASONS.map((reason) => (
                  <button
                    key={reason.key}
                    type="button"
                    onClick={() => setTopic(reason.key)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      topic === reason.key
                        ? "border-sapphire bg-sapphire-soft"
                        : "border-border hover:border-sapphire/60"
                    }`}
                  >
                    <reason.icon className="mt-0.5 h-5 w-5 shrink-0 text-sapphire" />
                    <span>
                      <span className="block text-sm font-semibold text-obsidian">
                        {reason.title}
                      </span>
                      <span className="mt-1 block text-xs text-obsidian/60">
                        {reason.copy}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-ivory p-5 text-sm">
                <p className="font-semibold text-obsidian">
                  Verified contact information
                </p>
                <p className="mt-1 text-obsidian/60">
                  {BRANDING.supportEmail}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              {!topic ? (
                <div className="flex h-full min-h-[300px] items-center justify-center text-center text-sm text-obsidian/50">
                  Select a topic to open the request form.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-obsidian">
                      Full name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name[0]}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-obsidian">
                        Business email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.business_email}
                        onChange={(e) => update("business_email", e.target.value)}
                        className="h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                      />
                      {errors.business_email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.business_email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-obsidian">
                        Account email (if different)
                      </label>
                      <input
                        type="email"
                        value={form.account_email}
                        onChange={(e) => update("account_email", e.target.value)}
                        className="h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                      />
                    </div>
                  </div>

                  {needsReference && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-obsidian">
                        Order or RFQ number
                      </label>
                      <input
                        value={form.reference_number}
                        onChange={(e) => update("reference_number", e.target.value)}
                        className="h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-sapphire"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-obsidian">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-sapphire"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message[0]}</p>
                    )}
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <AppButton
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit support request"}
                  </AppButton>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
