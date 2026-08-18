"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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
import SupplierHero from "@/features/become-supplier/components/SupplierHero";
import ValueGrid from "@/features/become-supplier/components/ValueGrid";
import EligibilityGrid from "@/features/become-supplier/components/EligibilityGrid";
import StorefrontPreview from "@/features/become-supplier/components/StorefrontPreview";
import ApplicationForm, {
  ApplicationFormState,
} from "@/features/become-supplier/components/ApplicationForm";

const DRAFT_KEY = "bulkare_supplier_application_draft";

const initialForm: ApplicationFormState = {
  company_name: "",
  business_type: "manufacturer",
  description: "",
  contact_person: "",
  email: "",
  phone: "",
  website: "",
  registration_number: "",
  tax_number: "",
};

export default function BecomeSupplierPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [application, setApplication] = useState<SupplierApplication | null>(null);
  const [checking, setChecking] = useState(true);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ApplicationFormState>(initialForm);
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

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

      if (!app) {
        const draft = typeof window !== "undefined" ? localStorage.getItem(DRAFT_KEY) : null;

        if (draft) {
          try {
            setForm(JSON.parse(draft));
            setRestoredDraft(true);
          } catch {
            // ignore malformed draft
          }
        } else if (user) {
          setForm((prev) => ({
            ...prev,
            contact_person: prev.contact_person || user.full_name,
            email: prev.email || user.email,
            phone: prev.phone || user.phone || "",
          }));
        }
      }

      setChecking(false);
    });
  }, [token, user]);

  // Real saved progress: persist to this browser as the user fills the
  // form, restored above on return. No backend draft-saving exists, so
  // this doesn't claim to sync across devices.
  useEffect(() => {
    if (!application && typeof window !== "undefined") {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }
  }, [form, application]);

  function update<K extends keyof ApplicationFormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const logoPreview = useMemo(() => (logo ? URL.createObjectURL(logo) : null), [logo]);
  const bannerPreview = useMemo(() => (banner ? URL.createObjectURL(banner) : null), [banner]);

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
        logo,
        banner,
      });

      setApplication(result);
      localStorage.removeItem(DRAFT_KEY);
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
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center text-obsidian/50">
          Loading...
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg">
          <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
            <ShieldAlert className="mx-auto mb-4 text-sapphire" size={48} />

            <h1 className="text-2xl font-bold">Sign In Required</h1>

            <p className="mt-3 text-obsidian/50">
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
      <section className="bg-ivory py-24">
        <Container className="max-w-lg">
          <StatusCard application={application} />
        </Container>
      </section>
    );
  }

  return (
    <>
      <SupplierHero
        companyName={form.company_name}
        logoPreview={logoPreview}
        bannerPreview={bannerPreview}
      />

      <ValueGrid />

      <EligibilityGrid />

      <StorefrontPreview
        companyName={form.company_name}
        businessType={form.business_type}
        registrationNumber={form.registration_number}
        taxNumber={form.tax_number}
        website={form.website}
      />

      <section className="bg-ivory py-14">
        <Container className="max-w-2xl">
          <ApplicationForm
            step={step}
            setStep={setStep}
            form={form}
            update={update}
            logo={logo}
            banner={banner}
            onLogoChange={setLogo}
            onBannerChange={setBanner}
            errors={errors}
            errorMessage={errorMessage}
            submitting={submitting}
            restoredDraft={restoredDraft}
            onSubmit={handleSubmit}
          />
        </Container>
      </section>
    </>
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
    <div className="rounded-xl border border-border bg-white p-10 text-center shadow-sm">
      {config.icon}

      <h1 className="text-2xl font-bold">{config.title}</h1>

      <p className="mt-3 text-obsidian/50">{config.body}</p>

      <div className="mt-8 rounded-lg bg-ivory p-6 text-left">
        <p className="text-sm font-semibold text-obsidian">
          {application.company_name}
        </p>

        <p className="mt-1 text-sm text-obsidian/50">
          Submitted {new Date(application.created_at).toLocaleDateString()}
        </p>
      </div>

      <Link href="/">
        <AppButton className="mt-8 w-full">Back to Home</AppButton>
      </Link>
    </div>
  );
}
