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
  "Compare wholesale terms",
  "Request quotations",
  "Track purchases",
];

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
          Create a business buyer account.
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

      {/* Registration form */}
      <div className="flex items-center justify-center bg-ivory px-6 py-16">
        <div className="w-full max-w-lg rounded-xl border border-border bg-white p-8">
          <Image
            src={BRANDING.logo}
            alt={BRANDING.siteName}
            width={147}
            height={44}
            className="h-8 w-auto lg:hidden"
          />

          <h2 className="mt-4 text-xl font-bold text-obsidian lg:mt-0">
            Create a business buyer account
          </h2>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  First and last name *
                </label>
                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.first_name} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Last name
                </label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Business email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.email} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.phone} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.password} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-obsidian">
                  Confirm password *
                </label>
                <input
                  type="password"
                  required
                  value={form.password_confirmation}
                  onChange={(e) => update("password_confirmation", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border px-3.5 text-sm outline-none transition focus:border-sapphire"
                />
              </div>
            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? "Creating account..." : "Create buyer account"}
            </AppButton>
          </form>

          <p className="mt-5 text-center text-xs text-obsidian/50">
            Applying as a supplier?{" "}
            <Link href="/become-supplier" className="font-semibold text-sapphire">
              Start here
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-obsidian/50">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-sapphire">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}
