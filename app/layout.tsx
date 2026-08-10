import type { Metadata } from "next";
import { site } from "@/data/portfolio";
import "./globals.css";

const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.tagline,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: `${site.name} | Portfolio`,
    description: site.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Portfolio`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-pink-50 antialiased`}
    >
      <body className="min-h-full bg-pink-50 text-pink-950">{children}</body>
    </html>
  );
}
