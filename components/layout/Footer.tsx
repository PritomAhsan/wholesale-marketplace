import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import Container from "./Container";
import { BRANDING } from "@/constants/branding";

const linkGroups = [
  {
    title: "Shop",
    links: [
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "New inventory", href: "/products?sort=newest" },
      { name: "Volume deals", href: "/deals" },
    ],
  },
  {
    title: "Source",
    links: [
      { name: "Request quotes", href: "/rfq" },
      { name: "Compare offers", href: "/products" },
      { name: "Orders", href: "/orders" },
    ],
  },
  {
    title: "Buyers",
    links: [
      { name: "How it works", href: "/about#how-it-works" },
      { name: "Buyer protection", href: "/buyer-protection" },
      { name: "Verification", href: "/about#verification" },
      { name: "Help center", href: "/contact" },
    ],
  },
  {
    title: "Suppliers",
    links: [
      { name: "Apply to sell", href: "/become-supplier" },
      { name: "Requirements", href: "/become-supplier#eligibility" },
      { name: "Seller standards", href: "/seller-standards" },
      { name: "How sourcing works", href: "/rfq#how-offers-work" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Bulkare", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Insights", href: "/newsletter" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
];

const legalLinks = [
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "/cookies" },
  { name: "Restricted products", href: "/restricted-products" },
  { name: "Seller standards", href: "/seller-standards" },
];

const socials = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: FaInstagram, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-l-4 border-champagne bg-obsidian text-ivory/70">
      <Container>

        <div className="grid gap-10 py-14 lg:grid-cols-12">

          {/* Definition */}

          <div className="lg:col-span-3">

            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src={BRANDING.logoDark}
                alt={BRANDING.siteName}
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-ivory/60">
              A controlled B2B marketplace for wholesale discovery, quotation
              and purchasing between qualified buyers and privately verified
              suppliers.
            </p>

          </div>

          {/* Link groups */}

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">

            {linkGroups.map((group) => (
              <div key={group.title}>

                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-champagne">
                  {group.title}
                </h3>

                <ul className="space-y-3">

                  {group.links.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm transition hover:text-champagne"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* Legal bar */}

        <div className="border-t border-white/10 py-6">

          <div className="flex flex-wrap gap-4 text-xs text-ivory/50">
            {legalLinks.map((item, i) => (
              <span key={item.name} className="flex items-center gap-4">
                {i > 0 && <span className="text-ivory/20">·</span>}
                <Link href={item.href} className="transition hover:text-champagne">
                  {item.name}
                </Link>
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-ivory/40">
              © {BRANDING.shortName}. Verified legal business details and
              monitored support contact.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-ivory/40">
                US / USD / EN
              </span>

              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 transition hover:border-champagne hover:text-champagne"
                  >
                    <Icon size={13} />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </Container>
    </footer>
  );
}
