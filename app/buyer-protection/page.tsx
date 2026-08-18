import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { LEGAL_CONTENT } from "@/data/legalContent";

export const metadata: Metadata = { title: "Buyer Protection" };

export default function BuyerProtectionPage() {
  return <LegalPageShell {...LEGAL_CONTENT["buyer-protection"]} />;
}
