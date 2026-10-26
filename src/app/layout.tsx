import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zal Interactive | Game Studio",
  description:
    "Zal Interactive is an independent game studio based in Stockholm.",
  keywords: ["game development", "indie games", "game studio", "Zal Interactive"],
  icons: { icon: "/zal-mark.png" },
  openGraph: {
    title: "Zal Interactive | Game Studio",
    description: "Independent game studio based in Stockholm.",
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
