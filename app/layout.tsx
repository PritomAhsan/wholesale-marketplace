import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/features/auth/AuthContext";
import { CartProvider } from "@/features/cart/CartContext";
import { WishlistProvider } from "@/features/wishlist/WishlistContext";
import { RecentlyViewedProvider } from "@/features/recently-viewed/RecentlyViewedContext";
import { ToastProvider } from "@/features/notifications/ToastContext";
import { BRANDING } from "@/constants/branding";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: BRANDING.siteName,
    template: `%s | ${BRANDING.shortName}`,
  },
  description: "BULKARE.com is a global B2B wholesale marketplace connecting buyers with verified suppliers.",
  icons: {
    icon: "/images/logo/bulkare-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  <MainLayout>{children}</MainLayout>
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}