"use client";

import { FormEvent } from "react";
import { Check, ChevronLeft, ChevronRight, Save, Upload } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";

export interface ApplicationFormState {
  company_name: string;
  business_type: string;
  description: string;
  contact_person: string;
  email: string;
  phone: string;
  website: string;
  registration_number: string;
  tax_number: string;
}

const STEPS = [
  { key: "company", label: "Company Info" },
  { key: "contact", label: "Contact & Credentials" },
  { key: "storefront", label: "Storefront" },
  { key: "review", label: "Review" },
] as const;

interface Props {
  step: number;
  setStep: (step: number) => void;
  form: ApplicationFormState;
  update: <K extends keyof ApplicationFormState>(key: K, value: string) => void;
  logo: File | null;
  banner: File | null;
  onLogoChange: (file: File | null) => void;
  onBannerChange: (file: File | null) => void;
  errors: Record<string, string[]>;
  errorMessage: string;
  submitting: boolean;
  restoredDraft: boolean;
  onSubmit: (e: FormEvent) => void;
}

export default function ApplicationForm({
  step,
  setStep,
  form,
  update,
  logo,
  banner,
  onLogoChange,
  onBannerChange,
  errors,
  errorMessage,
  submitting,
  restoredDraft,
  onSubmit,
}: Props) {
  function stepHasErrors(index: number): boolean {
    if (index === 0) return !form.company_name || !form.business_type;
    if (index === 1) return !form.contact_person || !form.email || !form.phone;
    return false;
  }

  function goNext() {
    if (stepHasErrors(step)) return;
    setStep(Math.min(step + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep(Math.max(step - 1, 0));
  }

  return (
    <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Supplier Application</h2>
      <p className="mt-2 text-obsidian/50">
        Tell us about your business. Our team reviews every application
        before your store goes live.
      </p>

      {restoredDraft && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-sapphire-soft px-4 py-2.5 text-xs font-medium text-sapphire-strong">
          <Save size={14} /> Resumed from where you left off.
        </div>
      )}

      <ol className="mt-8 flex flex-wrap items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? "bg-sapphire text-white" : "bg-muted text-obsidian/40"
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                i === step ? "text-obsidian" : "text-obsidian/40"
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-6 bg-border sm:w-10" />
            )}
          </li>
        ))}
      </ol>

      {errorMessage && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {step === 0 && (
          <>
            <div>
              <label className="mb-2 block text-sm font-semibold">Company Name *</label>
              <input
                type="text"
                required
                value={form.company_name}
                onChange={(e) => update("company_name", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />
              <FieldError errors={errors.company_name} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Business Type *</label>
              <select
                value={form.business_type}
                onChange={(e) => update("business_type", e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-sapphire"
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="distributor">Distributor</option>
                <option value="exporter">Exporter</option>
                <option value="retailer">Retailer</option>
              </select>
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
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={form.contact_person}
                  onChange={(e) => update("contact_person", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.contact_person} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Business Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.email} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Phone *</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
                <FieldError errors={errors.phone} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Website</label>
                <input
                  type="text"
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
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
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Tax ID</label>
                <input
                  type="text"
                  value={form.tax_number}
                  onChange={(e) => update("tax_number", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <FileField
              label="Logo"
              helper="Square image, shown next to your Seller ID."
              file={logo}
              onChange={onLogoChange}
            />
            <FileField
              label="Storefront Banner"
              helper="Wide image, shown at the top of your storefront."
              file={banner}
              onChange={onBannerChange}
            />
            <p className="text-xs text-obsidian/40">
              Both optional — you can add or change these later from your
              seller dashboard once approved.
            </p>
          </>
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm">
            <ReviewRow label="Company" value={form.company_name} />
            <ReviewRow label="Business type" value={form.business_type} />
            <ReviewRow label="Contact" value={`${form.contact_person} · ${form.email}`} />
            <ReviewRow label="Phone" value={form.phone} />
            {form.website && <ReviewRow label="Website" value={form.website} />}
            {form.registration_number && (
              <ReviewRow label="Registration #" value={form.registration_number} />
            )}
            {form.tax_number && <ReviewRow label="Tax ID" value={form.tax_number} />}
            <ReviewRow label="Logo" value={logo ? logo.name : "None"} />
            <ReviewRow label="Banner" value={banner ? banner.name : "None"} />
            {form.description && (
              <div className="border-b border-border pb-3">
                <span className="text-obsidian/50">Business description</span>
                <p className="mt-1 text-obsidian">{form.description}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-4">
          <AppButton
            type="button"
            variant="secondary"
            onClick={goBack}
            className={step === 0 ? "invisible" : ""}
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </AppButton>

          {step < STEPS.length - 1 ? (
            <AppButton type="button" onClick={goNext}>
              Next <ChevronRight size={16} className="ml-1" />
            </AppButton>
          ) : (
            <AppButton type="submit" disabled={submitting} className="px-8">
              {submitting ? "Submitting..." : "Submit Application"}
            </AppButton>
          )}
        </div>
      </form>
    </div>
  );
}

function FileField({
  label,
  helper,
  file,
  onChange,
}: {
  label: string;
  helper: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition hover:border-sapphire">
        <Upload className="mb-2 text-sapphire" size={28} />
        <span className="text-sm font-medium">
          {file ? file.name : `Click to upload ${label.toLowerCase()}`}
        </span>
        <span className="mt-1 text-xs text-obsidian/40">{helper}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0">
      <span className="text-obsidian/50">{label}</span>
      <span className="text-right font-medium text-obsidian">{value}</span>
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}
