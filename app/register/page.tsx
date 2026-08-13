"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { AuthApiError } from "@/features/auth/api";
import { useAuth } from "@/features/auth/AuthContext";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setErrors({});

    try {
      await register({
        ...form,
        last_name: form.last_name || undefined,
        phone: form.phone || undefined,
      });
      router.push("/");
    } catch (err) {
      if (err instanceof AuthApiError) {
        setError(err.message);
        setErrors(err.errors);
      } else {
        setError("Unable to register. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-slate-50 py-20">
      <Container className="max-w-lg">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          <h1 className="text-3xl font-bold">Create Your Account</h1>

          <p className="mt-2 text-slate-500">
            Register as a buyer to request quotes, save suppliers and track
            orders.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  First Name *
                </label>

                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <FieldError errors={errors.first_name} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Last Name
                </label>

                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email *
              </label>

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <FieldError errors={errors.email} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone
              </label>

              <input
                type="text"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <FieldError errors={errors.phone} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password *
                </label>

                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <FieldError errors={errors.password} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Confirm Password *
                </label>

                <input
                  type="password"
                  required
                  value={form.password_confirmation}
                  onChange={(e) =>
                    update("password_confirmation", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="w-full justify-center py-6 text-lg"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </AppButton>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600">
              Sign in
            </Link>
          </p>

        </div>
      </Container>
    </section>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}
