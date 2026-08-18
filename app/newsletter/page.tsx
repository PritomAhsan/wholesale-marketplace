import type { Metadata } from "next";
import NewsletterPageClient from "@/features/newsletter/components/NewsletterPageClient";

export const metadata: Metadata = {
  title: "Wholesale Insights Newsletter",
  description: "Receive category movement, sourcing guidance and new Bulkare inventory highlights.",
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
