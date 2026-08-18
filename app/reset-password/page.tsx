"use client";

import { FormEvent, Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { AuthApiError, resetPassword } from "@/features/auth/api";
import { BRANDING } from "@/constants/branding";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!token || !email) {
      setError("This reset link is invalid or incomplete.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      router.push("/login");
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "Unable to reset password. Please try again."
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
            width={130}
            height={44}
            className="h-8 w-auto"
          />

          <h1 className="mt-5 text-xl font-bold text-obsidian">Reset password</h1>
          <p className="mt-1.5 text-sm text-obsidian/50">
            Choose a new password for {email || "your account"}.
          </p>

          {!token || !email ? (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              This reset link is invalid or incomplete. Please request a new
              one from the{" "}
              <Link href="/forgot-password" className="underline">
                forgot password
              </Link>{" "}
              page.
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  New password
                </label>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Confirm password
                </label>

                <input
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
              </div>

              <AppButton
                type="submit"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? "Resetting..." : "Reset password"}
              </AppButton>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
