import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Covenant Charge — Long-Term Energy Revenue for Faith Institutions",
  description:
    "Covenant Charge helps churches, schools, and ministries generate passive revenue through EV fast charging, solar, and battery storage — at no upfront cost, no operational burden, and with full transparency.",
  metadataBase: new URL("https://covenantcharge.com"),
  openGraph: {
    title: "Covenant Charge — Long-Term Energy Revenue for Faith Institutions",
    description:
      "Covenant Charge helps churches, schools, and ministries generate passive revenue through EV fast charging, solar, and battery storage — at no upfront cost, no operational burden, and with full transparency.",
    url: "https://covenantcharge.com",
    siteName: "Covenant Charge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Covenant Charge — Long-Term Energy Revenue for Faith Institutions",
    description:
      "Covenant Charge helps churches, schools, and ministries generate passive revenue through EV fast charging, solar, and battery storage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Covenant Charge",
    url: "https://covenantcharge.com",
    description:
      "Covenant Charge helps faith institutions generate passive revenue through EV fast charging, solar, and battery storage — at no upfront cost and with full transparency.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@covenantcharge.com",
      contactType: "customer service",
    },
    areaServed: "US",
    serviceType: [
      "EV Fast Charging",
      "Battery Energy Storage Systems",
      "Solar PV",
    ],
  };

  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
