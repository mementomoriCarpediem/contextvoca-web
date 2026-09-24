import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import type { Metadata } from "next";
import { siteViewport } from "@/lib/seo/site";
import "../globals.css";

export const viewport = siteViewport;

export const metadata: Metadata = {
  verification: { other: { "naver-site-verification": "b6384bb3a29150ffcba9926cf900188d578a0f9f" } },
  title: "ContextVoca",
};

/**
 * Standalone root layout for the `/` language-selection page. This app has
 * two independent root layouts (this one and `app/[locale]/layout.tsx`) so
 * that `/` can exist as a plain static page alongside the `/{locale}/...`
 * route tree — see Next.js "multiple root layouts" pattern.
 */
export default function RootSelectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">{children}<footer style={{textAlign:"center",padding:"12px",fontSize:"11px",opacity:0.65}}><a href="https://growth-control-tower.resonace-zorba.workers.dev/measurement.html">Web measurement · 측정 안내</a></footer><Script src="https://growth-control-tower.resonace-zorba.workers.dev/measure.js" strategy="afterInteractive" /><GoogleAnalytics /></body>
    </html>
  );
}
