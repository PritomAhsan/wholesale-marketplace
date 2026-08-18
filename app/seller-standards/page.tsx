import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { LEGAL_CONTENT } from "@/data/legalContent";

export const metadata: Metadata = { title: "Seller Standards" };

export default function SellerStandardsPage() {
  return <LegalPageShell {...LEGAL_CONTENT["seller-standards"]} />;
}
