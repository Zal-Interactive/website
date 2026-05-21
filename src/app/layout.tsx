import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zal Interactive | Game Development Studio",
  description:
    "Zal Interactive is a game development studio crafting immersive worlds and unforgettable experiences.",
  keywords: ["game development", "indie games", "game studio", "Zal Interactive"],
  openGraph: {
    title: "Zal Interactive | Game Development Studio",
    description: "Crafting immersive worlds and unforgettable experiences.",
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
