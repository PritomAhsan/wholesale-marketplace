import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/features/auth/AuthContext";
import { CartProvider } from "@/features/cart/CartContext";
import { BRANDING } from "@/constants/branding";

export const metadata: Metadata = {
  title: {
    default: BRANDING.siteName,
    template: `%s | ${BRANDING.shortName}`,
  },
  description: "BULKARE.com is a global B2B wholesale marketplace connecting buyers with verified suppliers.",
  icons: {
    icon: BRANDING.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <MainLayout>{children}</MainLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}