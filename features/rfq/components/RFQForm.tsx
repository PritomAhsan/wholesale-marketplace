"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Paperclip, Upload } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";
import { RfqValidationError, submitRfq } from "../api";
import { useAuth } from "@/features/auth/AuthContext";

const initialForm = {
  product_name: "",
  preferred_supplier_name: "",
  quantity: "",
  unit: "Pieces",
  budget: "",
  destination_country: "United States",
  required_delivery_date: "",
  message: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
};

const STEPS = [
  { key: "requirements", label: "Requirements" },
  { key: "quantity", label: "Quantity & Delivery" },
  { key: "contact", label: "Contact & Attachment" },
  { key: "review", label: "Review" },
] as const;

export default function RFQForm() {
  const { user, token } = useAuth();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => ({
    ...initialForm,
    product_name: searchParams.get("product") ?? initialForm.product_name,
    quantity: searchParams.get("quantity") ?? initialForm.quantity,
  }));
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      contact_name: prev.contact_name || user.full_name,
      contact_email: prev.contact_email || user.email,
      contact_phone: prev.contact_phone || user.phone || "",
    }));
  }, [user]);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function stepHasErrors(index: number): boolean {
    if (index === 0) return !form.product_name || !form.message;
    if (index === 1) return !form.quantity || !form.destination_country;
    if (index === 2) return !form.contact_name || !form.contact_email;
    return false;
  }

  function goNext() {
    if (stepHasErrors(step)) {
      setErrorMessage("Please fill in the required fields before continuing.");
      return;
    }

    setErrorMessage("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrorMessage("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setStatus("submitting");
    setErrors({});
    setErrorMessage("");

    try {
      await submitRfq({ ...form, attachment: file }, token);

      setStatus("success");
      setForm(initialForm);
      setFile(null);
      setStep(0);
    } catch (err) {
      if (err instanceof RfqValidationError) {
        setErrors(err.errors);
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }

      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border bg-white p-12 text-center shadow-sm">
        <CheckCircle2 className="mb-4 text-green-500" size={56} />

        <h2 className="text-2xl font-bold">Request Submitted</h2>

        <p className="mt-3 max-w-md text-obsidian/50">
          Your request for quotation has been sent. Verified suppliers will
          contact you with quotations shortly.
        </p>

        <AppButton className="mt-8" onClick={() => setStatus("idle")}>
          Submit Another Request
        </AppButton>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">

      <h2 className="text-3xl font-bold">
        Submit Your Requirements
      </h2>

      <p className="mt-2 text-obsidian/50">
        Fill in your purchasing requirements and verified suppliers will
        contact you with quotations.
      </p>

      {/* Stepper */}
      <ol className="mt-8 flex flex-wrap items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                i < step
                  ? "bg-sapphire text-white"
                  : i === step
                  ? "bg-sapphire text-white"
                  : "bg-muted text-obsidian/40"
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

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>

        {step === 0 && (
          <div className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Name *
              </label>

              <input
                type="text"
                placeholder="Wireless Bluetooth Headphones"
                value={form.product_name}
                onChange={(e) => update("product_name", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />

              <FieldError errors={errors.product_name} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Preferred Supplier (Optional)
              </label>

              <input
                type="text"
                placeholder="Supplier name"
                value={form.preferred_supplier_name}
                onChange={(e) => update("preferred_supplier_name", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Additional Requirements *
              </label>

              <textarea
                rows={6}
                placeholder="Describe your requirements, quality expectations, packaging, certifications, shipping terms, payment terms, etc."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />

              <FieldError errors={errors.message} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Quantity *
                </label>

                <input
                  type="number"
                  placeholder="1000"
                  value={form.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />

                <FieldError errors={errors.quantity} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Unit
                </label>

                <select
                  value={form.unit}
                  onChange={(e) => update("unit", e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-sapphire"
                >
                  <option>Pieces</option>
                  <option>Boxes</option>
                  <option>Cartons</option>
                  <option>Sets</option>
                  <option>Kilograms</option>
                  <option>Tons</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Target Budget (USD)
                </label>

                <input
                  type="number"
                  placeholder="2500"
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Required Delivery Date
                </label>

                <input
                  type="date"
                  value={form.required_delivery_date}
                  onChange={(e) => update("required_delivery_date", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Destination Country *
              </label>

              <select
                value={form.destination_country}
                onChange={(e) => update("destination_country", e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-sapphire"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Bangladesh</option>
                <option>India</option>
                <option>Canada</option>
              </select>

              <FieldError errors={errors.destination_country} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Your Name *
                </label>

                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.contact_name}
                  onChange={(e) => update("contact_name", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />

                <FieldError errors={errors.contact_name} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email *
                </label>

                <input
                  type="email"
                  placeholder="jane@company.com"
                  value={form.contact_email}
                  onChange={(e) => update("contact_email", e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
                />

                <FieldError errors={errors.contact_email} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone (Optional)
              </label>

              <input
                type="text"
                placeholder="+1 555 000 0000"
                value={form.contact_phone}
                onChange={(e) => update("contact_phone", e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-sapphire"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold">
                Attachment
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-5 transition hover:border-sapphire">
                <Upload className="mb-3 text-sapphire" size={34} />

                <span className="font-medium">
                  Click to upload specification, drawing or image
                </span>

                <span className="mt-2 text-sm text-obsidian/50">
                  PDF, DOCX, XLSX, PNG, JPG
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>

              {file && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                  <Paperclip size={18} />
                  {file.name}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <ReviewRow label="Product" value={form.product_name} />
            {form.preferred_supplier_name && (
              <ReviewRow label="Preferred supplier" value={form.preferred_supplier_name} />
            )}
            <ReviewRow label="Requirements" value={form.message} />
            <ReviewRow label="Quantity" value={`${form.quantity} ${form.unit}`} />
            {form.budget && <ReviewRow label="Target budget" value={`$${form.budget}`} />}
            {form.required_delivery_date && (
              <ReviewRow label="Required delivery" value={form.required_delivery_date} />
            )}
            <ReviewRow label="Destination" value={form.destination_country} />
            <ReviewRow label="Contact" value={`${form.contact_name} · ${form.contact_email}`} />
            {form.contact_phone && <ReviewRow label="Phone" value={form.contact_phone} />}
            <ReviewRow label="Attachment" value={file ? file.name : "None"} />
          </div>
        )}

        {/* Navigation */}
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
            <AppButton
              type="submit"
              disabled={status === "submitting"}
              className="px-8"
            >
              {status === "submitting"
                ? "Submitting..."
                : "Submit Request for Quotation"}
            </AppButton>
          )}
        </div>

      </form>

    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 text-sm last:border-0">
      <span className="text-obsidian/50">{label}</span>
      <span className="text-right font-medium text-obsidian">{value}</span>
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}
