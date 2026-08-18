import type { Metadata } from "next";
import ContactPageClient from "@/features/support/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact and Support",
  description: "Choose the topic that best matches your request and reach the right Bulkare team.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
