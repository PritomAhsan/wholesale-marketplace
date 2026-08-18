"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AppButton } from "@/components/ui/app-button";
import { AuthApiError } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";
import { BRANDING } from "@/constants/branding";

const BENEFITS = [
  "Save products and suppliers",
  "Manage quotation requests",
  "Track orders and documents",
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-74px)] lg:grid-cols-2">
      {/* Brand and value panel */}
      <div className="hidden flex-col justify-center bg-obsidian px-14 py-16 text-white lg:flex">
        <Image
          src={BRANDING.logoDark}
          alt={BRANDING.siteName}
          width={167}
          height={50}
          className="h-10 w-auto"
        />

        <h1 className="mt-10 max-w-sm text-3xl font-bold leading-tight">
          One account for sourcing, quotations and orders.
        </h1>

        <ul className="mt-8 space-y-3">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-ivory/70">
              <span className="h-1.5 w-1.5 rounded-full bg-sapphire" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Sign-in form */}
      <div className="flex items-center justify-center bg-ivory px-6 py-16">
        <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.siteName}
            width={147}
            height={44}
            className="h-8 w-auto lg:hidden"
          />

          <h2 className="mt-4 text-xl font-bold text-obsidian lg:mt-0">
            Welcome back
          </h2>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

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

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-semibold text-obsidian">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-sapphire hover:text-sapphire-strong"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
              />
            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </AppButton>
          </form>

          <p className="mt-6 text-center text-xs text-obsidian/50">
            New to Bulkare?{" "}
            <Link href="/register" className="font-semibold text-sapphire">
              Create a buyer account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
