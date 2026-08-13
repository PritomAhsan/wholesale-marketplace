"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Paperclip, Upload } from "lucide-react";
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

export default function RFQForm() {
  const { user, token } = useAuth();

  const [form, setForm] = useState(initialForm);
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
      <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <CheckCircle2 className="mb-4 text-green-500" size={56} />

        <h2 className="text-2xl font-bold">Request Submitted</h2>

        <p className="mt-3 max-w-md text-slate-500">
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
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Submit Your Requirements
      </h2>

      <p className="mt-2 text-slate-500">
        Fill in your purchasing requirements and verified suppliers will
        contact you with quotations.
      </p>

      {errorMessage && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form className="mt-10 space-y-8" onSubmit={handleSubmit}>

        {/* Product */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Product Name *
          </label>

          <input
            type="text"
            placeholder="Wireless Bluetooth Headphones"
            value={form.product_name}
            onChange={(e) => update("product_name", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <FieldError errors={errors.product_name} />
        </div>

        {/* Supplier */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Preferred Supplier (Optional)
          </label>

          <input
            type="text"
            placeholder="Supplier name"
            value={form.preferred_supplier_name}
            onChange={(e) => update("preferred_supplier_name", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Quantity + Unit */}

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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
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

        {/* Budget + Delivery */}

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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

        </div>

        {/* Country */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Destination Country *
          </label>

          <select
            value={form.destination_country}
            onChange={(e) => update("destination_country", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
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

        {/* Message */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Additional Requirements *
          </label>

          <textarea
            rows={6}
            placeholder="Describe your requirements, quality expectations, packaging, certifications, shipping terms, payment terms, etc."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <FieldError errors={errors.message} />
        </div>

        {/* Contact */}

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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* File Upload */}

        <div>

          <label className="mb-3 block text-sm font-semibold">
            Attachment
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 transition hover:border-blue-500">

            <Upload className="mb-3 text-blue-600" size={34} />

            <span className="font-medium">
              Click to upload specification, drawing or image
            </span>

            <span className="mt-2 text-sm text-slate-500">
              PDF, DOCX, XLSX, PNG, JPG
            </span>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

          </label>

          {file && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

              <Paperclip size={18} />

              {file.name}

            </div>
          )}

        </div>

        {/* Submit */}

        <div className="pt-4">

          <AppButton
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-6 text-lg"
          >
            {status === "submitting"
              ? "Submitting..."
              : "Submit Request for Quotation"}
          </AppButton>

        </div>

      </form>

    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return <p className="mt-2 text-sm text-red-600">{errors[0]}</p>;
}
