import Script from "next/script";
import { GA4_MEASUREMENT_ID, ga4InitScript } from "@/lib/analytics/ga4";

export function GoogleAnalytics() {
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">{ga4InitScript(GA4_MEASUREMENT_ID)}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="afterInteractive" />
    </>
  );
}
