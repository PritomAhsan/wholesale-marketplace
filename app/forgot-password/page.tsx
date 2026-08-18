"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { AuthApiError, forgotPassword } from "@/features/auth/api";
import { BRANDING } from "@/constants/branding";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [debugToken, setDebugToken] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const result = await forgotPassword(email);
      setSent(true);
      setDebugToken(result.debug_token ?? null);
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "Unable to send reset link. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-74px)] items-center bg-ivory py-16">
      <Container className="max-w-sm">
        <div className="rounded-xl border border-border bg-white p-8">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.siteName}
            width={147}
            height={44}
            className="h-8 w-auto"
          />

          <h1 className="mt-5 text-xl font-bold text-obsidian">Reset your password</h1>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {sent ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-sapphire-soft px-4 py-3 text-sm text-sapphire-strong">
                If an account matches that email, a password reset link will
                arrive shortly.
              </div>

              {debugToken && (
                <div className="rounded-lg bg-muted px-4 py-3 text-sm">
                  <p className="mb-2 text-obsidian/50">
                    Dev mode — mail isn&apos;t configured, so here&apos;s a
                    direct link:
                  </p>
                  <Link
                    href={`/reset-password?token=${debugToken}&email=${encodeURIComponent(
                      email
                    )}`}
                    className="break-all font-semibold text-sapphire hover:text-sapphire-strong"
                  >
                    Open reset link
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Business email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
              </div>

              <AppButton
                type="submit"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? "Sending..." : "Send reset link"}
              </AppButton>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-obsidian/50">
            <Link href="/login" className="font-semibold text-sapphire">
              Return to sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
