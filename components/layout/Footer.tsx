import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import Container from "./Container";
import FooterNewsletter from "./FooterNewsletter";
import FooterStats from "./FooterStats";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Categories", href: "/categories" },
  { name: "RFQ", href: "/rfq" },
];

const buyerLinks = [
  { name: "Buyer Protection", href: "#" },
  { name: "How to Buy", href: "#" },
  { name: "Request Quotation", href: "/rfq" },
  { name: "Trade Assurance", href: "#" },
  { name: "Shipping Guide", href: "#" },
];

const supplierLinks = [
  { name: "Become Supplier", href: "#" },
  { name: "Supplier Membership", href: "#" },
  { name: "Seller Center", href: "#" },
  { name: "Advertising", href: "#" },
  { name: "Success Stories", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Press", href: "#" },
  { name: "Contact", href: "#" },
];

const supportLinks = [
  { name: "Help Center", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "Report Abuse", href: "#" },
];

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
  },
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    icon: FaInstagram,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-950 text-slate-300">

      {/* CTA */}

      <section className="border-b border-slate-800">

        <Container>

          <div className="rounded-b-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 px-8 py-14 shadow-2xl lg:flex lg:items-center lg:justify-between">

            <div>

              <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                Global Marketplace
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight text-white">
                Ready to Grow Your Business?
              </h2>

              <p className="mt-4 max-w-2xl text-blue-100">
                Connect with verified suppliers, receive competitive quotations,
                and source quality wholesale products from trusted manufacturers
                worldwide.
              </p>

            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">

              <Link
                href="/products"
                className="flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Browse Products
              </Link>

              <Link
                href="/rfq"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Request Quotes
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </Container>

      </section>

      {/* <FooterStats /> */}

      <FooterNewsletter />

      <Container>

        <div className="grid gap-12 py-20 lg:grid-cols-6">

          {/* Company */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="text-3xl font-black text-white"
            >
              WholesaleHub
            </Link>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              WholesaleHub is a modern global B2B marketplace connecting buyers
              with verified suppliers across electronics, fashion, machinery,
              industrial equipment and thousands of wholesale products.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-slate-900 p-3">
                  <MapPin size={18} />
                </div>

                <div>

                  <p className="font-semibold text-white">
                    Headquarters
                  </p>

                  <p className="text-slate-400">
                    Mobile, Alabama, United States
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-slate-900 p-3">
                  <Mail size={18} />
                </div>

                <div>

                  <p className="font-semibold text-white">
                    Email
                  </p>

                  <p className="text-slate-400">
                    hello@wholesalehub.com
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-slate-900 p-3">
                  <Phone size={18} />
                </div>

                <div>

                  <p className="font-semibold text-white">
                    Phone
                  </p>

                  <p className="text-slate-400">
                    +92 831 079 11
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Quick */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Marketplace
            </h3>

            <ul className="space-y-4">

              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:pl-2 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Buyers */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Buyers
            </h3>

            <ul className="space-y-4">

              {buyerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:pl-2 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Suppliers */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Suppliers
            </h3>

            <ul className="space-y-4">

              {supplierLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:pl-2 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-4">

              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:pl-2 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

        </div>

                  {/* Support */}

          {/* <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-4">

              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:pl-2 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div> */}


        <div className="border-t border-slate-800 py-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} WholesaleHub. All rights reserved.
              </p>

              <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">

                <Link
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Terms of Service
                </Link>

                <Link
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Cookies
                </Link>

                <Link
                  href="#"
                  className="transition hover:text-blue-400"
                >
                  Accessibility
                </Link>

              </div>

            </div>

            <div className="flex items-center gap-3">

              {socials.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-xl"
                >
                  <Icon size={18} />
                </Link>
              ))}

            </div>

          </div>

          {/* Trust Badges */}

          <div className="mt-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-4">

            <div>

              <p className="text-sm font-semibold text-white">
                Secure Payments
              </p>

              <p className="mt-1 text-sm text-slate-400">
                SSL encrypted transactions
              </p>

            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Verified Suppliers
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Trusted manufacturers worldwide
              </p>

            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Buyer Protection
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Secure wholesale sourcing
              </p>

            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                24/7 Support
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Dedicated customer assistance
              </p>

            </div>

          </div>

        </div>

      </Container>

    </footer>
  );
}