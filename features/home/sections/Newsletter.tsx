import { ArrowRight, Mail } from "lucide-react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";

export default function Newsletter() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-20 text-white shadow-2xl lg:px-20">

          {/* Background Glow */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Mail className="h-8 w-8 text-blue-300" />
            </div>

            <h2 className="mt-8 text-4xl font-black leading-tight lg:text-5xl">
              Stay Ahead of the Market
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Get wholesale trends, supplier updates, featured products,
              and exclusive business opportunities delivered to your inbox.
            </p>

            <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl bg-white p-3 shadow-xl md:flex-row">

              <input
                type="email"
                placeholder="Enter your business email"
                className="h-14 flex-1 rounded-xl border-0 px-5 text-slate-900 outline-none placeholder:text-slate-400"
              />

              <AppButton
                size="lg"
                className="md:px-8"
              >
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </AppButton>

            </form>

            <p className="mt-6 text-sm text-slate-400">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>

          </div>

        </div>
      </Container>
    </section>
  );
}