import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClawReady for Investors — AI Trading Agents on Solana",
  description:
    "Deploy OpenClaw AI trading agents on Solana with zero code. Non-custodial, open source, and live on Solana Devnet. No CLI, no compromise.",
  keywords: [
    "Solana",
    "AI trading",
    "OpenClaw",
    "crypto",
    "DeFi",
    "trading agents",
    "automated trading",
  ],
  authors: [{ name: "TobieTom" }],
  openGraph: {
    title: "ClawReady for Investors — AI Trading Agents on Solana",
    description:
      "Deploy OpenClaw AI trading agents on Solana with zero code. Non-custodial, open source.",
    type: "website",
    siteName: "ClawReady",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawReady for Investors",
    description:
      "Deploy OpenClaw AI trading agents on Solana with zero code.",
    creator: "@TobieTom",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111120",
              color: "#e2e8f0",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#111120" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#111120" },
            },
          }}
        />
      </body>
    </html>
  );
}
