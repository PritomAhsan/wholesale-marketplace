"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { AuthApiError } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";

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
    <section className="bg-slate-50 py-20">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="mt-2 text-slate-500">
            Sign in to manage RFQs, orders and saved suppliers.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

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

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="w-full justify-center py-6 text-lg"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </AppButton>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600">
              Create one
            </Link>
          </p>

        </div>
      </Container>
    </section>
  );
}
