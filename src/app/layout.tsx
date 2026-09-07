import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zal Interactive — Worlds Worth Remembering",
  description:
    "An independent game studio in Stockholm creating expressive games shaped by bold ideas and enduring stories.",
  keywords: ["game development", "indie games", "game studio", "Zal Interactive"],
  icons: { icon: "/zal-mark.svg" },
  openGraph: {
    title: "Zal Interactive — Worlds Worth Remembering",
    description: "Independent games shaped by bold ideas and enduring stories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
