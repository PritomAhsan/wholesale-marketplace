"use client";

import { useState } from "react";
import { Upload, Paperclip } from "lucide-react";
import { AppButton } from "@/components/ui/app-button";

export default function RFQForm() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Submit Your Requirements
      </h2>

      <p className="mt-2 text-slate-500">
        Fill in your purchasing requirements and verified suppliers will
        contact you with quotations.
      </p>

      <form className="mt-10 space-y-8">

        {/* Product */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Product Name *
          </label>

          <input
            type="text"
            placeholder="Wireless Bluetooth Headphones"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Supplier */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Preferred Supplier (Optional)
          </label>

          <input
            type="text"
            placeholder="Supplier name"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Unit
            </label>

            <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500">

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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Required Delivery Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

        </div>

        {/* Country */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Destination Country *
          </label>

          <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500">

            <option>United States</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>Bangladesh</option>
            <option>India</option>
            <option>Canada</option>

          </select>
        </div>

        {/* Message */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Additional Requirements *
          </label>

          <textarea
            rows={6}
            placeholder="Describe your requirements, quality expectations, packaging, certifications, shipping terms, payment terms, etc."
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
              onChange={(e) =>
                setFileName(e.target.files?.[0]?.name || "")
              }
            />

          </label>

          {fileName && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

              <Paperclip size={18} />

              {fileName}

            </div>
          )}

        </div>

        {/* Submit */}

        <div className="pt-4">

          <AppButton
            className="w-full py-6 text-lg"
          >
            Submit Request for Quotation
          </AppButton>

        </div>

      </form>

    </div>
  );
}