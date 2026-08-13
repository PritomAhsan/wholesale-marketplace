"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { AuthApiError, forgotPassword } from "@/features/auth/api";

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
    <section className="bg-slate-50 py-20">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-bold">Forgot Password</h1>

          <p className="mt-2 text-slate-500">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {sent ? (
            <div className="mt-8 space-y-4">
              <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                If that email exists, a password reset link has been sent.
              </div>

              {debugToken && (
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <p className="mb-2 text-slate-500">
                    Dev mode — mail isn&apos;t configured, so here&apos;s a
                    direct link:
                  </p>
                  <Link
                    href={`/reset-password?token=${debugToken}&email=${encodeURIComponent(
                      email
                    )}`}
                    className="break-all font-semibold text-blue-600 hover:underline"
                  >
                    Open reset link
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <AppButton
                type="submit"
                disabled={submitting}
                className="w-full justify-center py-6 text-lg"
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </AppButton>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            Remembered your password?{" "}
            <Link href="/login" className="font-semibold text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
