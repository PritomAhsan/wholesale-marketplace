import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { LEGAL_CONTENT } from "@/data/legalContent";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  return <LegalPageShell {...LEGAL_CONTENT.terms} />;
}
