import type { Metadata } from "next";
import { siteViewport } from "@/lib/seo/site";
import "../globals.css";

export const viewport = siteViewport;

export const metadata: Metadata = {
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
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
