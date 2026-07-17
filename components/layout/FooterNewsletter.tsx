"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="border-y border-slate-800 bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <div>

            <span className="inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Newsletter
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-white">
              Stay Updated With Global Wholesale Trends
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-400">
              Get product launches, verified suppliers, sourcing tips,
              wholesale insights, and exclusive marketplace offers delivered
              directly to your inbox.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">

              <div>
                <p className="text-3xl font-bold text-white">
                  120K+
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Subscribers
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-white">
                  Weekly
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Market Reports
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-white">
                  Free
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Forever
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">

              <Mail className="h-8 w-8 text-white" />

            </div>

            <h3 className="text-2xl font-bold text-white">
              Join Our Community
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Subscribe to receive sourcing opportunities,
              marketplace updates and exclusive supplier offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 space-y-4"
            >

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-700/30"
              >
                Subscribe Now
                <Send className="h-4 w-4" />
              </button>

            </form>

            <p className="mt-5 text-center text-xs leading-6 text-slate-500">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}