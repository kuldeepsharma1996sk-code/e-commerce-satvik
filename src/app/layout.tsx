import "./globals.css";
import type { Metadata } from "next";
import { cormorant, inter } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Satvik Home — Sacred Idols & Pooja Essentials",
  description:
    "Authentic hand-crafted brass idols, pooja essentials, premium agarbatti, and daily spiritual guidance. Bridge ancient wisdom with modern living.",
  keywords: [
    "Hindu Idols",
    "Brass Idols",
    "Pooja Essentials",
    "Agarbatti",
    "Dhoop",
    "Mandir Accessories",
    "Spiritual",
    "Panchang",
    "Daily Remedy",
  ],
  openGraph: {
    title: "Satvik Home — Sacred Idols & Pooja Essentials",
    description:
      "Authentic hand-crafted brass idols, pooja essentials, and daily spiritual guidance.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF9933" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans antialiased bg-ivory text-charcoal">
        <CartProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <MobileNav />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
