import Link from "next/link";
import {
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

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "Products", href: "#" },
  { name: "Suppliers", href: "#" },
  { name: "Categories", href: "#" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Become a Supplier", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact", href: "#" },
];

const supportLinks = [
  { name: "Help Center", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "FAQ", href: "#" },
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
    <footer className="bg-slate-950 text-slate-300">

      <Container>

        <div className="grid gap-12 py-20 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="text-3xl font-black text-white"
            >
              TradeHub
            </Link>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Connect with verified suppliers, discover quality wholesale
              products, and grow your business through a trusted global
              B2B marketplace.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>hello@tradehub.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+880 1700-000000</span>
              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
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

            <ul className="space-y-3">

              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3">

              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 py-8 md:flex-row">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TradeHub. All rights reserved.
          </p>

          <div className="flex gap-4">

            {socials.map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Icon size={18} />
              </Link>
            ))}

          </div>

        </div>

      </Container>

    </footer>
  );
}