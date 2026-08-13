"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, ShieldAlert, XCircle } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useAuth } from "@/features/auth/AuthContext";
import {
  applyAsSupplier,
  fetchMySupplierApplication,
  SupplierApiError,
  SupplierApplication,
} from "@/features/become-supplier/api";

const initialForm = {
  company_name: "",
  business_type: "manufacturer",
  contact_person: "",
  email: "",
  phone: "",
  website: "",
  registration_number: "",
  tax_number: "",
  description: "",
};

export default function BecomeSupplierPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [application, setApplication] = useState<SupplierApplication | null>(null);
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }

    fetchMySupplierApplication(token).then((app) => {
      setApplication(app);
      if (user) {
        setForm((prev) => ({
          ...prev,
          contact_person: prev.contact_person || user.full_name,
          email: prev.email || user.email,
          phone: prev.phone || user.phone || "",
        }));
      }
      setChecking(false);
    });
  }, [token, user]);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) return;

    setSubmitting(true);
    setErrors({});
    setErrorMessage("");

    try {
      const result = await applyAsSupplier(token, {
        ...form,
        website: form.website || undefined,
        registration_number: form.registration_number || undefined,
        tax_number: form.tax_number || undefined,
        description: form.description || undefined,
      });

      setApplication(result);
    } catch (err) {
      if (err instanceof SupplierApiError) {
        setErrorMessage(err.message);
        setErrors(err.errors);
      } else {
        setErrorMessage("Unable to submit application. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || checking) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg text-center text-slate-500">
          Loading...
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <ShieldAlert className="mx-auto mb-4 text-blue-600" size={48} />

            <h1 className="text-2xl font-bold">Sign In Required</h1>

            <p className="mt-3 text-slate-500">
              Create a buyer account first, then apply to become a verified
              BULKARE supplier.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/login">
                <AppButton variant="secondary" className="w-full">
                  Sign In
                </AppButton>
              </Link>

              <Link href="/register">
                <AppButton className="w-full">Create Account</AppButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (application) {
    return (
      <section className="bg-slate-50 py-24">
        <Container className="max-w-lg">
          <StatusCard application={application} />
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16">
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          <h1 className="text-3xl font-bold">Become a BULKARE Supplier</h1>

          <p className="mt-2 text-slate-500">
            Tell us about your business. Our team reviews every application
            before your store goes live.
          </p>

          {errorMessage && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Company Name *
              </label>

              <input
                type="text"
                required
                value={form.company_name}
                onChange={(e) => update("company_name", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <FieldError errors={errors.company_name} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Business Type *
              </label>

              <select
                value={form.business_type}
                onChange={(e) => update("business_type", e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="distributor">Distributor</option>
                <option value="exporter">Exporter</option>
                <option value="retailer">Retailer</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Contact Person *
                </label>

                <input
                  type="text"
                  required
                  value={form.contact_person}
                  onChange={(e) => update("contact_person", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <FieldError errors={errors.contact_person} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Business Email *
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
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Phone *
                </label>

                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <FieldError errors={errors.phone} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Website
                </label>

                <input
                  type="text"
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />

                <FieldError errors={errors.website} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Business Registration Number
                </label>

                <input
                  type="text"
                  value={form.registration_number}
                  onChange={(e) => update("registration_number", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Tax ID
                </label>

                <input
                  type="text"
                  value={form.tax_number}
                  onChange={(e) => update("tax_number", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Tell Us About Your Business
              </label>

              <textarea
                rows={5}
                placeholder="Products you sell, warehouse location, years in business, export markets, etc."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <AppButton
              type="submit"
              disabled={submitting}
              className="w-full justify-center py-6 text-lg"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </AppButton>

          </form>

        </div>
      </Container>
    </section>
  );
}

function StatusCard({ application }: { application: SupplierApplication }) {
  const config = {
    pending: {
      icon: <Clock3 className="mx-auto mb-4 text-amber-500" size={48} />,
      title: "Application Under Review",
      body: "Our team is reviewing your application. This usually takes 1-2 business days. We'll notify you by email once a decision is made.",
    },
    approved: {
      icon: <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />,
      title: "You're an Approved Supplier",
      body: "Congratulations! Your store is verified. Visit the seller dashboard to add products and start selling.",
    },
    rejected: {
      icon: <XCircle className="mx-auto mb-4 text-red-500" size={48} />,
      title: "Application Not Approved",
      body: "Your application wasn't approved this time. Contact support if you'd like more information.",
    },
    suspended: {
      icon: <ShieldAlert className="mx-auto mb-4 text-red-500" size={48} />,
      title: "Account Suspended",
      body: "Your supplier account has been suspended. Contact support for details.",
    },
  }[application.status];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      {config.icon}

      <h1 className="text-2xl font-bold">{config.title}</h1>

      <p className="mt-3 text-slate-500">{config.body}</p>

      <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left">
        <p className="text-sm font-semibold text-slate-900">
          {application.company_name}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Submitted {new Date(application.created_at).toLocaleDateString()}
        </p>
      </div>

      <Link href="/">
        <AppButton className="mt-8 w-full">Back to Home</AppButton>
      </Link>
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}
