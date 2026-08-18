import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { LEGAL_CONTENT } from "@/data/legalContent";

export const metadata: Metadata = { title: "Restricted Products Policy" };

export default function RestrictedProductsPage() {
  return <LegalPageShell {...LEGAL_CONTENT["restricted-products"]} />;
}
