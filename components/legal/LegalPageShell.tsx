import { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { BRANDING } from "@/constants/branding";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  relatedLinks: { name: string; href: string }[];
}

export default function LegalPageShell({
  title,
  lastUpdated,
  intro,
  sections,
  relatedLinks,
  extra,
}: LegalPageContent & { extra?: ReactNode }) {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-obsidian/40">
                On this page
              </p>
              <nav className="mt-4 space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-obsidian/60 transition hover:text-sapphire"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sapphire">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-bold text-obsidian sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-obsidian/50">
              Last updated {lastUpdated}
            </p>

            <div className="mt-4 rounded-xl border border-champagne/40 bg-champagne-soft/40 px-4 py-3 text-xs text-obsidian/70">
              This page reflects Bulkare&apos;s current operating policy and
              is pending final review by legal counsel.
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-obsidian/70">
              {intro}
            </p>

            {extra}

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-lg font-semibold text-obsidian">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-obsidian/70">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {section.list && (
                      <ul className="list-disc space-y-1.5 pl-5">
                        {section.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-white p-6">
              <p className="text-sm font-semibold text-obsidian">
                Related policies
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-sapphire transition hover:text-sapphire-strong"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-obsidian/60">
                Questions about this policy? Contact{" "}
                <a
                  href={`mailto:${BRANDING.supportEmail}`}
                  className="font-medium text-sapphire"
                >
                  {BRANDING.supportEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
