import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import CookiePreferences from "@/components/legal/CookiePreferences";
import { LEGAL_CONTENT } from "@/data/legalContent";

export const metadata: Metadata = { title: "Cookie Notice and Settings" };

export default function CookieNoticePage() {
  return (
    <LegalPageShell
      {...LEGAL_CONTENT.cookies}
      extra={<CookiePreferences />}
    />
  );
}
